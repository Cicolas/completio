import { test } from '@japa/runner'
import { completionValidator } from '#validators/completion'

test.group('completion validator', () => {
  test('allows an empty prompt', async ({ assert }) => {
    const payload = await completionValidator.validate({
      prompt: '',
    })

    assert.deepEqual(payload, {
      prompt: '',
    })
  })

  test('trims prompt whitespace down to an empty string', async ({ assert }) => {
    const payload = await completionValidator.validate({
      prompt: '   ',
    })

    assert.deepEqual(payload, {
      prompt: '',
    })
  })
})
