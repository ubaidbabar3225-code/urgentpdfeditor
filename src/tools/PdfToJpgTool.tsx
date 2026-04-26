import { useState } from "react";
import { Dropzone } from "@/components/site/Dropzone";
import { StatusBlock } from "@/components/site/ToolShell";
import { downloadBlob } from "@/lib/download";
import { pdfjsLib } from "@/lib/pdfjs-setup";

// Lazy import jszip in handler to keep bundle small
export function PdfToJpgTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [result, setResult] = useState<Blob | null>(null);
  const [outName, setOutName] = useState("pages.zip");
  const [singleImage, setSingleImage] = useState(false);

  const convert = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    try {
      const file = files[0];
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const baseName = file.name.replace(/\.pdf$/i, "");

      const blobs: Blob[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas unavailable");
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        const blob: Blob = await new Promise((res, rej) =>
          canvas.toBlob((b) => (b ? res(b) : rej(new Error("toBlob failed"))), "image/jpeg", 0.92),
        );
        blobs.push(blob);
      }

      if (blobs.length === 1) {
        setResult(blobs[0]);
        setOutName(`${baseName}.jpg`);
        setSingleImage(true);
      } else {
        const { default: JSZip } = await import("jszip");
        const zip = new JSZip();
        blobs.forEach((b, i) => zip.file(`${baseName}-page-${i + 1}.jpg`, b));
        const zipBlob = await zip.generateAsync({ type: "blob" });
        setResult(zipBlob);
        setOutName(`${baseName}-pages.zip`);
        setSingleImage(false);
      }
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Conversion failed");
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
            hint="PDF file · each page becomes a JPG"
            onRemove={(i) => setFiles(files.filter((_, idx) => idx !== i))}
          />
          {files.length > 0 && (
            <button onClick={convert} className="w-full rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition-smooth">
              Convert to JPG
            </button>
          )}
        </>
      )}
      <StatusBlock
        status={status}
        message={errorMsg}
        onDownload={() => result && downloadBlob(result, outName, singleImage ? "image/jpeg" : "application/zip")}
        onReset={reset}
        downloadLabel={singleImage ? "Download JPG" : "Download ZIP"}
      />
    </div>
  );
}
