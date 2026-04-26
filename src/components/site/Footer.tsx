import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { tools } from "@/lib/tools";

export function Footer() {
  const grouped = ["Convert to PDF", "Convert from PDF", "Organize", "Optimize", "Security"] as const;
  return (
    <footer className="mt-24 border-t border-border bg-gradient-soft">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-soft">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-base font-bold">UrgentPDFEditor</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Fast, free, secure PDF tools that run entirely in your browser. Your files never leave your device.
            </p>
          </div>

          {grouped.slice(0, 3).map((cat) => (
            <div key={cat}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">{cat}</h4>
              <ul className="space-y-2">
                {tools.filter((t) => t.category === cat).map((t) => (
                  <li key={t.slug}>
                    <Link
                      to="/tool/$slug"
                      params={{ slug: t.slug }}
                      className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} UrgentPDFEditor. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs">
            <Link to="/about" className="text-muted-foreground hover:text-primary">About</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
