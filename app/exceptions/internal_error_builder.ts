import type { ApiResponse } from '#common/interfaces/api_response'
import { InternalError, type HttpException } from '#exceptions/internal_error'

type ErrorWithStatus = {
  status?: number
  code?: string
  message?: string
  messages?: Array<{ message?: string }>
}

type BuilderTransformResult = {
  identifier?: string
  message?: string
  httpException?: HttpException
}

export class InternalErrorBuilder {
  private internalError = InternalError.unexpected()

  constructor(private err: unknown) {}

  transformValidationError() {
    const message = this.#getValidationMessage(this.err)
    if (!message) {
      return this
    }

    const identifier = this.#getIdentifier(this.err, 'VALIDATION_ERROR')
    this.internalError = InternalError.badRequest(identifier, message, this.err)
    return this
  }

  transformHttpError() {
    if (this.err instanceof InternalError) {
      this.internalError = this.err
      return this
    }

    const status = this.#getStatus(this.err)
    const identifier = this.#getIdentifier(this.err)
    const message = this.#getMessage(this.err, status)

    this.internalError = this.#createFromStatus(status, identifier, message, this.err)
    return this
  }

  async transformResponseErrorAsync() {
    if (!(this.err instanceof Response)) {
      return this
    }

    if (this.err.ok) {
      throw InternalError.internal(
        'TRANSFORM_RESPONSE_ERROR_SUCCEEDED_RESPONSE',
        'transformResponseError received a successful response'
      )
    }

    const body = await this.#parseResponseBody(this.err)
    const identifier = this.#getResponseIdentifier(body)
    const message = this.#getResponseMessage(body) ?? (this.err.statusText || 'Upstream request failed')

    this.internalError = this.#createFromStatus(this.err.status, identifier, message, this.err)
    return this
  }

  transform(callback: (error: unknown) => BuilderTransformResult | undefined) {
    const result = callback(this.err)
    if (!result) {
      return this
    }

    if (result.httpException) {
      this.internalError = new InternalError(
        result.httpException.code ?? this.internalError.identifier,
        result.message ?? this.internalError.message,
        result.httpException,
        this.err
      )
      return this
    }

    if (result.identifier || result.message) {
      this.internalError = this.#createFromStatus(
        this.internalError.httpException.status,
        result.identifier ?? this.internalError.identifier,
        result.message ?? this.internalError.message,
        this.err
      )
    }

    return this
  }

  build() {
    const error = this.internalError
    Error.captureStackTrace(error, this.build)
    return error
  }

  #createFromStatus(status: number, identifier: string, message: string, cause?: unknown) {
    switch (status) {
      case 400:
      case 422:
        return InternalError.badRequest(identifier, message, cause)
      case 401:
        return InternalError.unauthorized(identifier, message, cause)
      case 403:
        return InternalError.forbidden(identifier, message, cause)
      case 404:
        return InternalError.notFound(identifier, message, cause)
      case 409:
        return InternalError.conflict(identifier, message, cause)
      case 410:
        return InternalError.gone(identifier, message, cause)
      case 502:
      case 503:
      case 504:
        return InternalError.upstream(identifier, message, cause)
      default:
        return InternalError.unexpected(identifier, message, cause)
    }
  }

  #getIdentifier(error: unknown, fallback = 'INTERNAL_ERROR') {
    if (typeof error === 'object' && error !== null && typeof (error as ErrorWithStatus).code === 'string') {
      return (error as ErrorWithStatus).code ?? fallback
    }

    return fallback
  }

  #getStatus(error: unknown) {
    if (typeof error === 'object' && error !== null && typeof (error as ErrorWithStatus).status === 'number') {
      return (error as ErrorWithStatus).status ?? 500
    }

    return 500
  }

  #getMessage(error: unknown, status: number) {
    const validationMessage = this.#getValidationMessage(error)
    if (validationMessage) {
      return validationMessage
    }

    if (typeof error === 'object' && error !== null && typeof (error as ErrorWithStatus).message === 'string') {
      const message = (error as ErrorWithStatus).message?.trim()
      if (message) {
        return message
      }
    }

    if (status >= 500) {
      return 'An unexpected error occurred'
    }

    return 'Request failed'
  }

  #getValidationMessage(error: unknown) {
    if (!error || typeof error !== 'object' || !('messages' in error)) {
      return null
    }

    const { messages } = error as ErrorWithStatus
    if (!Array.isArray(messages)) {
      return null
    }

    return messages[0]?.message ?? null
  }

  async #parseResponseBody(response: Response) {
    try {
      return await response.json()
    } catch {
      return null
    }
  }

  #getResponseIdentifier(body: unknown) {
    if (typeof body === 'object' && body !== null && 'error' in body && typeof body.error === 'string') {
      return body.error
    }

    return 'UPSTREAM_ERROR'
  }

  #getResponseMessage(body: unknown) {
    if (typeof body === 'object' && body !== null && 'message' in body && typeof body.message === 'string') {
      return body.message
    }

    if (
      typeof body === 'object' &&
      body !== null &&
      'error' in body &&
      typeof body.error === 'object' &&
      body.error !== null &&
      'message' in body.error &&
      typeof body.error.message === 'string'
    ) {
      return body.error.message
    }

    return null
  }
}

export function normalizeInternalError(error: unknown) {
  return new InternalErrorBuilder(error).transformValidationError().transformHttpError().build()
}

export function toErrorResponse(error: unknown): { status: number; body: ApiResponse<null> } {
  const internalError = normalizeInternalError(error)

  return {
    status: internalError.httpException.status,
    body: {
      payload: null,
      error: internalError.identifier,
      message: internalError.message,
    },
  }
}
