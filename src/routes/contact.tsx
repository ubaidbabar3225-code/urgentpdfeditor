import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — UrgentPDFEditor" },
      { name: "description", content: "Get in touch with the UrgentPDFEditor team. Feedback, bug reports, feature requests welcome." },
      { property: "og:title", content: "Contact UrgentPDFEditor" },
      { property: "og:description", content: "Reach out with feedback or questions." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(200),
  message: z.string().trim().min(5, "Message is too short").max(2000),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { name: fd.get("name"), email: fd.get("email"), message: fd.get("message") };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center mb-10 animate-fade-up">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-soft">
          <MessageSquare className="h-7 w-7 text-primary-foreground" />
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Contact us</h1>
        <p className="mt-3 text-muted-foreground">Questions, feedback, or feature ideas — we'd love to hear from you.</p>
      </div>

      {sent ? (
        <div className="rounded-2xl border border-success/30 bg-success/5 p-8 text-center animate-fade-up">
          <h2 className="text-xl font-semibold text-success">Message received!</h2>
          <p className="mt-2 text-sm text-muted-foreground">Thanks for reaching out. We'll reply within 1-2 business days.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft space-y-5">
          <Field label="Your name" name="name" error={errors.name} />
          <Field label="Email" name="email" type="email" error={errors.email} />
          <div>
            <label className="block text-sm font-medium mb-1.5">Message</label>
            <textarea
              name="message"
              rows={5}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition-smooth"
          >
            <Send className="h-4 w-4" /> Send message
          </button>
        </form>
      )}

      <div className="mt-8 text-center text-sm text-muted-foreground inline-flex items-center justify-center gap-2 w-full">
        <Mail className="h-4 w-4" /> hello@urgentpdfeditor.app
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
