import { useState } from "react";
import { Dropzone } from "@/components/site/Dropzone";
import { StatusBlock } from "@/components/site/ToolShell";
import { downloadBlob, readAsArrayBuffer } from "@/lib/download";
import { PDFDocument } from "pdf-lib";
import type { Accept } from "react-dropzone";

interface Props {
  accept?: string;
  hint?: string;
}

export function ImageToPdfTool({ accept = "image/*", hint }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [result, setResult] = useState<Uint8Array | null>(null);

  const dropAccept: Accept = accept === "image/*"
    ? { "image/*": [] }
    : accept === "image/jpeg"
      ? { "image/jpeg": [".jpg", ".jpeg"] }
      : { "image/png": [".png"] };

  const convert = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    try {
      const pdf = await PDFDocument.create();
      for (const file of files) {
        const buf = await readAsArrayBuffer(file);
        const isPng = file.type === "image/png" || file.name.toLowerCase().endsWith(".png");
        const isJpg = file.type === "image/jpeg" || /\.(jpe?g)$/i.test(file.name);
        let img;
        if (isPng) img = await pdf.embedPng(buf);
        else if (isJpg) img = await pdf.embedJpg(buf);
        else {
          // Other formats: rasterize via canvas to PNG
          const dataUrl = await fileToCanvasPng(file);
          const response = await fetch(dataUrl);
          const pngBuf = await response.arrayBuffer();
          img = await pdf.embedPng(pngBuf);
        }
        const page = pdf.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const bytes = await pdf.save();
      setResult(bytes);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Conversion failed");
      setStatus("error");
    }
  };

  const reset = () => {
    setFiles([]);
    setResult(null);
    setStatus("idle");
    setErrorMsg(undefined);
  };

  return (
    <div className="space-y-6">
      {status === "idle" && (
        <>
          <Dropzone
            onFiles={setFiles}
            files={files}
            accept={dropAccept}
            multiple
            hint={hint}
            onRemove={(i) => setFiles(files.filter((_, idx) => idx !== i))}
          />
          {files.length > 0 && (
            <button
              onClick={convert}
              className="w-full rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition-smooth"
            >
              Convert to PDF
            </button>
          )}
        </>
      )}
      <StatusBlock
        status={status}
        message={errorMsg}
        onDownload={() => result && downloadBlob(result, "converted.pdf", "application/pdf")}
        onReset={reset}
        downloadLabel="Download PDF"
      />
    </div>
  );
}

async function fileToCanvasPng(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas unavailable"));
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Could not read image"));
    img.src = url;
  });
}
