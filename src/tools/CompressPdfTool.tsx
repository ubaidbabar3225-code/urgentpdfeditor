import { useState } from "react";
import { Dropzone } from "@/components/site/Dropzone";
import { StatusBlock } from "@/components/site/ToolShell";
import { downloadBlob } from "@/lib/download";
import { PDFDocument } from "pdf-lib";

export function CompressPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [stats, setStats] = useState<{ before: number; after: number } | null>(null);

  const convert = async () => {
    if (!files[0]) return;
    setStatus("processing");
    try {
      const file = files[0];
      const buf = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buf, { ignoreEncryption: true });
      // Strip metadata to slim file
      pdf.setTitle("");
      pdf.setAuthor("");
      pdf.setSubject("");
      pdf.setKeywords([]);
      pdf.setProducer("");
      pdf.setCreator("");
      const bytes = await pdf.save({ useObjectStreams: true, addDefaultPage: false });
      setResult(bytes);
      setStats({ before: file.size, after: bytes.byteLength });
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Compression failed");
      setStatus("error");
    }
  };

  const reset = () => { setFiles([]); setResult(null); setStats(null); setStatus("idle"); setErrorMsg(undefined); };

  return (
    <div className="space-y-6">
      {status === "idle" && (
        <>
          <Dropzone
            onFiles={setFiles}
            files={files}
            accept={{ "application/pdf": [".pdf"] }}
            hint="PDF file"
            onRemove={() => setFiles([])}
          />
          {files.length > 0 && (
            <button onClick={convert} className="w-full rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition-smooth">
              Compress PDF
            </button>
          )}
          <p className="text-xs text-muted-foreground text-center">
            Lossless optimization: re-streams objects and strips metadata. For PDFs that are mostly text or vector graphics this works well; image-heavy PDFs see smaller gains.
          </p>
        </>
      )}
      {status === "done" && stats && (
        <div className="rounded-xl border border-border bg-muted/40 p-4 text-center text-sm space-y-1">
          <p>Original: <span className="font-semibold">{(stats.before / 1024).toFixed(1)} KB</span></p>
          <p>Compressed: <span className="font-semibold text-primary">{(stats.after / 1024).toFixed(1)} KB</span></p>
          <p className="text-success font-semibold">
            {stats.after < stats.before
              ? `Saved ${(((stats.before - stats.after) / stats.before) * 100).toFixed(1)}%`
              : "Already optimized"}
          </p>
        </div>
      )}
      <StatusBlock
        status={status}
        message={errorMsg}
        onDownload={() => result && downloadBlob(result, "compressed.pdf", "application/pdf")}
        onReset={reset}
        downloadLabel="Download compressed PDF"
      />
    </div>
  );
}
