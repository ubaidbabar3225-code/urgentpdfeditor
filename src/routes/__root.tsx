import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Free PDF Converter & Editor Online – UrgentPDFEditor (All-in" },
      {
        name: "description",
        content:
          "Free online PDF tools: convert, merge, split, compress, rotate, watermark, lock and unlock PDFs. 100% in-browser, your files stay private.",
      },
      { name: "author", content: "UrgentPDFEditor" },
      { property: "og:title", content: "Free PDF Converter & Editor Online – UrgentPDFEditor (All-in" },
      {
        property: "og:description",
        content: "13 free PDF tools that work entirely in your browser. No upload, no signup, no waiting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Free PDF Converter & Editor Online – UrgentPDFEditor (All-in" },
      { name: "description", content: "UrgentPDFEditor is a free all-in-one PDF tool to convert, merge, split, compress and edit PDFs online. Convert PDF to Word, JPG, Excel or create PDFs from image" },
      { property: "og:description", content: "UrgentPDFEditor is a free all-in-one PDF tool to convert, merge, split, compress and edit PDFs online. Convert PDF to Word, JPG, Excel or create PDFs from image" },
      { name: "twitter:description", content: "UrgentPDFEditor is a free all-in-one PDF tool to convert, merge, split, compress and edit PDFs online. Convert PDF to Word, JPG, Excel or create PDFs from image" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cd0bc1a7-8f4e-4c7f-8088-be43b9e7e8b2/id-preview-3d9d85f2--b594e28a-1d15-45ff-830b-4fee4fcb3cdc.lovable.app-1777223383610.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cd0bc1a7-8f4e-4c7f-8088-be43b9e7e8b2/id-preview-3d9d85f2--b594e28a-1d15-45ff-830b-4fee4fcb3cdc.lovable.app-1777223383610.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
