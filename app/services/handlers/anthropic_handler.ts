import type { AiHandler, CompletionOptions } from '#common/interfaces/ai_handler'
import env from '#start/env'

interface AnthropicResponse {
  content?: Array<{
    type: string
    text?: string
  }>
  error?: {
    message?: string
  }
}

export class AnthropicHandler implements AiHandler {
  #apiKey = env.get('ANTHROPIC_API_KEY')?.release()
  #baseUrl = env.get('ANTHROPIC_BASE_URL') ?? 'https://api.anthropic.com'
  #model = env.get('ANTHROPIC_MODEL') ?? 'claude-3-5-haiku-latest'

  async complete(prompt: string, options?: CompletionOptions): Promise<string> {
    if (!this.#apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not configured')
    }

    const response = await fetch(new URL('/v1/messages', this.#baseUrl), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': this.#apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.#model,
        system: options?.systemPrompt,
        max_tokens: options?.maxTokens ?? 64,
        stop_sequences: options?.stopSequences,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    })

    const payload = (await response.json()) as AnthropicResponse

    if (!response.ok) {
      throw new Error(payload.error?.message ?? 'Anthropic request failed')
    }

    const completion =
      payload.content
        ?.filter((item) => item.type === 'text')
        .map((item) => item.text ?? '')
        .join('') ?? ''

    if (!completion) {
      return ''
    }

    return completion
  }
}
