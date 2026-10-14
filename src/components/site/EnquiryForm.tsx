"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { site, volunteerRoles } from "@/config/site";
import type { EnquiryKind } from "@/lib/enquiry";

type Status = { state: "idle" | "sending" | "done" | "error"; message?: string; demo?: boolean };

const contactTopics = ["General question", "Partnership or CSR", "Donations and receipts", "Volunteering", "Media"];

const successText: Record<EnquiryKind, string> = {
  newsletter: "You're subscribed. Look out for our next update.",
  volunteer: "Thank you! Our volunteer coordinator will contact you within 3 working days.",
  contact: "Thanks for writing. We reply within 2 working days.",
};

export function EnquiryForm({ kind, dark = false }: { kind: EnquiryKind; dark?: boolean }) {
  const id = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ state: "sending" });
    setErrors({});
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind }),
      });
      const json = await res.json();
      if (json.ok) {
        form.reset();
        setStatus({ state: "done", demo: json.demo });
      } else {
        setErrors(json.errors ?? {});
        setStatus({ state: "error", message: json.error ?? "Please check the highlighted fields." });
      }
    } catch {
      setStatus({ state: "error", message: `Something went wrong. Please email ${site.email}.` });
    }
  }

  const label = dark ? "text-white/90" : "text-ink";
  const field = dark ? "field border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-sun focus:ring-sun/30" : "field";
  const err = (name: string) =>
    errors[name] && <p id={`${id}-${name}-error`} className={`mt-1.5 text-sm ${dark ? "text-sun" : "text-destructive"}`}>{errors[name]}</p>;
  const described = (name: string) => (errors[name] ? `${id}-${name}-error` : undefined);

  if (status.state === "done") {
    return (
      <div role="status" className={`flex items-start gap-3 rounded-2xl p-5 ${dark ? "bg-white/10 text-white" : "bg-sage text-forest"}`}>
        <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
        <div>
          <p className="font-semibold">{successText[kind]}</p>
          {status.demo && <p className="mt-1 text-sm opacity-80">Demo mode: nothing was sent. Add a Resend API key to receive these by email.</p>}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Company<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {kind === "newsletter" ? (
        <div>
          <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" required placeholder="you@example.com"
              aria-invalid={!!errors.email} aria-describedby={described("email")} className={field} />
            <button type="submit" disabled={status.state === "sending"} className="btn bg-sun text-ink hover:bg-[#e9a420] sm:flex-none">
              {status.state === "sending" ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
          {err("email")}
          <p className={`mt-2 text-xs ${dark ? "text-white/70" : "text-ink-soft"}`}>
            Unsubscribe anytime. We never share your email. <a href="/privacy" className="underline">Privacy policy</a>.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-name`} className={`mb-1.5 block text-sm font-semibold ${label}`}>Full name</label>
              <input id={`${id}-name`} name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={described("name")} className={field} />
              {err("name")}
            </div>
            <div>
              <label htmlFor={`${id}-email`} className={`mb-1.5 block text-sm font-semibold ${label}`}>Email</label>
              <input id={`${id}-email`} name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={described("email")} className={field} />
              {err("email")}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-phone`} className={`mb-1.5 block text-sm font-semibold ${label}`}>
                Phone <span className="font-normal text-ink-soft">(optional)</span>
              </label>
              <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={field} />
            </div>
            <div>
              <label htmlFor={`${id}-topic`} className={`mb-1.5 block text-sm font-semibold ${label}`}>
                {kind === "volunteer" ? "I'd like to help as" : "Topic"}
              </label>
              <select id={`${id}-topic`} name="topic" className={field} defaultValue="">
                <option value="" disabled>Choose one</option>
                {(kind === "volunteer" ? [...volunteerRoles.map((r) => r.role), "Anything that's needed"] : contactTopics).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor={`${id}-message`} className={`mb-1.5 block text-sm font-semibold ${label}`}>
              {kind === "volunteer" ? <>A little about you <span className="font-normal text-ink-soft">(optional)</span></> : "Message"}
            </label>
            <textarea id={`${id}-message`} name="message" rows={5} required={kind === "contact"} aria-invalid={!!errors.message}
              aria-describedby={described("message")} className={`${field} resize-y`} />
            {err("message")}
          </div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
            <input type="checkbox" name="marketing" className="mt-0.5 size-5 accent-[var(--forest)]" />
            <span>Send me occasional updates about programmes and volunteering (optional).</span>
          </label>
          <p className="text-xs leading-relaxed text-ink-soft">
            We use your details only to reply to you{kind === "volunteer" ? " and arrange volunteering" : ""}, in line with the PDPA.{" "}
            See our <a href="/privacy" className="underline">privacy policy</a>.
          </p>
          <button type="submit" disabled={status.state === "sending"} className="btn-forest w-full sm:w-auto">
            {status.state === "sending" ? "Sending…" : kind === "volunteer" ? "Send my application" : "Send message"}
            <ArrowRight className="size-4" />
          </button>
        </>
      )}

      <p aria-live="polite" className={`text-sm ${dark ? "text-sun" : "text-destructive"}`}>
        {status.state === "error" ? status.message : ""}
      </p>
    </form>
  );
}
