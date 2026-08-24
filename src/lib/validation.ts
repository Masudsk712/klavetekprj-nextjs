/**
 * Shared form validation + sanitisation helpers.
 *
 * Every value coming from an API request is treated as untrusted input:
 * - `asString` coerces only real strings and trims them.
 * - `singleLine` strips line-break / whitespace runs from single-line fields to
 *   prevent content-injection / header-style smuggling inside email bodies.
 * - Length caps bound what we accept so we never echo unbounded user input.
 */

export const MAX_NAME_LENGTH = 120;
export const MAX_PHONE_LENGTH = 30;
export const MAX_PRODUCT_LENGTH = 200;
export const MAX_POSITION_LENGTH = 120;
export const MAX_EXPERIENCE_LENGTH = 100;
export const MAX_MESSAGE_LENGTH = 5000;

/** Maximum accepted resume size — 5 MB (kept intentionally small for email payloads). */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_RESUME_EXTENSIONS = ["pdf", "doc", "docx"] as const;

/**
 * MIME types permitted for resumes — defense-in-depth alongside the
 * extension check. When the browser provides a `file.type` it must be one
 * of these; an empty type falls back to the extension check so we never
 * reject a legitimate upload simply because the client omitted the type.
 */
export const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

/** Coerce an untrusted value into a trimmed string (never throws). */
export function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Collapse runs of whitespace + line breaks from a single-line field. */
export function singleLine(value: string): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
}

/** Basic, deliberate email format check (local@domain.tld). */
export function isValidEmail(email: string): boolean {
  if (email.length < 5 || email.length > 254) return false;
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}

/** Phone accepts digits, spaces, `+`, `-`, `(` and `)`, 7–30 chars. */
export function isValidPhone(phone: string): boolean {
  if (phone.length < 7 || phone.length > MAX_PHONE_LENGTH) return false;
  return /^[0-9+\-()\s]{7,30}$/.test(phone);
}

/** Return the value of the first error (used to focus the first invalid field). */
export function firstErrorKey(errors: Record<string, string>): string {
  return Object.keys(errors)[0] ?? "";
}
