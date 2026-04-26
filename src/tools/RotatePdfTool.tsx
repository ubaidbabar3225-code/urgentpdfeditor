import { useState } from "react";
import { Dropzone } from "@/components/site/Dropzone";
import { StatusBlock } from "@/components/site/ToolShell";
import { downloadBlob } from "@/lib/download";
import { PDFDocument, degrees } from "pdf-lib";

export function RotatePdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);

  const convert = async () => {
    if (!files[0]) return;
    setStatus("processing");
    try {
      const pdf = await PDFDocument.load(await files[0].arrayBuffer());
      pdf.getPages().forEach((page) => {
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + angle) % 360));
      });
      const bytes = await pdf.save();
      setResult(bytes);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Rotation failed");
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
                <label className="block text-sm font-medium mb-2">Rotation angle</label>
                <div className="grid grid-cols-3 gap-2">
                  {([90, 180, 270] as const).map((a) => (
                    <button
                      key={a}
                      onClick={() => setAngle(a)}
                      className={`rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-smooth ${
                        angle === a
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      {a}°
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={convert} className="w-full rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition-smooth">
                Rotate PDF
              </button>
            </>
          )}
        </>
      )}
      <StatusBlock
        status={status}
        message={errorMsg}
        onDownload={() => result && downloadBlob(result, "rotated.pdf", "application/pdf")}
        onReset={reset}
        downloadLabel="Download rotated PDF"
      />
    </div>
  );
}
