export type SubmissionIdentity = {fingerprint: string; id: string} | null

/** Reuse an idempotency key only while retrying the exact same request body. */
export function submissionIdFor(payload: unknown, previous: SubmissionIdentity): SubmissionIdentity {
  const fingerprint = JSON.stringify(payload)
  if (previous?.fingerprint === fingerprint) return previous
  return {fingerprint, id: crypto.randomUUID()}
}
