import { useState } from "react";
import { Dropzone } from "@/components/site/Dropzone";
import { StatusBlock } from "@/components/site/ToolShell";
import { downloadBlob } from "@/lib/download";
import { PDFDocument } from "pdf-lib";
import { ArrowUp, ArrowDown } from "lucide-react";

export function MergePdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [result, setResult] = useState<Uint8Array | null>(null);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= files.length) return;
    const next = [...files];
    [next[from], next[to]] = [next[to], next[from]];
    setFiles(next);
  };

  const convert = async () => {
    if (files.length < 2) return;
    setStatus("processing");
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const buf = await file.arrayBuffer();
        const src = await PDFDocument.load(buf);
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      setResult(bytes);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Merge failed");
      setStatus("error");
    }
  };

  const reset = () => { setFiles([]); setResult(null); setStatus("idle"); setErrorMsg(undefined); };

  return (
    <div className="space-y-6">
      {status === "idle" && (
        <>
          <Dropzone
            onFiles={setFiles}
            files={[]}
            accept={{ "application/pdf": [".pdf"] }}
            multiple
            hint="Add 2 or more PDF files"
          />
          {files.length > 0 && (
            <ul className="space-y-2">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 shadow-soft">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-soft text-xs font-bold text-primary">{i + 1}</span>
                  <span className="flex-1 truncate text-sm font-medium">{f.name}</span>
                  <button onClick={() => move(i, i - 1)} disabled={i === 0} className="p-1.5 rounded-md hover:bg-muted disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
                  <button onClick={() => move(i, i + 1)} disabled={i === files.length - 1} className="p-1.5 rounded-md hover:bg-muted disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
                  <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="p-1.5 rounded-md hover:bg-muted text-xs">✕</button>
                </li>
              ))}
            </ul>
          )}
          {files.length >= 2 && (
            <button onClick={convert} className="w-full rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition-smooth">
              Merge {files.length} PDFs
            </button>
          )}
        </>
      )}
      <StatusBlock
        status={status}
        message={errorMsg}
        onDownload={() => result && downloadBlob(result, "merged.pdf", "application/pdf")}
        onReset={reset}
        downloadLabel="Download merged PDF"
      />
    </div>
  );
}
