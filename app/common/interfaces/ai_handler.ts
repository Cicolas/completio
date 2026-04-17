export interface CompletionOptions {
  maxTokens?: number
}

export interface AiHandler {
  complete(prompt: string, options?: CompletionOptions): Promise<string>
}