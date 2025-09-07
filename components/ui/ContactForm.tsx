"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function ContactForm() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | string>("idle");

  const copyEmail = () => {
    navigator.clipboard.writeText("sadityaraj2204@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    if (!data.name || !data.email || !data.message) {
    setStatus("error: Missing required fields");
    return;
  }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        setStatus(`error: ${responseData.error || "Something went wrong"}`);
      } else {
        setStatus("success");
        form.reset();
      }
    } catch {
      setStatus("error: Failed to connect to server");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-6 max-w-xl"
    >
      {/* 👉 Email Copy */}
      <div className="mb-6">
        <button
          onClick={copyEmail}
          className="text-accent-500 font-medium hover:text-accent-700 transition-colors"
          aria-label="Copy email address to clipboard"
        >
          {copied ? "✔ Email Copied!" : "📧 sadityaraj2204@gmail.com"}
        </button>
      </div>

      {/* 👉 Contact Form */}
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
          autoComplete="name"
          required
          className="w-full rounded-xl2 border border-base-100 px-4 py-3 focus:ring-2 focus:ring-accent-500 outline-none"
        />
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your Email"
          required
          autoComplete="email"
          inputMode="email"
          className="w-full rounded-xl2 border border-base-100 px-4 py-3 focus:ring-2 focus:ring-accent-500 outline-none"
        />
        <textarea
          id="message"
          name="message"
          placeholder="Your Message"
          rows={4}
          required
          className="w-full rounded-xl2 border border-base-100 px-4 py-3 focus:ring-2 focus:ring-accent-500 outline-none"
        ></textarea>
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl2 bg-accent-500 px-6 py-3 font-medium text-white shadow-soft transition-all duration-300 hover:bg-accent-700 dark:hover:bg-accent-400 dark:hover:text-base-900"
          aria-busy={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        <p aria-live="polite" className="mt-2 text-sm">
          {status === "success" && (
            <span className="text-green-600">✅ Message sent successfully!</span>
          )}

          {status && status.startsWith("error:") && (
            <span className="text-red-600">❌ {status.replace("error:", "").trim()}</span>
          )}
        </p>
      </form>

      {/* 👉 Social Links */}
      <div className="mt-6 flex space-x-6">
        <a
          href="https://github.com/aditya024RS"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-accent-400 transition-colors duration-200 text-4xl"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/aditya-raj-singh-5003a62a7"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-accent-400 transition-colors duration-200 text-4xl"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>
    </motion.div>
  );
}
