import assert from 'node:assert/strict'
import {test} from 'node:test'
import {parseSubmission, saveAndNotify, type SubmissionDependencies} from './submissions'

const input = {kind: 'partnership', submissionId: '485233bd-58ec-4c52-ad25-c932d311acb1', email: 'auto.parts@example.com', name: 'Partner', phone: '+77000000000'}

test('accepts valid partner email with auto in it and supports the legacy form', () => {
  assert.equal(parseSubmission(input).email, input.email)
  assert.equal(parseSubmission({subject: 'Партнерство', email: input.email}).kind, 'partnership')
  assert.throws(() => parseSubmission({...input, email: 'invalid'}))
})

test('does not trust client prices, discount or promo details', () => {
  const result = parseSubmission({...input, kind: 'order', items: [{slug: {current: 'cream'}, quantity: 2, price: 1}], promoDetails: 'forged'})
  assert.deepEqual(result.items, [{slug: 'cream', quantity: 2}])
  assert.equal(result.promoCode, undefined)
  assert.throws(() => parseSubmission({...input, kind: 'order', items: []}))
})

test('saves first and leaves a durable record when Resend fails', async () => {
  const calls: string[] = []
  const dependencies: SubmissionDependencies = {
    persist: async () => { calls.push('persist'); return 'created' },
    send: async () => { calls.push('send'); throw Error('unavailable') },
    update: async (_id, status) => { calls.push(status.notificationStatus) },
    onStatusError: () => assert.fail('status update unexpectedly failed'),
  }
  await saveAndNotify(parseSubmission(input), dependencies)
  assert.deepEqual(calls, ['persist', 'send', 'failed'])

  dependencies.persist = async () => 'duplicate'
  await saveAndNotify(parseSubmission(input), dependencies)
  assert.deepEqual(calls, ['persist', 'send', 'failed'])
})

test('cannot notify when saving failed', async () => {
  await assert.rejects(saveAndNotify(parseSubmission(input), {
    persist: async () => { throw Error('Sanity offline') },
    send: async () => assert.fail('sent before saving'),
    update: async () => assert.fail('updated before saving'),
    onStatusError: () => assert.fail('unexpected status update'),
  }), /Sanity offline/)
})

test('records acceptance and still confirms a save if the status write fails', async () => {
  const submission = parseSubmission(input)
  let failedStatusWrite = false
  await saveAndNotify(submission, {
    persist: async () => 'created',
    send: async () => ({id: 'email-id'}),
    update: async (id, status) => {
      assert.equal(id, submission.id)
      assert.deepEqual(status, {notificationStatus: 'accepted', notificationId: 'email-id'})
      throw Error('Status write failed')
    },
    onStatusError: () => { failedStatusWrite = true },
  })
  assert.equal(failedStatusWrite, true)
})
