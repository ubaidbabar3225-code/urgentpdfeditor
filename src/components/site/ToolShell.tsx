import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Loader2, Download } from "lucide-react";
import type { ReactNode } from "react";
import { getTool } from "@/lib/tools";

interface ToolShellProps {
  slug: string;
  children: ReactNode;
}

export function ToolShell({ slug, children }: ToolShellProps) {
  const tool = getTool(slug);
  if (!tool) return null;
  const Icon = tool.icon;
  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> All tools
      </Link>

      <div className="flex flex-col items-center text-center mb-8 animate-fade-up">
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${tool.color} shadow-elevated`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{tool.title}</h1>
        <p className="mt-2 text-muted-foreground max-w-xl">{tool.description}</p>
      </div>

      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 md:p-8 shadow-elevated animate-fade-up">
        {children}
      </div>
    </div>
  );
}

interface StatusBlockProps {
  status: "idle" | "processing" | "done" | "error";
  message?: string;
  onDownload?: () => void;
  onReset?: () => void;
  downloadLabel?: string;
}

export function StatusBlock({ status, message, onDownload, onReset, downloadLabel = "Download" }: StatusBlockProps) {
  if (status === "processing") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 animate-fade-up">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse-soft">
          {message ?? "Processing your file..."}
        </p>
      </div>
    );
  }
  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-4 py-6 animate-fade-up">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <p className="text-base font-semibold text-foreground">Conversion complete!</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition-smooth"
          >
            <Download className="h-4 w-4" /> {downloadLabel}
          </button>
          {onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-muted transition-smooth"
            >
              Start over
            </button>
          )}
        </div>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive animate-fade-up">
        {message ?? "Something went wrong. Please try a different file."}
      </div>
    );
  }
  return null;
}
