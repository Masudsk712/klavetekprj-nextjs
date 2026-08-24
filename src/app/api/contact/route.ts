import { NextResponse } from "next/server";
import { emailFromEnv, sendEmail } from "@/lib/mailer";
import {
  asString,
  firstErrorKey,
  isValidEmail,
  isValidPhone,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_PRODUCT_LENGTH,
  singleLine,
} from "@/lib/validation";

const ALLOWED_SUBJECTS = [
  "Get a Quote",
  "Product Inquiry",
  "Other",
];

const GENERIC_ERROR = "Unable to submit your enquiry. Please try again.";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  product: string;
  message: string;
}

function parsePayload(body: unknown): ContactPayload {
  const record = (body ?? {}) as Record<string, unknown>;
  return {
    name: asString(record.name),
    email: asString(record.email),
    phone: asString(record.phone),
    subject: asString(record.subject),
    product: asString(record.product),
    message: asString(record.message),
  };
}

function validate(payload: ContactPayload): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!payload.name) errors.name = "Please enter your name.";
  else if (payload.name.length > MAX_NAME_LENGTH)
    errors.name = "Name is too long.";

  if (!payload.email) errors.email = "Please enter your email.";
  else if (!isValidEmail(payload.email))
    errors.email = "Please enter a valid email address.";

  if (!payload.phone) errors.phone = "Please enter your phone number.";
  else if (!isValidPhone(payload.phone))
    errors.phone = `Please enter a valid phone number (${MAX_PHONE_LENGTH} characters max).`;

  if (!payload.subject) errors.subject = "Please select a subject.";
  else if (!ALLOWED_SUBJECTS.includes(payload.subject))
    errors.subject = "Please select a valid subject.";

  if (!payload.message) errors.message = "Please enter a message.";
  else if (payload.message.length > MAX_MESSAGE_LENGTH)
    errors.message = "Message is too long.";

  if (payload.product.length > MAX_PRODUCT_LENGTH)
    errors.product = "Product value is too long.";

  return errors;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: GENERIC_ERROR },
      { status: 400 },
    );
  }

  const payload = parsePayload(body);
  const errors = validate(payload);

  if (Object.keys(errors).length > 0) {
    const message = errors[firstErrorKey(errors)] ?? GENERIC_ERROR;
    return NextResponse.json({ success: false, message }, { status: 400 });
  }

  const { to, from } = emailFromEnv();
  const submittedAt = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const subjectLine = `New Klavetek Website Enquiry — ${payload.subject}`;

  const text = [
    "Klavetek Website Contact Enquiry",
    "",
    `Name: ${singleLine(payload.name)}`,
    `Email: ${payload.email}`,
    `Phone: ${singleLine(payload.phone)}`,
    `Subject: ${singleLine(payload.subject)}`,
    `Product: ${payload.product ? singleLine(payload.product) : "(not provided)"}`,
    "Message:",
    payload.message,
    "",
    `Submitted At: ${submittedAt}`,
  ].join("\n");

  const sent = await sendEmail({
    to,
    from,
    replyTo: payload.email, // never the authenticated sender — only Reply-To
    subject: subjectLine,
    text,
  });

  if (!sent) {
    return NextResponse.json(
      { success: false, message: GENERIC_ERROR },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Thank you. Your enquiry has been submitted successfully.",
  });
}
