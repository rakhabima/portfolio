import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3;

// ponytail: in-memory, per Node process. Exact on a single `next start` process; if you run
// several (PM2 cluster, multiple containers) each keeps its own map — move to Redis then.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();

  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const limited = recent.length >= MAX_REQUESTS;
  if (!limited) recent.push(now);
  hits.set(ip, recent);
  return limited;
}

function isValidField(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

export async function POST(request: Request) {
  // Behind Nginx ($proxy_add_x_forwarded_for) the LAST entry is the one Nginx appended —
  // earlier entries come from the client and can be spoofed.
  const ip = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const data = await request.json();

    // Honeypot: humans never see this field, bots fill it. Pretend success so they don't retry.
    if (data?.website) {
      return NextResponse.json({ success: true, message: "Transmission received." }, { status: 200 });
    }

    if (
      !isValidField(data?.name, 100) ||
      !isValidField(data?.email, 200) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
      !isValidField(data?.brief, 5000)
    ) {
      return NextResponse.json({ success: false, error: "Invalid input." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: ["rakhabas59@gmail.com"],
      subject: `New Message from ${data.name.replace(/[\r\n]+/g, " ")} via Portfolio`,
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
