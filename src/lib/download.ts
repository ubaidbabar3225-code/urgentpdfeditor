import { saveAs } from "file-saver";

export function downloadBlob(data: Uint8Array | ArrayBuffer | Blob | string, filename: string, mime?: string) {
  let blob: Blob;
  if (data instanceof Blob) {
    blob = data;
  } else if (data instanceof Uint8Array) {
    // Copy bytes into a fresh ArrayBuffer to avoid SharedArrayBuffer typing issues
    const ab = new ArrayBuffer(data.byteLength);
    new Uint8Array(ab).set(data);
    blob = new Blob([ab], { type: mime ?? "application/octet-stream" });
  } else {
    blob = new Blob([data as BlobPart], { type: mime ?? "application/octet-stream" });
  }
  saveAs(blob, filename);
}

export function readAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

export function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
