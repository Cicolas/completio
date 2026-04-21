import { InternalError } from '#exceptions/internal_error'
import type { AiHandler, CompletionOptions } from '#common/interfaces/ai_handler'
import {
  buildCompletionSystemPrompt,
  getCompletionStopSequences,
} from '#services/completion_system_prompt'
import { AnthropicHandler } from '#services/handlers/anthropic_handler'
import { StubHandler } from '#services/handlers/stub_handler'
import env from '#start/env'
import logger from '@adonisjs/core/services/logger'

export class AiService {
  #handler: AiHandler

  constructor() {
    this.#handler = env.get('ANTHROPIC_API_KEY') ? new AnthropicHandler() : new StubHandler()

    logger.info({ handler: this.#handler.constructor.name }, 'AI handler initialized')
  }

  async complete(prompt: string, options?: CompletionOptions): Promise<string> {
    const completionOptions: CompletionOptions = {
      ...options,
      systemPrompt: buildCompletionSystemPrompt(options?.context),
      stopSequences: getCompletionStopSequences(),
    }

    logger.info(
      {
        handler: this.#handler.constructor.name,
        promptLength: prompt.length,
        contextLength: completionOptions.context?.length,
        maxTokens: completionOptions.maxTokens,
      },
      'Starting AI completion'
    )

    try {
      const completion = await this.#handler.complete(prompt, completionOptions)

      logger.info(
        {
          handler: this.#handler.constructor.name,
          completionLength: completion.length,
        },
        'AI completion succeeded'
      )

      return completion
    } catch (error) {
      logger.error(
        {
          handler: this.#handler.constructor.name,
          promptLength: prompt.length,
          err: error,
        },
        'AI completion failed'
      )

      throw InternalError.upstream('AI_COMPLETION_FAILED', 'Failed to generate completion', error)
    }
  }
}
