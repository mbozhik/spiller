import assert from 'node:assert/strict'
import {test} from 'node:test'
import {confirmSubmission} from './submissions-client'

test('reports each confirmed submission type without sending the receipt or contact data', async () => {
  const calls: unknown[][] = []
  const previous = globalThis.window
  Object.defineProperty(globalThis, 'window', {configurable: true, writable: true, value: {ym: (...args: unknown[]) => calls.push(args)}})
  try {
    for (const kind of ['contact', 'partnership', 'order'] as const) {
      await confirmSubmission(new Response(JSON.stringify({id: 'submissions.receipt', email: 'test@example.com'}), {status: 201}), kind)
    }
    await assert.rejects(confirmSubmission(new Response(JSON.stringify({id: 'submissions.receipt'}), {status: 503}), 'contact'))
    await assert.rejects(confirmSubmission(new Response('{}', {status: 201}), 'contact'))
    assert.deepEqual(calls, ['contact', 'partnership', 'order'].map(kind => [96197419, 'reachGoal', `submission_accepted_${kind}`, {form_type: kind}]))
    window.ym = undefined
    await confirmSubmission(new Response(JSON.stringify({id: 'submissions.receipt'}), {status: 201}), 'contact')
    window.ym = () => { throw new Error('analytics blocked') }
    await confirmSubmission(new Response(JSON.stringify({id: 'submissions.receipt'}), {status: 201}), 'contact')
  } finally {
    if (previous === undefined) Reflect.deleteProperty(globalThis, 'window')
    else globalThis.window = previous
  }
})
