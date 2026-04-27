import { createFileRoute, notFound } from "@tanstack/react-router";
import { ToolPageLayout } from "@/components/site/ToolPageLayout";
import { getToolSeoByPath } from "@/lib/seo-content";
import { buildToolHead } from "@/lib/seo";
import { renderToolWidget } from "@/lib/render-tool";

const SEO = getToolSeoByPath("/merge-pdf")!;

export const Route = createFileRoute("/merge-pdf")({
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
      {renderToolWidget("merge-pdf")}
    </ToolPageLayout>
  );
}
