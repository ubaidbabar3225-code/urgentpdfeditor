import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-soft transition-smooth group-hover:shadow-glow">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Urgent<span className="text-primary">PDF</span>Editor
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-primary-soft hover:text-primary transition-smooth"
              activeProps={{ className: "px-4 py-2 text-sm font-semibold rounded-md bg-primary-soft text-primary" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 rounded-md hover:bg-muted"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="container mx-auto px-4 py-2 flex flex-col">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-md"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
