import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@adonisjs/core/http'

export type HttpException = ReturnType<typeof errors.E_HTTP_EXCEPTION.invoke>

export class InternalError extends Error {
  constructor(
    public identifier: string,
    public override message: string,
    public httpException: HttpException,
    public override cause: unknown = undefined
  ) {
    super(message, cause instanceof Error ? { cause } : undefined)
    this.name = 'InternalError'
  }

  static badRequest(identifier = 'BAD_REQUEST', userMessage = 'Request failed', cause?: unknown) {
    return this.create(identifier, userMessage, 400, cause)
  }

  static unauthorized(
    identifier = 'UNAUTHORIZED',
    userMessage = 'Unauthorized',
    cause?: unknown
  ) {
    return this.create(identifier, userMessage, 401, cause)
  }

  static forbidden(identifier = 'FORBIDDEN', userMessage = 'Forbidden', cause?: unknown) {
    return this.create(identifier, userMessage, 403, cause)
  }

  static notFound(
    identifier = 'NOT_FOUND',
    userMessage = 'Resource not found',
    cause?: unknown
  ) {
    return this.create(identifier, userMessage, 404, cause)
  }

  static conflict(identifier = 'CONFLICT', userMessage = 'Conflict', cause?: unknown) {
    return this.create(identifier, userMessage, 409, cause)
  }

  static gone(identifier = 'GONE', userMessage = 'Resource is no longer available', cause?: unknown) {
    return this.create(identifier, userMessage, 410, cause)
  }

  static upstream(
    identifier = 'UPSTREAM_ERROR',
    userMessage = 'Upstream request failed',
    cause?: unknown
  ) {
    return this.create(identifier, userMessage, 502, cause)
  }

  static unexpected(
    identifier = 'INTERNAL_ERROR',
    userMessage = 'An unexpected error occurred',
    cause?: unknown
  ) {
    return this.create(identifier, userMessage, 500, cause)
  }

  static internal(
    identifier = 'INTERNAL_ERROR',
    userMessage = 'An unexpected error occurred',
    cause?: unknown
  ) {
    return this.unexpected(identifier, userMessage, cause)
  }

  static todo() {
    return this.create('NOT_IMPLEMENTED_YET', 'Not implemented yet', 501)
  }

  private static create(identifier: string, userMessage: string, status: number, cause?: unknown) {
    return new InternalError(
      identifier,
      userMessage,
      errors.E_HTTP_EXCEPTION.invoke(userMessage, status, identifier),
      cause
    )
  }
}

export function shouldWrapApiResponse(ctx: HttpContext): boolean {
  if (!ctx.request.url().startsWith('/api')) {
    return false
  }

  return ctx.request.accepts(['json', 'html']) === 'json' || ctx.request.ajax()
}
