import { createFileRoute, Link } from "@tanstack/react-router";
import { tools } from "@/lib/tools";
import { Shield, Zap, Lock as LockIcon, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UrgentPDFEditor — 13 Free PDF Tools, 100% In-Browser" },
      {
        name: "description",
        content:
          "Convert, merge, split, compress, rotate, watermark and protect PDFs for free. Files never leave your device — fast, private, no signup.",
      },
      { property: "og:title", content: "UrgentPDFEditor — 13 Free PDF Tools" },
      {
        property: "og:description",
        content: "Free PDF tools right in your browser. Private and fast.",
      },
    ],
  }),
  component: HomePage,
});

const categories = ["Convert to PDF", "Convert from PDF", "Organize", "Optimize", "Security"] as const;

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary-glow/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur shadow-soft animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" /> 13 tools · 100% private · No signup
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight animate-fade-up">
            Every PDF tool you need,
            <br />
            <span className="bg-gradient-primary bg-clip-text text-slate-950">all in your browser.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-muted-foreground animate-fade-up">
            Convert, merge, split, compress, watermark and protect PDFs in seconds. Your files never leave your
            device — everything runs locally.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> 100% Private</span>
            <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Lightning Fast</span>
            <span className="inline-flex items-center gap-2"><LockIcon className="h-4 w-4 text-primary" /> No Uploads</span>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        {categories.map((cat) => {
          const items = tools.filter((t) => t.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="mb-12 last:mb-0">
              <h2 className="mb-5 text-xl md:text-2xl font-bold tracking-tight">{cat}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.slug}
                      to="/tool/$slug"
                      params={{ slug: tool.slug }}
                      className="group relative rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated hover:-translate-y-1 hover:border-primary/40 transition-smooth"
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${tool.color} shadow-soft transition-smooth group-hover:scale-110`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary transition-smooth">
                        {tool.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
