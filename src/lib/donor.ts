// Singapore identifiers accepted for IRAS automatic tax-deduction filing.
const NRIC_FIN = /^[STFGM]\d{7}[A-Z]$/;
const UEN = /^(\d{8}[A-Z]|\d{9}[A-Z]|[TSR]\d{2}[A-Z]{2}\d{4}[A-Z])$/;

export const normaliseTaxId = (id: string) => id.trim().toUpperCase().replace(/\s+/g, "");
export const isValidTaxId = (id: string) => NRIC_FIN.test(id) || UEN.test(id);
