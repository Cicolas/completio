export interface ApiResponse<TPayload> {
  payload: TPayload | null
  error: string | null
  message: string | null
}
