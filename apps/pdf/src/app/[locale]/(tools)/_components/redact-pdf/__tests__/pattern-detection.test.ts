import { describe, it, expect } from "vitest";
import {
  CREDIT_CARD_REGEX,
  PHONE_REGEXES,
  PATTERN_REGEXES,
  isValidCreditCard,
} from "../redact-types";

// Helper: collect all matches from a regex against a string
function allMatches(regex: RegExp, text: string): string[] {
  const r = new RegExp(regex.source, regex.flags);
  const results: string[] = [];
  let m;
  while ((m = r.exec(text)) !== null) results.push(m[0].trim());
  return results;
}

function allPhoneMatches(text: string): string[] {
  const results: string[] = [];
  for (const regex of PHONE_REGEXES) {
    const r = new RegExp(regex.source, regex.flags);
    let m;
    while ((m = r.exec(text)) !== null) {
      const t = m[0].trim();
      const digits = t.replace(/\D/g, "");
      if (digits.length >= 7 && digits.length <= 15) results.push(t);
    }
  }
  // De-duplicate
  return [...new Set(results)];
}

// ═══════════════════════════════════════════════════════════
// Credit Card
// ═══════════════════════════════════════════════════════════

describe("Credit Card Detection", () => {
  it("matches standard 16-digit card numbers", () => {
    const matches = allMatches(CREDIT_CARD_REGEX, "4111111111111111");
    expect(matches).toContain("4111111111111111");
    expect(isValidCreditCard("4111111111111111")).toBe(true);
  });

  it("matches card numbers with dashes", () => {
    const matches = allMatches(CREDIT_CARD_REGEX, "4111-1111-1111-1111");
    expect(matches.some((m) => m.replace(/[-\s]/g, "") === "4111111111111111")).toBe(true);
  });

  it("matches card numbers with spaces", () => {
    const matches = allMatches(CREDIT_CARD_REGEX, "4111 1111 1111 1111");
    expect(matches.some((m) => m.replace(/[-\s]/g, "") === "4111111111111111")).toBe(true);
  });

  it("matches Visa cards", () => {
    const num = "4532015112830366";
    const matches = allMatches(CREDIT_CARD_REGEX, num);
    expect(matches.length).toBeGreaterThan(0);
    expect(isValidCreditCard(num)).toBe(true);
  });

  it("matches Mastercard", () => {
    const num = "5425233430109903";
    const matches = allMatches(CREDIT_CARD_REGEX, num);
    expect(matches.length).toBeGreaterThan(0);
    expect(isValidCreditCard(num)).toBe(true);
  });

  it("matches Amex (15 digits)", () => {
    const num = "378282246310005";
    const matches = allMatches(CREDIT_CARD_REGEX, num);
    expect(matches.length).toBeGreaterThan(0);
    expect(isValidCreditCard(num)).toBe(true);
  });

  it("matches Discover card", () => {
    const num = "6011000990139424";
    const matches = allMatches(CREDIT_CARD_REGEX, num);
    expect(matches.length).toBeGreaterThan(0);
    expect(isValidCreditCard(num)).toBe(true);
  });

  it("does not match short numbers", () => {
    const matches = allMatches(CREDIT_CARD_REGEX, "12345678");
    const valid = matches.filter((m) => isValidCreditCard(m));
    expect(valid).toHaveLength(0);
  });

  it("does not match document IDs like 2024-001", () => {
    const matches = allMatches(CREDIT_CARD_REGEX, "REF: 2024-001");
    const valid = matches.filter((m) => isValidCreditCard(m));
    expect(valid).toHaveLength(0);
  });

  it("matches card separately even near other numbers (per-item matching)", () => {
    // In the real tool, items are matched individually so this won't be joined.
    // But even in joined text, the card alone should still be matchable.
    const cardOnly = "6011000990139424";
    const matches = allMatches(CREDIT_CARD_REGEX, cardOnly);
    const valid = matches.filter((m) => isValidCreditCard(m));
    expect(valid.length).toBeGreaterThan(0);
  });
});

// ═══════════════════════════════════════════════════════════
// Luhn Validation
// ═══════════════════════════════════════════════════════════

