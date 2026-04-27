// Central site configuration used for SEO, canonicals, sitemap, and schema.
export const SITE_URL = "https://urgentpdfeditor.lovable.app";
export const SITE_NAME = "UrgentPDFEditor";
export const SITE_TAGLINE = "Free PDF Tools Online";
export const SITE_DESCRIPTION =
  "Free online PDF tools: convert, merge, split, compress, rotate, watermark, lock and unlock PDFs. 100% in-browser, your files stay private.";
export const SITE_LOCALE = "en_US";
export const SITE_TWITTER = "@urgentpdfeditor";
export const SITE_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cd0bc1a7-8f4e-4c7f-8088-be43b9e7e8b2/id-preview-3d9d85f2--b594e28a-1d15-45ff-830b-4fee4fcb3cdc.lovable.app-1777223383610.png";

export const canonical = (path: string) => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "" : clean}`;
};
