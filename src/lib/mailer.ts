/**
 * Transactional email delivery via the official Resend Node.js SDK.
 *
 * The Resend SDK wraps the same HTTP API (POST https://api.resend.com/emails
 * with a Bearer token) but provides typed responses, proper error handling,
 * and native support for `reply_to` and base64 attachments.
 *
 * Environment variables (server-side only — never expose to the browser):
 *   RESEND_API_KEY your Resend API key (canonical).
 *                   Legacy EMAIL_API_KEY is also accepted as a fallback so
 *                   existing .env.local configs keep working untouched.
 *   EMAIL_FROM     e.g. "Klavetek Website <onboarding@resend.dev>"
 *   EMAIL_TO       the destination inbox, e.g. "masudkac712@gmail.com"
 *
 * IMPORTANT: The Resend client is constructed LAZILY inside sendEmail(), only
 * when an API key is present. Building it at module import time throws
 * "Missing API key. Pass it to the constructor new Resend('re_123')" whenever
 * the key is unset, which crashes Next.js page-data collection during the
 * build — the /api/career and /api/contact routes fail before sendEmail()'s
 * guard even runs. Lazy init keeps this module importable without any key and
 * defers a misconfiguration to request time, where the API sends a clean JSON
 * error instead of crashing the build. The key itself is never logged or sent.
 */

import { Resend } from "resend";

// Lazily-initialized Resend client. Null until first use, so importing this
// module never constructs a client (and never reads a missing key) until an
// email is actually being sent.
let resend: Resend | null = null;

/**
 * Resolve the Resend API key. `RESEND_API_KEY` is canonical (and the only name
 * the SDK auto-reads from the environment when the constructor is given none).
 * The legacy `EMAIL_API_KEY` is honored as a fallback so existing configs keep
 * working without edits.
 */
function apiKeyFromEnv(): string {
  return (
    (process.env.RESEND_API_KEY ?? "").trim() ||
    (process.env.EMAIL_API_KEY ?? "").trim()
  );
}

export interface EmailAttachment {
  filename: string;
  content: string; // base64-encoded file content
  contentType?: string; // optional MIME type; derived from filename by Resend if omitted
}

interface SendEmailInput {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  attachments?: EmailAttachment[];
}

/**
 * Whether email delivery is configured (an API key is present at runtime).
 * Lets API routes detect a missing key and respond with a clear
 * misconfiguration error instead of a generic failure.
 */
export function isMailerConfigured(): boolean {
  return apiKeyFromEnv().length > 0;
}

/**
 * Resolve sender/recipient from environment variables.
 * Safe fallbacks match the configured .env.local values so delivery works
 * even if a variable is accidentally omitted at runtime.
 */
export function emailFromEnv(): { to: string; from: string } {
  return {
    to: (process.env.EMAIL_TO ?? "").trim() || "masudkac712@gmail.com",
    from:
      (process.env.EMAIL_FROM ?? "").trim() ||
      "Klavetek Website <onboarding@resend.dev>",
  };
}

/**
 * Send an email via the Resend SDK. The visitor's address is only ever
 * used as `replyTo`, never as the authenticated sender.
 *
 * Returns `true` on success, `false` on any failure. Failures are logged
 * server-side only — the API key is never included in log output.
 */
export async function sendEmail(input: SendEmailInput): Promise<boolean> {
  const apiKey = apiKeyFromEnv();

  if (!apiKey) {
    console.error(
      "[mailer] RESEND_API_KEY is not configured. Add it to Vercel (or .env.local) to enable email delivery.",
    );
    return false;
  }

  if (!input.from) {
    console.error(
      "[mailer] EMAIL_FROM is not configured. Add a verified sender to .env.local / Vercel.",
    );
    return false;
  }

  try {
    // Construct lazily so this module never throws (and never reads a missing
    // key) until an email is actually being sent.
    if (!resend) resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: input.from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      replyTo: input.replyTo,
      attachments: input.attachments,
    });

    if (error) {
      // The SDK error object contains the message and status code from Resend,
      // but never the API key itself.
      console.error("[mailer] Resend API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[mailer] Unexpected error while sending email.", error);
    return false;
  }
}
