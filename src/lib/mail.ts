// Email over Resend's REST API. RESEND_API_BASE exists so tests can point at a local server.
type Mail = { apiKey: string; from: string; to: string; subject: string; text: string; replyTo?: string; idempotencyKey?: string };

export async function sendMail({ apiKey, from, to, subject, text, replyTo, idempotencyKey }: Mail): Promise<boolean> {
  try {
    const res = await fetch(`${process.env.RESEND_API_BASE ?? "https://api.resend.com"}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(idempotencyKey && { "Idempotency-Key": idempotencyKey }),
      },
      body: JSON.stringify({ from, to: [to], subject, text, ...(replyTo && { reply_to: replyTo }) }),
      signal: AbortSignal.timeout(8_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
