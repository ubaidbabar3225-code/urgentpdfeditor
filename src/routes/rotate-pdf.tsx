import { createFileRoute, notFound } from "@tanstack/react-router";
import { ToolPageLayout } from "@/components/site/ToolPageLayout";
import { getToolSeoByPath } from "@/lib/seo-content";
import { buildToolHead } from "@/lib/seo";
import { renderToolWidget } from "@/lib/render-tool";

const SEO = getToolSeoByPath("/rotate-pdf")!;

export const Route = createFileRoute("/rotate-pdf")({
  head: () => {
    if (!SEO) return { meta: [{ title: "Tool — UrgentPDFEditor" }] };
    return buildToolHead(SEO);
  },
  loader: () => {
    if (!SEO) throw notFound();
    return null;
  },
  component: Page,
});

function Page() {
  return (
    <ToolPageLayout seo={SEO}>
      {renderToolWidget("rotate-pdf")}
    </ToolPageLayout>
  );
}
