import type { AiHandler, CompletionOptions } from '#common/interfaces/ai_handler'
import { StubHandler } from '#services/handlers/stub_handler'

export class AiService {
  #handler: AiHandler

  constructor() {
    this.#handler = new StubHandler()
  }

  async complete(prompt: string, options?: CompletionOptions): Promise<string> {
    return this.#handler.complete(prompt, options)
  }
}
