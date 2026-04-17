import vine from '@vinejs/vine'

export const completionValidator = vine.compile(
  vine.object({
    prompt: vine.string().trim().minLength(1).maxLength(500),
  })
)