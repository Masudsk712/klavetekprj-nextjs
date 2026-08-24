/**
 * Transactional email delivery via Resend's official Node.js SDK.
 *
 * The Resend SDK wraps the same HTTP API (POST https://api.resend.com/emails
 * with a Bearer token) but provides typed responses, proper error handling,
 * and native support for `reply_to` and base64 attachments.
 *
 * Environment variables (server-side only — never expose to the browser):
 *   EMAIL_FROM    e.g. "Klavetek Website <onboarding@resend.dev>"
 *   EMAIL_TO      the destination inbox, e.g. "masudkac712@gmail.com"
 *   EMAIL_API_KEY your Resend API key
 *
 * The API key is read once at module load and never logged or sent to
 * the browser. If it is missing, sendEmail() fails gracefully (logged
 * server-side) and the caller returns a generic error.
 */

import { Resend } from "resend";

// Constructed once at module load. The key itself is never logged.
const resend = new Resend(process.env.EMAIL_API_KEY);

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
  const apiKey = (process.env.EMAIL_API_KEY ?? "").trim();

  if (!apiKey) {
    console.error(
      "[mailer] EMAIL_API_KEY is not configured. Add it to .env.local / Vercel to enable delivery.",
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
