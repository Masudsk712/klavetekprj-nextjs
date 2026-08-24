import { NextResponse } from "next/server";
import { emailFromEnv, sendEmail, type EmailAttachment } from "@/lib/mailer";
import {
  ALLOWED_RESUME_EXTENSIONS,
  ALLOWED_RESUME_TYPES,
  asString,
  firstErrorKey,
  isValidEmail,
  isValidPhone,
  MAX_EXPERIENCE_LENGTH,
  MAX_FILE_SIZE,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_POSITION_LENGTH,
  singleLine,
} from "@/lib/validation";

const GENERIC_ERROR = "Unable to submit your application. Please try again.";

/**
 * Maps a resume file extension to its MIME type. Used to set the
 * `contentType` on the Resend attachment so the email client renders
 * the attachment correctly.
 */
const RESUME_MIME_TYPE: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function validateTextFields(fields: {
  name: string;
  email: string;
  phone: string;
  position: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!fields.name) errors.name = "Please enter your full name.";
  else if (fields.name.length > MAX_NAME_LENGTH)
    errors.name = "Name is too long.";

  if (!fields.email) errors.email = "Please enter your email.";
  else if (!isValidEmail(fields.email))
    errors.email = "Please enter a valid email address.";

  if (!fields.phone) errors.phone = "Please enter your phone number.";
  else if (!isValidPhone(fields.phone))
    errors.phone = `Please enter a valid phone number (${MAX_PHONE_LENGTH} characters max).`;

  if (!fields.position)
    errors.position = "Please state the position you are applying for.";
  else if (fields.position.length > MAX_POSITION_LENGTH)
    errors.position = "Position is too long.";

  return errors;
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, message: GENERIC_ERROR },
      { status: 400 },
    );
  }

  const fields = {
    name: asString(formData.get("name")),
    email: asString(formData.get("email")),
    phone: asString(formData.get("phone")),
    position: asString(formData.get("position")),
    experience: asString(formData.get("experience")),
    message: asString(formData.get("message")),
  };

  const errors = validateTextFields(fields);

  if (fields.experience.length > MAX_EXPERIENCE_LENGTH) {
    errors.experience = "Experience value is too long.";
  }
  if (fields.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = "Message is too long.";
  }

  // --- Resume file: type + size enforcement (server-side, authoritative) ---
  const file = formData.get("resume");
  let attachment: EmailAttachment | undefined;

  if (!(file instanceof File)) {
    errors.resume = "Please upload your resume.";
  } else {
    const originalName = String(file.name ?? "").trim();
    const extension = originalName.split(".").pop()?.toLowerCase() ?? "";

    if (
      !originalName ||
      !ALLOWED_RESUME_EXTENSIONS.includes(
        extension as (typeof ALLOWED_RESUME_EXTENSIONS)[number],
      ) ||
      // defense-in-depth: reject a MIME type that is present and clearly not
      // a supported document type (an empty type falls back to the extension check).
      (file.type &&
        !ALLOWED_RESUME_TYPES.includes(
          file.type as (typeof ALLOWED_RESUME_TYPES)[number],
        ))
    ) {
      errors.resume = "Resume must be a PDF, DOC or DOCX file.";
    } else {
      let bytes: ArrayBuffer;
      try {
        bytes = await file.arrayBuffer();
      } catch {
        errors.resume =
          "The uploaded file could not be read. Please try again.";
        bytes = new ArrayBuffer(0);
      }
      if (bytes.byteLength === 0) {
        errors.resume = "The uploaded file is empty.";
      } else if (bytes.byteLength > MAX_FILE_SIZE) {
        errors.resume = "Resume must be 5 MB or smaller.";
      } else {
        attachment = {
          filename: originalName,
          content: Buffer.from(bytes as ArrayBufferLike).toString("base64"),
          contentType: RESUME_MIME_TYPE[extension] ?? "application/octet-stream",
        };
      }
    }
  }

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

  const subjectLine = `New Klavetek Career Application — ${fields.position}`;

  const text = [
    "Klavetek Career Application",
    "",
    `Name: ${singleLine(fields.name)}`,
    `Email: ${fields.email}`,
    `Phone: ${singleLine(fields.phone)}`,
    `Position: ${singleLine(fields.position)}`,
    `Experience: ${fields.experience ? singleLine(fields.experience) : "(not provided)"}`,
    "Cover Letter:",
    fields.message ? fields.message : "(not provided)",
    "",
    `Submitted At: ${submittedAt}`,
    "",
    "Resume:",
    "Attached",
  ].join("\n");

  const sent = await sendEmail({
    to,
    from,
    replyTo: fields.email, // never the authenticated sender — only Reply-To
    subject: subjectLine,
    text,
    attachments: attachment ? [attachment] : undefined,
  });

  if (!sent) {
    return NextResponse.json(
      { success: false, message: GENERIC_ERROR },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Your application has been submitted successfully.",
  });
}
