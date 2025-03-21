"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function sendEmail({
  from,
  subject,
  text,
  name,
}: {
  from: string;
  subject: string;
  text: string;
  name: string;
}) {
  try {
    const payload = await getPayload({ config: configPromise });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #F6F6FF; border-radius: 24px;">
        <h2 style="color: #32324D;">New Message from your website!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${from}">${from}</a></p>
        <div style="background-color: #fff; padding: 20px; border-radius: 24px; border: 1px solid #ddd;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${text}</p>
        </div>
      </div>
    `;

    await payload.sendEmail({
      from,
      to: process.env.SMTP_USER,
      subject,
      html: emailHtml,
    });

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
