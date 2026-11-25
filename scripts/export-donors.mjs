#!/usr/bin/env node
/**
 * Paid gifts with tax details, as CSV on stdout, for IRAS filing.
 *
 *   node --env-file=.env.local scripts/export-donors.mjs 2026-01-01 2026-12-31 > donors-2026.csv
 *
 * Run it on the finance person's own machine: this is the only place the tax ids are readable.
 * The output holds NRICs, so keep it out of git and delete it after filing. Dates are Singapore
 * days, both included. Refunds are not subtracted; check them in Stripe first.
 * Needs Node 22.18 or later, STRIPE_SECRET_KEY (read) and DONOR_DATA_KEY.
 */
import { donorKey, openDonor } from "../src/lib/donor-crypto.ts";

const [from, to] = process.argv.slice(2);
const secret = process.env.STRIPE_SECRET_KEY;
const key = donorKey();
const DAY = /^\d{4}-\d{2}-\d{2}$/;
if (!DAY.test(from ?? "") || !DAY.test(to ?? "")) fail("Usage: export-donors.mjs YYYY-MM-DD YYYY-MM-DD");
if (!secret) fail("STRIPE_SECRET_KEY is not set");
if (!key) fail("DONOR_DATA_KEY must be 32 bytes in base64");

function fail(message) {
  console.error(message);
  process.exit(1);
}

const base = process.env.STRIPE_API_BASE ?? "https://api.stripe.com";
const gte = Date.parse(`${from}T00:00:00+08:00`) / 1000;
const lt = Date.parse(`${to}T00:00:00+08:00`) / 1000 + 86_400;

async function* list(path, extra) {
  let after;
  do {
    const q = new URLSearchParams({ limit: "100", "created[gte]": String(gte), "created[lt]": String(lt), ...extra, ...(after && { starting_after: after }) });
    const res = await fetch(`${base}/v1/${path}?${q}`, { headers: { Authorization: `Bearer ${secret}` } });
    const page = await res.json();
    if (!res.ok) fail(`Stripe: ${page.error?.message ?? res.status}`);
    yield* page.data;
    after = page.has_more ? page.data.at(-1).id : undefined;
  } while (after);
}

const day = (seconds) => new Date(seconds * 1000).toLocaleDateString("en-CA", { timeZone: "Asia/Singapore" });
const rows = [];
let unreadable = 0;

function add(sealed, created, minor, currency, frequency, reference) {
  if (!sealed) return;
  try {
    const { name, taxId } = openDonor(sealed, key);
    rows.push([day(created), name, taxId, (minor / 100).toFixed(2), currency.toUpperCase(), frequency, reference]);
  } catch {
    unreadable++;
    console.error(`Could not read the donor on ${reference}: wrong key or changed value`);
  }
}

for await (const s of list("checkout/sessions", {})) {
  if (s.mode === "payment" && s.payment_status === "paid") add(s.metadata?.donor, s.created, s.amount_total, s.currency, "once", s.id);
}
// Monthly gifts, first payment included: every one has its own invoice.
for await (const i of list("invoices", { status: "paid" })) {
  const meta = i.parent?.subscription_details?.metadata ?? i.subscription_details?.metadata;
  add(meta?.donor, i.created, i.amount_paid, i.currency, "monthly", i.id);
}

// A leading quote stops a spreadsheet from running a name that starts like a formula.
const cell = (v) => {
  const s = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
rows.sort((a, b) => a[0].localeCompare(b[0]));
console.log([["Date", "Name", "Tax ID", "Amount", "Currency", "Frequency", "Reference"], ...rows].map((r) => r.map(cell).join(",")).join("\n"));
console.error(`${rows.length} gifts exported${unreadable ? `, ${unreadable} unreadable` : ""}`);
if (unreadable) process.exitCode = 2;
