import { site } from "@/config/site";
import { validateEnquiry, type Enquiry } from "@/lib/enquiry";

// Very small per-IP limiter. Good enough for a single region; use Upstash or similar at scale.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const subjects = { newsletter: "New newsletter subscriber", volunteer: "New volunteer application", contact: "New message" };

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return Response.json({ ok: false, error: "Too many attempts. Please try again in a minute." }, { status: 429 });

  let body: Partial<Enquiry>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots fill every field; pretend it worked so they don't retry.
  if (body.company) return Response.json({ ok: true });

  const errors = validateEnquiry(body);
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !to) {
    if (site.demo) return Response.json({ ok: true, demo: true });
    return Response.json({ ok: false, error: "We couldn't send that right now. Please email us directly." }, { status: 503 });
  }

  const lines = [
    `Form: ${body.kind}`,
    body.name && `Name: ${body.name}`,
    `Email: ${body.email}`,
    body.phone && `Phone: ${body.phone}`,
    body.topic && `Topic: ${body.topic}`,
    body.kind !== "newsletter" && `Marketing opt-in: ${body.marketing === "on" ? "yes" : "no"}`,
    body.message && `\n${body.message}`,
  ].filter(Boolean);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL ?? `${site.shortName} website <onboarding@resend.dev>`,
      to: [to],
      reply_to: body.email,
      subject: `${subjects[body.kind!]}${body.name ? ` from ${body.name}` : ""}`,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) return Response.json({ ok: false, error: "We couldn't send that right now. Please email us directly." }, { status: 502 });
  return Response.json({ ok: true });
}
