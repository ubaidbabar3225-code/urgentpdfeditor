import {
  FileImage,
  FileText,
  FileType,
  Combine,
  Scissors,
  Minimize2,
  RotateCw,
  Droplets,
  Lock,
  Unlock,
  Image as ImageIcon,
  FileDown,
  type LucideIcon,
} from "lucide-react";

export type Tool = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string; // tailwind bg utility for icon tile
  category: "Convert to PDF" | "Convert from PDF" | "Organize" | "Optimize" | "Security";
};

export const tools: Tool[] = [
  {
    slug: "image-to-pdf",
    title: "Image to PDF",
    description: "Convert any image format to a PDF document.",
    icon: ImageIcon,
    color: "bg-blue-500",
    category: "Convert to PDF",
  },
  {
    slug: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Turn JPG photos into a single PDF file.",
    icon: FileImage,
    color: "bg-amber-500",
    category: "Convert to PDF",
  },
  {
    slug: "png-to-pdf",
    title: "PNG to PDF",
    description: "Convert PNG images into PDF with one click.",
    icon: FileImage,
    color: "bg-emerald-500",
    category: "Convert to PDF",
  },
  {
    slug: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert DOCX documents into clean PDF files.",
    icon: FileType,
    color: "bg-sky-600",
    category: "Convert to PDF",
  },
  {
    slug: "pdf-to-word",
    title: "PDF to Word",
    description: "Extract text from PDF into an editable DOCX.",
    icon: FileText,
    color: "bg-indigo-500",
    category: "Convert from PDF",
  },
  {
    slug: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Render every PDF page as a high-quality JPG.",
    icon: FileDown,
    color: "bg-rose-500",
    category: "Convert from PDF",
  },
  {
    slug: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDFs into one document.",
    icon: Combine,
    color: "bg-violet-500",
    category: "Organize",
  },
  {
    slug: "split-pdf",
    title: "Split PDF",
    description: "Extract pages or split into separate files.",
    icon: Scissors,
    color: "bg-fuchsia-500",
    category: "Organize",
  },
  {
    slug: "rotate-pdf",
    title: "Rotate PDF",
    description: "Rotate all pages by 90, 180, or 270 degrees.",
    icon: RotateCw,
    color: "bg-orange-500",
    category: "Organize",
  },
  {
    slug: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF size while keeping quality.",
    icon: Minimize2,
    color: "bg-teal-500",
    category: "Optimize",
  },
  {
    slug: "watermark-pdf",
    title: "Watermark PDF",
    description: "Add custom text watermark to every page.",
    icon: Droplets,
    color: "bg-cyan-500",
    category: "Optimize",
  },
  {
    slug: "lock-pdf",
    title: "Lock PDF",
    description: "Protect a PDF with a password.",
    icon: Lock,
    color: "bg-slate-700",
    category: "Security",
  },
  {
    slug: "unlock-pdf",
    title: "Unlock PDF",
    description: "Remove password protection from a PDF.",
    icon: Unlock,
    color: "bg-green-600",
    category: "Security",
  },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
