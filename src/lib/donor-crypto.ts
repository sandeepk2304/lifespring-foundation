import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

// Tax details have to travel with the payment, and there is no database. So they are sealed here
// and Stripe stores only the ciphertext: the key stays with the charity and never goes to Stripe.
// AES-256-GCM, which also detects any change to the stored value.
export type Donor = { name: string; taxId: string };

const VERSION = "v1";
const AAD = Buffer.from("donor-tax-details:v1");
// Stripe's limit for one metadata value.
export const MAX_SEALED = 500;

/** The key from DONOR_DATA_KEY: 32 random bytes in base64. Null when unset or the wrong size. */
export function donorKey(raw = process.env.DONOR_DATA_KEY): Buffer | null {
  if (!raw) return null;
  const key = Buffer.from(raw, "base64");
  return key.length === 32 ? key : null;
}

export function sealDonor(donor: Donor, key: Buffer): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv).setAAD(AAD);
  const body = Buffer.concat([cipher.update(JSON.stringify(donor), "utf8"), cipher.final()]);
  return `${VERSION}.${Buffer.concat([iv, cipher.getAuthTag(), body]).toString("base64url")}`;
}

/** Throws when the key is wrong or the value was changed. */
export function openDonor(sealed: string, key: Buffer): Donor {
  const [version, data] = sealed.split(".");
  if (version !== VERSION || !data) throw new Error("Unknown donor format");
  const buf = Buffer.from(data, "base64url");
  const decipher = createDecipheriv("aes-256-gcm", key, buf.subarray(0, 12), { authTagLength: 16 }).setAAD(AAD);
  decipher.setAuthTag(buf.subarray(12, 28));
  return JSON.parse(Buffer.concat([decipher.update(buf.subarray(28)), decipher.final()]).toString("utf8"));
}
