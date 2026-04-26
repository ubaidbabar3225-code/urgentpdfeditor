import { useState } from "react";
import { Dropzone } from "@/components/site/Dropzone";
import { StatusBlock } from "@/components/site/ToolShell";
import { downloadBlob, readAsArrayBuffer } from "@/lib/download";
import mammoth from "mammoth";
import jsPDF from "jspdf";

export function WordToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [result, setResult] = useState<Blob | null>(null);
  const [outName, setOutName] = useState("converted.pdf");

  const convert = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    try {
      const file = files[0];
      const buf = await readAsArrayBuffer(file);
      const { value: text } = await mammoth.extractRawText({ arrayBuffer: buf });
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 56;
      const maxWidth = pageWidth - margin * 2;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(text || "(Empty document)", maxWidth);
      let y = margin;
      const lineHeight = 14;
      for (const line of lines) {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      }
      const blob = doc.output("blob");
      setResult(blob);
      setOutName(file.name.replace(/\.docx?$/i, "") + ".pdf");
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
            accept={{
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            }}
            hint="DOCX file (text content will be converted)"
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
        onDownload={() => result && downloadBlob(result, outName, "application/pdf")}
        onReset={reset}
        downloadLabel="Download PDF"
      />
    </div>
  );
}
