"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";

interface ContactFormProps {
  labels: {
    category: string;
    categoryBug: string;
    categoryFeature: string;
    categoryBusiness: string;
    categoryGeneral: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
}

export function ContactForm({ labels }: ContactFormProps) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-950/30">
        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        <p className="text-sm font-medium text-green-800 dark:text-green-300">
          {labels.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="hidden"
        name="access_key"
        value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ""}
      />
      <input type="hidden" name="from_name" value="ToolPop" />
      <input type="checkbox" name="botcheck" className="hidden" />

      <div>
        <label
          htmlFor="category"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          {labels.category}
        </label>
        <div className="relative">
          <select
            id="category"
            name="subject"
            required
            defaultValue="[General Inquiry]"
            className="w-full appearance-none rounded-lg border border-border bg-background px-3.5 py-2.5 pr-10 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="[Bug Report]">{labels.categoryBug}</option>
            <option value="[Feature Request]">
              {labels.categoryFeature}
            </option>
            <option value="[Business Inquiry]">
              {labels.categoryBusiness}
            </option>
            <option value="[General Inquiry]">
              {labels.categoryGeneral}
            </option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder={labels.messagePlaceholder}
          className="w-full resize-y rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-subtle outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950/30">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-700 dark:text-red-300">
            {labels.error}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {status === "sending" ? labels.sending : labels.send}
      </button>
    </form>
  );
}
