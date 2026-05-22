"use client";

import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      brief: formData.get("brief"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        USER_NAME
        <input name="name" placeholder="your_name" type="text" required disabled={isSubmitting} />
      </label>
      <label>
        EMAIL_ADDRESS
        <input name="email" placeholder="your_email" type="email" required disabled={isSubmitting} />
      </label>
      <label className="md:col-span-2">
        INPUT_STRING
        <textarea name="brief" placeholder="Enter your message, inquiry, or question here..." rows={6} required disabled={isSubmitting} />
      </label>
      <button className="btn btn-primary md:col-span-2" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "SENDING..." : "SEND_MESSAGE"}
        <Terminal size={18} />
      </button>

      {status === "success" && (
        <p className="md:col-span-2 text-[#00f5ff] font-bold uppercase mt-2">
          &gt; STATUS: MESSAGE_SENT. EXPECT A REPLY SOON.
        </p>
      )}
      {status === "error" && (
        <p className="md:col-span-2 text-[#ff4fea] font-bold uppercase mt-2">
          &gt; Error: Transmission failed. Please try again.
        </p>
      )}
    </form>
  );
}
