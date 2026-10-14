"use client";

import { useState } from "react";
import { Heart, Lock } from "lucide-react";
import { donations, money, site } from "@/config/site";
import { isValidTaxId, normaliseTaxId } from "@/lib/donor";

type Frequency = "once" | "monthly";

const impactFor = (amount: number) => donations.impact.find((i) => amount <= i.upTo)?.text ?? donations.impact.at(-1)!.text;

export function DonationWidget({ initialAmount, initialFrequency = "monthly", compact = false }: { initialAmount?: number; initialFrequency?: Frequency; compact?: boolean }) {
  const start = initialAmount && initialAmount >= donations.minimum ? initialAmount : donations.defaultAmount;
  const [frequency, setFrequency] = useState<Frequency>(initialFrequency);
  const [wantsReceipt, setWantsReceipt] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [amount, setAmount] = useState(start);
  const [custom, setCustom] = useState(donations.presets.includes(start) ? "" : String(start));
  const [notice, setNotice] = useState("");

  const taxIdOk = !wantsReceipt || (donorName.trim().length > 1 && isValidTaxId(normaliseTaxId(taxId)));
  const amountOk = Number.isFinite(amount) && amount >= donations.minimum;
  const valid = amountOk && taxIdOk;
  const showTaxIdError = wantsReceipt && taxId.length >= 9 && !isValidTaxId(normaliseTaxId(taxId));

  const [busy, setBusy] = useState(false);

  async function donate() {
    if (!valid || busy) return;
    setBusy(true);
    setNotice("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          frequency,
          ...(wantsReceipt && { donorName: donorName.trim(), taxId: normaliseTaxId(taxId) }),
        }),
      });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
        return;
      }
      setNotice(
        json.demo
          ? `Demo mode: this would open secure checkout for ${money(amount)}${frequency === "monthly" ? " a month" : ""}. Add a Stripe key or payment link to go live.`
          : json.error ?? `Something went wrong. Please email ${site.email}.`,
      );
    } catch {
      setNotice(`Something went wrong. Please email ${site.email}.`);
    }
    setBusy(false);
  }

  return (
    <div className={`card shadow-[0_30px_60px_-30px_rgb(23_37_29/0.35)] ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}>
      <fieldset>
        <legend className="sr-only">How often</legend>
        <div className="grid grid-cols-2 rounded-full bg-paper-2 p-1 text-sm font-semibold">
          {(["monthly", "once"] as const).map((f) => (
            <label key={f} className={`cursor-pointer rounded-full px-4 py-2.5 text-center transition has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sunrise-bright ${frequency === f ? "bg-forest text-white shadow" : "text-ink-soft"}`}>
              <input type="radio" name="frequency" value={f} checked={frequency === f} onChange={() => setFrequency(f)} className="sr-only" />
              {f === "monthly" ? "Monthly" : "One-time"}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-3 text-sm font-semibold text-ink">Choose an amount ({donations.currency})</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {donations.presets.map((p) => (
            <label key={p} className={`cursor-pointer rounded-2xl border-2 py-3 text-center font-serif text-2xl font-semibold tabular-nums transition has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sunrise-bright ${amount === p && !custom ? "border-sunrise bg-sunrise/5 text-sunrise" : "border-line bg-surface text-ink hover:border-ink/30"}`}>
              <input type="radio" name="amount" value={p} checked={amount === p && !custom} onChange={() => { setAmount(p); setCustom(""); setNotice(""); }} className="sr-only" />
              {money(p)}
            </label>
          ))}
        </div>
        <label htmlFor="custom-amount" className="mt-3 block text-sm text-ink-soft">Or enter your own amount</label>
        <div className="relative mt-1.5">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">{donations.symbol}</span>
          <input
            id="custom-amount"
            inputMode="numeric"
            pattern="[0-9]*"
            value={custom}
            placeholder="Other"
            onChange={(e) => {
              const v = e.target.value.replace(/[^\d]/g, "").slice(0, 6);
              setCustom(v);
              setAmount(v ? Number(v) : donations.defaultAmount);
              setNotice("");
            }}
            aria-describedby="amount-hint"
            className="field pl-8"
          />
        </div>
        <p id="amount-hint" className={`mt-1.5 text-xs ${custom && !amountOk ? "text-destructive" : "text-ink-soft"}`}>
          Minimum {money(donations.minimum)}.
        </p>
      </fieldset>

      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
          <input type="checkbox" checked={wantsReceipt} onChange={(e) => setWantsReceipt(e.target.checked)} className="mt-0.5 size-5 accent-[var(--forest)]" />
          <span><strong className="font-semibold">I want a 250% tax deduction</strong> (Singapore taxpayers)</span>
        </label>
        {wantsReceipt && (
          <div className="mt-3 grid gap-3 rounded-2xl border border-line bg-paper p-4 sm:grid-cols-2">
            <div>
              <label htmlFor="donor-name" className="mb-1 block text-sm font-semibold text-ink">Full name (as in NRIC)</label>
              <input id="donor-name" value={donorName} onChange={(e) => setDonorName(e.target.value)} autoComplete="name" className="field" />
            </div>
            <div>
              <label htmlFor="tax-id" className="mb-1 block text-sm font-semibold text-ink">NRIC, FIN or UEN</label>
              <input
                id="tax-id"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value.slice(0, 12))}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                aria-invalid={showTaxIdError}
                aria-describedby="tax-id-note"
                className="field uppercase"
              />
            </div>
            <p id="tax-id-note" className={`text-xs leading-relaxed sm:col-span-2 ${showTaxIdError ? "text-destructive" : "text-ink-soft"}`}>
              {showTaxIdError
                ? "That doesn't look like a valid NRIC, FIN or UEN."
                : <>We use this only to file your deduction with IRAS, as the law requires. See our <a href="/privacy" className="underline">privacy policy</a>.</>}
            </p>
          </div>
        )}
      </div>

      <p aria-live="polite" className="mt-5 rounded-2xl bg-sage/70 p-4 text-[0.95rem] leading-relaxed text-forest">
        {amountOk ? (
          <>
            <strong className="font-semibold">{money(amount)}{frequency === "monthly" ? " a month" : ""}</strong> can provide {impactFor(amount)}.
          </>
        ) : (
          <>Enter at least {money(donations.minimum)} to see what your gift does.</>
        )}
      </p>

      <button type="button" onClick={donate} disabled={!valid || busy} className="btn-donate mt-5 w-full">
        <Heart className="size-4" fill="currentColor" />
        {busy ? "Opening secure checkout…" : <>Give {amountOk ? money(amount) : ""}{frequency === "monthly" ? " monthly" : ""}</>}
      </button>

      {notice && <p role="status" className="mt-3 rounded-xl border border-sun/60 bg-sun/15 p-3 text-sm text-ink">{notice}</p>}

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
        <Lock className="mt-0.5 size-3.5 shrink-0" /> {donations.taxNote}
      </p>
    </div>
  );
}
