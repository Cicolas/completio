import vine from '@vinejs/vine'

export const completionValidator = vine.compile(
  vine.object({
    prompt: vine.string().trim().maxLength(500),
    context: vine.string().trim().maxLength(2000).optional(),
    maxTokens: vine.number().withoutDecimals().positive().max(4096).optional(),
  })
)
