import { useState } from "react";
import { Dropzone } from "@/components/site/Dropzone";
import { StatusBlock } from "@/components/site/ToolShell";
import { downloadBlob } from "@/lib/download";
import { PDFDocument } from "pdf-lib";

export function SplitPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [result, setResult] = useState<Blob | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [range, setRange] = useState("");

  const onFiles = async (next: File[]) => {
    setFiles(next);
    if (next[0]) {
      try {
        const src = await PDFDocument.load(await next[0].arrayBuffer());
        setPageCount(src.getPageCount());
        setRange(`1-${src.getPageCount()}`);
      } catch {
        setPageCount(0);
      }
    }
  };

  const parseRanges = (input: string, total: number): number[][] => {
    const groups = input.split(",").map((s) => s.trim()).filter(Boolean);
    return groups.map((g) => {
      if (g.includes("-")) {
        const [a, b] = g.split("-").map((n) => parseInt(n, 10));
        if (Number.isNaN(a) || Number.isNaN(b) || a < 1 || b > total || a > b) throw new Error(`Invalid range: ${g}`);
        const arr: number[] = [];
        for (let i = a; i <= b; i++) arr.push(i - 1);
        return arr;
      }
      const n = parseInt(g, 10);
      if (Number.isNaN(n) || n < 1 || n > total) throw new Error(`Invalid page: ${g}`);
      return [n - 1];
    });
  };

  const convert = async () => {
    if (!files[0]) return;
    setStatus("processing");
    try {
      const src = await PDFDocument.load(await files[0].arrayBuffer());
      const groups = parseRanges(range, src.getPageCount());
      const baseName = files[0].name.replace(/\.pdf$/i, "");

      if (groups.length === 1) {
        const out = await PDFDocument.create();
        const pages = await out.copyPages(src, groups[0]);
        pages.forEach((p) => out.addPage(p));
        const bytes = await out.save();
        setResult(new Blob([bytes as BlobPart], { type: "application/pdf" }));
        setOutName(`${baseName}-split.pdf`);
        setIsZip(false);
      } else {
        const { default: JSZip } = await import("jszip");
        const zip = new JSZip();
        for (let g = 0; g < groups.length; g++) {
          const out = await PDFDocument.create();
          const pages = await out.copyPages(src, groups[g]);
          pages.forEach((p) => out.addPage(p));
          const bytes = await out.save();
          zip.file(`${baseName}-part-${g + 1}.pdf`, bytes);
        }
        const zipBlob = await zip.generateAsync({ type: "blob" });
        setResult(zipBlob);
        setOutName(`${baseName}-split.zip`);
        setIsZip(true);
      }
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Split failed");
      setStatus("error");
    }
  };

  const [outName, setOutName] = useState("split.pdf");
  const [isZip, setIsZip] = useState(false);

  const reset = () => { setFiles([]); setResult(null); setStatus("idle"); setErrorMsg(undefined); setPageCount(0); };

  return (
    <div className="space-y-6">
      {status === "idle" && (
        <>
          <Dropzone
            onFiles={onFiles}
            files={files}
            accept={{ "application/pdf": [".pdf"] }}
            hint="PDF file"
            onRemove={() => { setFiles([]); setPageCount(0); }}
          />
          {pageCount > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Page ranges (PDF has {pageCount} pages)</label>
              <input
                value={range}
                onChange={(e) => setRange(e.target.value)}
                placeholder="e.g. 1-3, 5, 7-9"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring font-mono"
              />
              <p className="text-xs text-muted-foreground">
                One range = single PDF. Multiple ranges (comma-separated) = ZIP with one PDF per range.
              </p>
            </div>
          )}
          {files.length > 0 && (
            <button onClick={convert} className="w-full rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition-smooth">
              Split PDF
            </button>
          )}
        </>
      )}
      <StatusBlock
        status={status}
        message={errorMsg}
        onDownload={() => result && downloadBlob(result, outName, isZip ? "application/zip" : "application/pdf")}
        onReset={reset}
        downloadLabel={isZip ? "Download ZIP" : "Download PDF"}
      />
    </div>
  );
}
