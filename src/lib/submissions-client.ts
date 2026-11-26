export type SubmissionIdentity = {fingerprint: string; id: string} | null

type SubmissionKind = 'contact' | 'partnership' | 'order'

declare global {
  interface Window {
    ym?: (counter: number, method: 'reachGoal', target: string, params: {form_type: SubmissionKind}) => void
  }
}

export async function confirmSubmission(response: Response, kind: SubmissionKind) {
  if (!response.ok) throw new Error('Failed to send data')

  const result = await response.json()
  if (typeof result?.id !== 'string' || !result.id.startsWith('submissions.')) {
    throw new Error('Submission was not confirmed')
  }

  try {
    window.ym?.(96197419, 'reachGoal', `submission_accepted_${kind}`, {form_type: kind})
  } catch {
    // Analytics must not turn a saved submission into a form error.
  }
}

/** Reuse an idempotency key only while retrying the exact same request body. */
export function submissionIdFor(payload: unknown, previous: SubmissionIdentity): SubmissionIdentity {
  const fingerprint = JSON.stringify(payload)
  if (previous?.fingerprint === fingerprint) return previous
  return {fingerprint, id: crypto.randomUUID()}
}
