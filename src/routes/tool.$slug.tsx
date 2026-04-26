import { createFileRoute, notFound } from "@tanstack/react-router";
import { ToolShell } from "@/components/site/ToolShell";
import { getTool } from "@/lib/tools";
import { ImageToPdfTool } from "@/tools/ImageToPdfTool";
import { WordToPdfTool } from "@/tools/WordToPdfTool";
import { PdfToWordTool } from "@/tools/PdfToWordTool";
import { PdfToJpgTool } from "@/tools/PdfToJpgTool";
import { MergePdfTool } from "@/tools/MergePdfTool";
import { SplitPdfTool } from "@/tools/SplitPdfTool";
import { CompressPdfTool } from "@/tools/CompressPdfTool";
import { RotatePdfTool } from "@/tools/RotatePdfTool";
import { WatermarkPdfTool } from "@/tools/WatermarkPdfTool";
import { LockPdfTool } from "@/tools/LockPdfTool";
import { UnlockPdfTool } from "@/tools/UnlockPdfTool";

export const Route = createFileRoute("/tool/$slug")({
  loader: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.tool;
    if (!t) return { meta: [{ title: "Tool — UrgentPDFEditor" }] };
    return {
      meta: [
        { title: `${t.title} — UrgentPDFEditor` },
        { name: "description", content: t.description },
        { property: "og:title", content: `${t.title} — UrgentPDFEditor` },
        { property: "og:description", content: t.description },
      ],
    };
  },
  component: ToolPage,
  notFoundComponent: () => (
    <div className="container mx-auto p-12 text-center">
      <h1 className="text-2xl font-bold">Tool not found</h1>
    </div>
  ),
});

function ToolPage() {
  const { slug } = Route.useParams();
  return (
    <ToolShell slug={slug}>
      {renderTool(slug)}
    </ToolShell>
  );
}

function renderTool(slug: string) {
  switch (slug) {
    case "image-to-pdf":
      return <ImageToPdfTool accept="image/*" hint="Any image format · PNG, JPG, WEBP, GIF" />;
    case "jpg-to-pdf":
      return <ImageToPdfTool accept="image/jpeg" hint="JPG/JPEG only" />;
    case "png-to-pdf":
      return <ImageToPdfTool accept="image/png" hint="PNG only" />;
    case "word-to-pdf":
      return <WordToPdfTool />;
    case "pdf-to-word":
      return <PdfToWordTool />;
    case "pdf-to-jpg":
      return <PdfToJpgTool />;
    case "merge-pdf":
      return <MergePdfTool />;
    case "split-pdf":
      return <SplitPdfTool />;
    case "compress-pdf":
      return <CompressPdfTool />;
    case "rotate-pdf":
      return <RotatePdfTool />;
    case "watermark-pdf":
      return <WatermarkPdfTool />;
    case "lock-pdf":
      return <LockPdfTool />;
    case "unlock-pdf":
      return <UnlockPdfTool />;
    default:
      return null;
  }
}
