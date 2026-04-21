import { test } from '@japa/runner'
import {
  buildCompletionSystemPrompt,
  getCompletionStopSequences,
} from '#services/completion_system_prompt'

test.group('completion system prompt', () => {
  test('includes completion behavior in the system prompt', ({ assert }) => {
    const systemPrompt = buildCompletionSystemPrompt()

    assert.include(systemPrompt, "complete the user's text from exactly where it stops")
    assert.include(systemPrompt, 'Return only the continuation text.')
    assert.include(systemPrompt, "Keep the same language, tone, and style as the user's text.")
  })

  test('appends optional context as background information', ({ assert }) => {
    const systemPrompt = buildCompletionSystemPrompt('The user is replying to a job offer.')

    assert.include(systemPrompt, 'Background context to consider while completing the text.')
    assert.include(systemPrompt, 'The user is replying to a job offer.')
  })

  test('returns shared stop sequences for short completions', ({ assert }) => {
    assert.deepEqual(getCompletionStopSequences(), ['.', '!', '?'])
  })
})
