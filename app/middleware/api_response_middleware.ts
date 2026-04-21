import type { ApiResponse } from '#common/interfaces/api_response'
import { shouldWrapApiResponse } from '#exceptions/internal_error'
import { toErrorResponse } from '#exceptions/internal_error_builder'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ApiResponseMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      const output = await next()

      if (!this.#shouldWrapSuccess(ctx)) {
        return output
      }

      const body = ctx.response.getBody()
      ctx.response.json(this.#wrapResponse(body))

      return output
    } catch (error) {
      if (!shouldWrapApiResponse(ctx)) {
        throw error
      }

      const { status, body } = toErrorResponse(error)
      ctx.response.status(status).json(body)
    }
  }

  #shouldWrapSuccess(ctx: HttpContext): boolean {
    if (!shouldWrapApiResponse(ctx)) {
      return false
    }

    const status = ctx.response.getStatus()
    if (status >= 300 && status < 400) {
      return false
    }

    if (ctx.response.hasStream || ctx.response.hasFileToStream) {
      return false
    }

    return ctx.response.hasLazyBody
  }

  #isWrappedResponse(body: unknown): body is ApiResponse<unknown> {
    return (
      typeof body === 'object' &&
      body !== null &&
      'payload' in body &&
      'error' in body &&
      'message' in body &&
      (body.error === null || typeof body.error === 'string') &&
      (body.message === null || typeof body.message === 'string')
    )
  }

  #wrapResponse(body: unknown): ApiResponse<unknown> {
    if (this.#isWrappedResponse(body)) {
      return body
    }

    if (typeof body === 'object' && body !== null && 'error' in body && 'message' in body) {
      if ('payload' in body) {
        return body as ApiResponse<unknown>
      }

      if ('data' in body) {
        const { data: legacyData, ...rest } = body as Record<string, unknown>
        return {
          ...rest,
          payload: legacyData,
        } as ApiResponse<unknown>
      }

      return {
        ...(body as Record<string, unknown>),
        payload: null,
      } as ApiResponse<unknown>
    }

    if (typeof body === 'string') {
      return {
        payload: null,
        error: null,
        message: body,
      }
    }

    if (typeof body === 'object' && body !== null && 'message' in body) {
      const { message, ...rest } = body as Record<string, unknown>
      return {
        payload: rest,
        error: null,
        message: typeof message === 'string' ? message : null,
      }
    }

    return {
      payload: body ?? null,
      error: null,
      message: null,
    }
  }
}
