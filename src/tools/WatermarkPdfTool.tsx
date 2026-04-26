import { useState } from "react";
import { Dropzone } from "@/components/site/Dropzone";
import { StatusBlock } from "@/components/site/ToolShell";
import { downloadBlob } from "@/lib/download";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

export function WatermarkPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(0.25);

  const convert = async () => {
    if (!files[0] || !text.trim()) return;
    setStatus("processing");
    try {
      const pdf = await PDFDocument.load(await files[0].arrayBuffer());
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      const pages = pdf.getPages();
      for (const page of pages) {
        const { width, height } = page.getSize();
        const fontSize = Math.min(width, height) / 8;
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        page.drawText(text, {
          x: width / 2 - textWidth / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity,
          rotate: degrees(45),
        });
      }
      const bytes = await pdf.save();
      setResult(bytes);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Watermark failed");
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
            files={files}
            accept={{ "application/pdf": [".pdf"] }}
            hint="PDF file"
            onRemove={() => setFiles([])}
          />
          {files.length > 0 && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1.5">Watermark text</label>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 60))}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Opacity: {Math.round(opacity * 100)}%</label>
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              <button onClick={convert} className="w-full rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition-smooth">
                Add watermark
              </button>
            </>
          )}
        </>
      )}
      <StatusBlock
        status={status}
        message={errorMsg}
        onDownload={() => result && downloadBlob(result, "watermarked.pdf", "application/pdf")}
        onReset={reset}
        downloadLabel="Download watermarked PDF"
      />
    </div>
  );
}
