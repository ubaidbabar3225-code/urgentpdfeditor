import { createFileRoute } from "@tanstack/react-router";
import { Shield, Zap, Lock, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — UrgentPDFEditor" },
      {
        name: "description",
        content:
          "UrgentPDFEditor is a free, private suite of PDF tools that runs entirely in your browser. No uploads, no tracking.",
      },
      { property: "og:title", content: "About UrgentPDFEditor" },
      { property: "og:description", content: "Private, in-browser PDF tools — built for speed." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const features = [
    { icon: Shield, title: "100% Private", text: "Files never leave your device. All processing happens locally in your browser." },
    { icon: Zap, title: "Lightning Fast", text: "No upload wait time. Convert, merge or compress files instantly." },
    { icon: Lock, title: "Secure by Design", text: "We use modern open-source libraries and zero server storage." },
    { icon: Heart, title: "Always Free", text: "Every tool is free with no signup, no daily limit, no watermark." },
  ];
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12 animate-fade-up">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          About <span className="bg-gradient-primary bg-clip-text text-slate-950">UrgentPDFEditor</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We built UrgentPDFEditor because PDF tools shouldn't require uploads, accounts, or compromise your privacy.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-gradient-soft border border-border p-8">
        <h2 className="text-2xl font-bold mb-3">Our promise</h2>
        <p className="text-muted-foreground leading-relaxed">
          Every tool here uses well-maintained open-source libraries (pdf-lib, jsPDF, pdfjs, mammoth, docx) running
          inside your browser tab. We don't store, transmit, or analyze your files. Close the tab, and they're gone —
          that's the cleanest privacy guarantee possible.
        </p>
      </div>
    </div>
  );
}
