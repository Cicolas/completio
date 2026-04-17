import type { AiHandler, CompletionOptions } from '#common/interfaces/ai_handler'

/**
 * Stub handler — replace with a real provider (OpenAI, Anthropic, etc.)
 */
export class StubHandler implements AiHandler {
  async complete(prompt: string, _options?: CompletionOptions): Promise<string> {
    return `completion for: ${prompt}`
  }
}