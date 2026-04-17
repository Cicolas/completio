import { AiService } from '#services/ai_service'
import { completionValidator } from '#validators/completion'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CompletionController {
  constructor(private aiService: AiService) {}

  async complete({ request, response }: HttpContext) {
    const { prompt } = await request.validateUsing(completionValidator)
    const completion = await this.aiService.complete(prompt)
    return response.json({ completion })
  }
}
