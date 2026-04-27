import type { ToolSeo, FAQ } from "@/lib/seo-content";
import { canonical, SITE_NAME, SITE_URL } from "@/lib/site";

/** JSON-LD FAQPage. */
export const faqJsonLd = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** JSON-LD HowTo. */
export const howToJsonLd = (seo: ToolSeo) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: seo.h1,
  description: seo.metaDescription,
  step: seo.howTo.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.text,
  })),
});

/** JSON-LD WebApplication entry for a tool. */
export const toolWebAppJsonLd = (seo: ToolSeo) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: seo.h1,
  url: canonical(seo.path),
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

/** JSON-LD Organization (used in root layout). */
export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
});

/** JSON-LD WebSite with SearchAction. */
export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
});

/** JSON-LD BreadcrumbList. */
export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: canonical(it.path),
  })),
});

/** Render a list of JSON-LD blocks into TanStack head() scripts entries. */
export const jsonLdScripts = (objs: object[]) =>
  objs.map((obj) => ({
    type: "application/ld+json",
    children: JSON.stringify(obj),
  }));

/** Build the standard meta + scripts for a tool page. */
export const buildToolHead = (seo: ToolSeo) => {
  const url = canonical(seo.path);
  return {
    meta: [
      { title: seo.metaTitle },
      { name: "description", content: seo.metaDescription },
      { name: "keywords", content: seo.keywords },
      { property: "og:title", content: seo.metaTitle },
      { property: "og:description", content: seo.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.metaTitle },
      { name: "twitter:description", content: seo.metaDescription },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLdScripts([
      faqJsonLd(seo.faqs),
      howToJsonLd(seo),
      toolWebAppJsonLd(seo),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: seo.h1.split("—")[0].trim(), path: seo.path },
      ]),
    ]),
  };
};
