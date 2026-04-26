import { useDropzone, type Accept } from "react-dropzone";
import { UploadCloud, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropzoneProps {
  onFiles: (files: File[]) => void;
  files: File[];
  accept?: Accept;
  multiple?: boolean;
  maxSizeMB?: number;
  hint?: string;
  onRemove?: (index: number) => void;
}

const MAX_DEFAULT_MB = 100;

export function Dropzone({
  onFiles,
  files,
  accept,
  multiple = false,
  maxSizeMB = MAX_DEFAULT_MB,
  hint,
  onRemove,
}: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: (accepted) => {
      if (accepted.length === 0) return;
      onFiles(multiple ? [...files, ...accepted] : accepted);
    },
    accept,
    multiple,
    maxSize: maxSizeMB * 1024 * 1024,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-2xl border-2 border-dashed p-10 md:p-14 text-center transition-smooth",
          isDragActive
            ? "border-primary bg-primary-soft scale-[1.01]"
            : "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary-soft/40",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-soft">
            <UploadCloud className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {isDragActive ? "Drop files here" : "Drop files here or click to upload"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {hint ?? `Max file size ${maxSizeMB} MB${multiple ? " · Multiple files allowed" : ""}`}
            </p>
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90 transition-smooth"
          >
            <UploadCloud className="h-4 w-4" />
            Upload File{multiple ? "s" : ""}
          </button>
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
          {fileRejections[0].errors[0].message}
        </div>
      )}

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3 shadow-soft animate-fade-up"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{f.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(f.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {onRemove && (
                <button
                  onClick={() => onRemove(i)}
                  className="p-1.5 rounded-md hover:bg-muted transition-smooth"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
