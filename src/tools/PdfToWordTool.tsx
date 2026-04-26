import { useState } from "react";
import { Dropzone } from "@/components/site/Dropzone";
import { StatusBlock } from "@/components/site/ToolShell";
import { downloadBlob } from "@/lib/download";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { pdfjsLib } from "@/lib/pdfjs-setup";

export function PdfToWordTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [result, setResult] = useState<Blob | null>(null);
  const [outName, setOutName] = useState("converted.docx");

  const convert = async () => {
    if (files.length === 0) return;
    setStatus("processing");
    try {
      const file = files[0];
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const paragraphs: Paragraph[] = [];
      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const content = await page.getTextContent();
        const text = content.items
          .map((it) => ("str" in it ? it.str : ""))
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
        if (text) {
          paragraphs.push(new Paragraph({ children: [new TextRun(text)] }));
        }
        paragraphs.push(new Paragraph({ children: [new TextRun("")] }));
      }
      const doc = new Document({ sections: [{ children: paragraphs }] });
      const blob = await Packer.toBlob(doc);
      setResult(blob);
      setOutName(file.name.replace(/\.pdf$/i, "") + ".docx");
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
            hint="PDF file · extracts text into editable DOCX"
            onRemove={(i) => setFiles(files.filter((_, idx) => idx !== i))}
          />
          {files.length > 0 && (
            <button onClick={convert} className="w-full rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition-smooth">
              Convert to Word
            </button>
          )}
          <p className="text-xs text-muted-foreground text-center">
            Note: This tool extracts text content. Complex layouts and images are not preserved.
          </p>
        </>
      )}
      <StatusBlock
        status={status}
        message={errorMsg}
        onDownload={() => result && downloadBlob(result, outName)}
        onReset={reset}
        downloadLabel="Download DOCX"
      />
    </div>
  );
}
