// Shared between the form (client) and the API route (server).
export const enquiryKinds = ["newsletter", "volunteer", "contact"] as const;
export type EnquiryKind = (typeof enquiryKinds)[number];

export type Enquiry = {
  kind: EnquiryKind;
  name?: string;
  email: string;
  phone?: string;
  topic?: string;
  message?: string;
  marketing?: string; // "on" when the visitor opted in to updates (unticked by default, per PDPA)
  company?: string; // honeypot: real people never fill this in
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns a map of field → error message; empty when valid. */
export function validateEnquiry(e: Partial<Enquiry>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!e.kind || !enquiryKinds.includes(e.kind)) errors.kind = "Unknown form.";
  if (!e.email || !EMAIL.test(e.email.trim())) errors.email = "Please enter a valid email address.";
  if (e.kind !== "newsletter") {
    if (!e.name || e.name.trim().length < 2) errors.name = "Please tell us your name.";
    if (e.kind === "contact" && (!e.message || e.message.trim().length < 10)) errors.message = "Please write at least a sentence.";
  }
  for (const [key, max] of [["name", 100], ["email", 200], ["phone", 30], ["topic", 100], ["message", 4000]] as const) {
    if ((e[key]?.length ?? 0) > max) errors[key] = "That's too long.";
  }
  return errors;
}
