import assert from "node:assert/strict";
import { createHmac, randomBytes } from "node:crypto";
import test from "node:test";
import { donorKey, MAX_SEALED, openDonor, sealDonor } from "../src/lib/donor-crypto.ts";
import { verifySignature } from "../src/lib/stripe.ts";

const key = randomBytes(32);
const donor = { name: "Tan Wei Ling", taxId: "S1234567D" };

test("a sealed donor opens with the same key and hides its contents", () => {
  const sealed = sealDonor(donor, key);
  assert.deepEqual(openDonor(sealed, key), donor);
  assert.ok(!sealed.includes("S1234567D") && !Buffer.from(sealed.slice(3), "base64url").includes("S1234567D"));
  assert.notEqual(sealed, sealDonor(donor, key), "a fresh IV each time");
});

test("a wrong key or a changed value is refused", () => {
  const sealed = sealDonor(donor, key);
  assert.throws(() => openDonor(sealed, randomBytes(32)));
  const bytes = Buffer.from(sealed.slice(3), "base64url");
  bytes[bytes.length - 1] ^= 1;
  assert.throws(() => openDonor(`v1.${bytes.toString("base64url")}`, key));
  assert.throws(() => openDonor(sealed.replace("v1", "v2"), key));
  assert.throws(() => openDonor("v1.", key));
});

test("a 100-letter name fits in one metadata value", () => {
  assert.ok(sealDonor({ name: "a".repeat(100), taxId: "S1234567D" }, key).length <= MAX_SEALED);
});

test("the key must be 32 bytes", () => {
  assert.equal(donorKey(""), null);
  assert.equal(donorKey(randomBytes(16).toString("base64")), null);
  assert.equal(donorKey(key.toString("base64"))?.length, 32);
});

const secret = "whsec_test";
const now = 1_800_000_000_000;
const sign = (body, t = now / 1000, s = secret) => `t=${t},v1=${createHmac("sha256", s).update(`${t}.${body}`).digest("hex")}`;

test("a good signature passes", () => assert.ok(verifySignature("{}", sign("{}"), secret, now)));

test("either signature passes while a secret is rolled", () => {
  const [t, good] = sign("{}").split(",");
  assert.ok(verifySignature("{}", `${t},v1=${"0".repeat(64)},${good}`, secret, now));
});

test("bad signatures are refused", () => {
  assert.equal(verifySignature("{}", null, secret, now), false, "missing");
  assert.equal(verifySignature("{} ", sign("{}"), secret, now), false, "changed body");
  assert.equal(verifySignature("{}", sign("{}", now / 1000, "whsec_other"), secret, now), false, "other secret");
  assert.equal(verifySignature("{}", sign("{}", now / 1000 - 301), secret, now), false, "too old");
  assert.equal(verifySignature("{}", sign("{}", now / 1000 + 301), secret, now), false, "from the future");
  assert.equal(verifySignature("{}", sign("{}").replace("v1=", "v0="), secret, now), false, "other scheme");
  assert.equal(verifySignature("{}", "t=abc,v1=zz", secret, now), false, "garbage");
});
