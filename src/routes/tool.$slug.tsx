import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy route — every old /tool/<slug> URL now permanently redirects to the
// clean URL /<slug>. This preserves any inbound links from before the SEO
// restructure.
export const Route = createFileRoute("/tool/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: `/${params.slug}` as never, statusCode: 301 });
  },
  component: () => null,
});
