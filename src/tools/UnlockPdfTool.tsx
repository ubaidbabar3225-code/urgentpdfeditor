import { useState } from "react";
import { Dropzone } from "@/components/site/Dropzone";
import { StatusBlock } from "@/components/site/ToolShell";
import { downloadBlob } from "@/lib/download";
import { Eye, EyeOff } from "lucide-react";

export function UnlockPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [result, setResult] = useState<Uint8Array | null>(null);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const convert = async () => {
    if (!files[0]) return;
    setStatus("processing");
    try {
      const { PDFDocument: PDFDoc } = await import("@cantoo/pdf-lib");
      const buf = await files[0].arrayBuffer();
      const pdf = await PDFDoc.load(buf, { password } as Parameters<typeof PDFDoc.load>[1]);
      const bytes = await pdf.save();
      setResult(bytes);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error && /password/i.test(err.message)
          ? "Incorrect password — please try again."
          : "Failed to unlock PDF. Make sure the file is a password-protected PDF.",
      );
      setStatus("error");
    }
  };

  const reset = () => { setFiles([]); setResult(null); setStatus("idle"); setErrorMsg(undefined); setPassword(""); };

  return (
    <div className="space-y-6">
      {status === "idle" && (
        <>
          <Dropzone
            onFiles={setFiles}
            files={files}
            accept={{ "application/pdf": [".pdf"] }}
            hint="Password-protected PDF"
            onRemove={() => setFiles([])}
          />
          {files.length > 0 && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button onClick={convert} className="w-full rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow transition-smooth">
                Unlock PDF
              </button>
            </>
          )}
        </>
      )}
      <StatusBlock
        status={status}
        message={errorMsg}
        onDownload={() => result && downloadBlob(result, "unlocked.pdf", "application/pdf")}
        onReset={reset}
        downloadLabel="Download unlocked PDF"
      />
    </div>
  );
}
