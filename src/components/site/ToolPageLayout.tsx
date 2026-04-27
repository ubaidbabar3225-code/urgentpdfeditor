import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ChevronDown, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { ToolShell } from "@/components/site/ToolShell";
import { tools } from "@/lib/tools";
import type { ToolSeo } from "@/lib/seo-content";

interface Props {
  seo: ToolSeo;
  children: React.ReactNode;
}

export function ToolPageLayout({ seo, children }: Props) {
  return (
    <article>
      {/* The interactive tool widget at the top */}
      <ToolShell slug={seo.toolSlug}>{children}</ToolShell>

      {/* SEO content below the fold */}
      <section className="container mx-auto px-4 pb-20 max-w-4xl">
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
          <Badge icon={<ShieldCheck className="h-3.5 w-3.5" />} text="Files auto-deleted" />
          <Badge icon={<Zap className="h-3.5 w-3.5" />} text="Runs in your browser" />
          <Badge icon={<Sparkles className="h-3.5 w-3.5" />} text="No signup required" />
        </div>

        <div className="prose prose-slate max-w-none mt-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            About this tool
          </h2>
          {seo.about.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
          ))}
        </div>

        {/* How to */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            How to use the {seo.h1.split("—")[0].trim()}
          </h2>
          <ol className="space-y-4">
            {seo.howTo.map((s, i) => (
              <li key={i} className="flex gap-4 items-start rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Benefits */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            Why use UrgentPDFEditor
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {seo.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Use cases */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            When to use this tool
          </h2>
          <ul className="space-y-3">
            {seo.useCases.map((u) => (
              <li key={u} className="flex items-start gap-3">
                <ArrowRight className="h-4 w-4 mt-1 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{u}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {seo.faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>

        {/* Related tools */}
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            Related PDF tools
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {seo.related.map((slug) => {
              const t = tools.find((x) => x.slug === slug);
              if (!t) return null;
              const Icon = t.icon;
              return (
                <a
                  key={slug}
                  href={`/${slug}`}
                  className="group rounded-2xl border border-border bg-card p-4 shadow-soft hover:-translate-y-1 hover:shadow-elevated hover:border-primary/40 transition-smooth"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${t.color} shadow-soft`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="mt-3 text-sm font-semibold group-hover:text-primary transition-smooth">
                    {t.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 font-medium">
      {icon} {text}
    </span>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm md:text-base font-semibold">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</div>
      )}
    </div>
  );
}
