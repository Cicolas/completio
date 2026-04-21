export interface CompletionOptions {
  maxTokens?: number
  context?: string
  systemPrompt?: string
  stopSequences?: string[]
}

export interface AiHandler {
  complete(prompt: string, options?: CompletionOptions): Promise<string>
}
