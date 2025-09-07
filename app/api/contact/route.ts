import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = (body.name ?? "").toString().trim();
    const email = (body.email ?? "").toString().trim();
    const message = (body.message ?? "").toString().trim();

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Basic email format check (simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // send
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New message from ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`,
      html: `<h3>New Contact Request</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, "<br/>")}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API Error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
