// Centralized pdfjs setup with worker pinned via Vite ?url import.
import * as pdfjsLib from "pdfjs-dist";
// @ts-ignore - vite handles ?url
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
}

export { pdfjsLib };