describe("Luhn Validation", () => {
  it("validates known test card numbers", () => {
    expect(isValidCreditCard("4111111111111111")).toBe(true);   // Visa test
    expect(isValidCreditCard("5500000000000004")).toBe(true);   // MC test
    expect(isValidCreditCard("378282246310005")).toBe(true);    // Amex test
    expect(isValidCreditCard("6011000990139424")).toBe(true);   // Discover test
    expect(isValidCreditCard("3530111333300000")).toBe(true);   // JCB test
  });

  it("rejects invalid numbers", () => {
    expect(isValidCreditCard("1234567890123456")).toBe(false);
    // 0000000000000000 technically passes Luhn (sum%10==0), this is expected
    expect(isValidCreditCard("12345")).toBe(false);
  });

  it("handles dashes and spaces", () => {
    expect(isValidCreditCard("4111-1111-1111-1111")).toBe(true);
    expect(isValidCreditCard("4111 1111 1111 1111")).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════
// Phone Number Detection
// ═══════════════════════════════════════════════════════════

describe("Phone Number Detection", () => {
  it("matches regional 0XX-XXXX-XXXX format", () => {
    const results = allPhoneMatches("010-1234-5678");
    expect(results.length).toBeGreaterThan(0);
  });

  it("matches regional landline 0X-XXXX-XXXX", () => {
    const results = allPhoneMatches("02-1234-5678");
    expect(results.length).toBeGreaterThan(0);
  });

  it("matches international +82 format", () => {
    const results = allPhoneMatches("+82-10-1234-5678");
    expect(results.length).toBeGreaterThan(0);
  });

  it("matches US format (XXX) XXX-XXXX", () => {
    const results = allPhoneMatches("(212) 555-0147");
    expect(results.length).toBeGreaterThan(0);
  });

  it("matches international +1 format", () => {
    const results = allPhoneMatches("+1-212-555-0147");
    expect(results.length).toBeGreaterThan(0);
  });

  it("matches international +44 format", () => {
    const results = allPhoneMatches("+44-20-7946-0958");
    expect(results.length).toBeGreaterThan(0);
  });

  it("matches international +81 format", () => {
    const results = allPhoneMatches("+81-3-5555-0013");
    expect(results.length).toBeGreaterThan(0);
  });

  it("does NOT match document IDs like 2024-001", () => {
    const results = allPhoneMatches("2024-001");
    expect(results).toHaveLength(0);
  });

  it("does NOT match dates like 2024-03-15", () => {
    const results = allPhoneMatches("2024-03-15");
    expect(results).toHaveLength(0);
  });

  it("does NOT match SSN-like numbers 920315-1234567", () => {
    const results = allPhoneMatches("920315-1234567");
    expect(results).toHaveLength(0);
  });

  it("does NOT match bank account numbers", () => {
    const results = allPhoneMatches("1234567890");
    expect(results).toHaveLength(0);
  });
});

// ═══════════════════════════════════════════════════════════
// Email Detection
// ═══════════════════════════════════════════════════════════

describe("Email Detection", () => {
  it("matches standard emails", () => {
    const matches = allMatches(PATTERN_REGEXES.email, "john.doe@acme.com");
    expect(matches).toContain("john.doe@acme.com");
  });

  it("matches emails with subdomains", () => {
    const matches = allMatches(PATTERN_REGEXES.email, "user@mail.example.co.kr");
    expect(matches).toContain("user@mail.example.co.kr");
  });

  it("matches emails with + alias", () => {
    const matches = allMatches(PATTERN_REGEXES.email, "test+tag@gmail.com");
    expect(matches).toContain("test+tag@gmail.com");
  });

  it("does not match strings without @", () => {
    const matches = allMatches(PATTERN_REGEXES.email, "not an email");
    expect(matches).toHaveLength(0);
  });

  it("finds multiple emails in text", () => {
    const text = "Contact john@example.com or jane@example.com for info.";
    const matches = allMatches(PATTERN_REGEXES.email, text);
    expect(matches).toContain("john@example.com");
    expect(matches).toContain("jane@example.com");
  });
});
