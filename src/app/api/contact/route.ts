import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: ["rakhabas59@gmail.com"],
      subject: `New Message from ${data.name} via Portfolio`,
      replyTo: data.email,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.brief}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: false, error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Transmission received." }, { status: 200 });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ success: false, error: "Failed to process transmission." }, { status: 500 });
  }
}
