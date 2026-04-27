import { createFileRoute } from "@tanstack/react-router";
import { toolSeo } from "@/lib/seo-content";
import { SITE_URL } from "@/lib/site";
import { blogPosts } from "@/lib/blog-content";

// Cast to bypass an outdated `server:` type signature in this TanStack Start version.
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().slice(0, 10);
        const staticUrls = ["/", "/about", "/contact", "/blog"];
        const toolUrls = toolSeo.map((t) => t.path);
        const blogUrls = blogPosts.map((p) => `/blog/${p.slug}`);

        const all = [...staticUrls, ...toolUrls, ...blogUrls].map((path) => {
          const loc = `${SITE_URL}${path === "/" ? "" : path}`;
          const priority = path === "/" ? "1.0" : path.startsWith("/blog/") ? "0.6" : "0.8";
          const changefreq = path === "/" ? "daily" : "weekly";
          return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
        });

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${all.join("\n")}\n</urlset>\n`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
} as never);
