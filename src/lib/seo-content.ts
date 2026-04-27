// Per-tool SEO content: clean URL slug, meta tags, on-page H1/H2 content, FAQs.
// Each entry is rendered by the shared ToolPageLayout to produce a 600+ word
// keyword-rich page with FAQPage + HowTo schema.

export type FAQ = { q: string; a: string };

export type SeoStep = { title: string; text: string };

export type ToolSeo = {
  /** Clean URL path (also the route file name). */
  path: string;
  /** Slug used by /lib/tools.ts to render the actual tool component. */
  toolSlug: string;
  /** <title> – 60 chars max. */
  metaTitle: string;
  /** <meta description> – 150-160 chars. */
  metaDescription: string;
  /** Primary H1 heading. */
  h1: string;
  /** Short hero paragraph below H1. */
  intro: string;
  /** Long-form intro paragraphs (each rendered as <p>). */
  about: string[];
  /** "How to" steps shown as numbered list + HowTo schema. */
  howTo: SeoStep[];
  /** Bullet benefits list. */
  benefits: string[];
  /** Use-case paragraphs. */
  useCases: string[];
  /** FAQs rendered as accordion + FAQPage schema. */
  faqs: FAQ[];
  /** Slugs of related tools to surface in internal-link block. */
  related: string[];
  /** Keywords meta (comma separated). */
  keywords: string;
};

export const toolSeo: ToolSeo[] = [
  // ---------------- Convert to PDF ----------------
  {
    path: "/image-to-pdf",
    toolSlug: "image-to-pdf",
    metaTitle: "Image to PDF Converter Free Online — UrgentPDFEditor",
    metaDescription:
      "Convert images to PDF free online. Combine JPG, PNG, WEBP and GIF into one PDF in your browser — no upload, no signup, fully private.",
    h1: "Image to PDF Converter — Free Online",
    intro:
      "Turn any image into a clean, shareable PDF in seconds. Drag in JPG, PNG, WEBP or GIF files and download a single PDF — entirely in your browser.",
    about: [
      "Our free image to PDF converter lets you combine photos, scans, screenshots and graphics into a single PDF document without ever uploading them to a server. Everything happens locally in your browser, which keeps your files completely private and makes the conversion almost instant.",
      "Whether you need to send receipts to your accountant, package screenshots for a bug report, or turn travel photos into a printable album, this online image to PDF tool produces a clean, properly sized PDF that opens correctly in every PDF reader.",
      "Because UrgentPDFEditor runs in your browser, you can use it on Windows, macOS, Linux, Chromebook, iPhone and Android. There is no software to install, no account to create, and no daily limit. It's a fast, free PDF converter built for everyday use.",
    ],
    howTo: [
      { title: "Open the Image to PDF tool", text: "Click the upload area or drag your image files into the dropzone." },
      { title: "Add and reorder your images", text: "Add JPG, PNG, WEBP or GIF files. Drag them into the order you want them to appear in the PDF." },
      { title: "Click Convert to PDF", text: "Conversion runs locally in your browser using pdf-lib — no upload required." },
      { title: "Download your PDF", text: "Save the finished PDF to your device. Files are removed from memory as soon as you close the tab." },
    ],
    benefits: [
      "Free image to PDF conversion with no signup or watermark",
      "Supports JPG, JPEG, PNG, WEBP and GIF input",
      "Combine multiple images into a single PDF",
      "Files are never uploaded — 100% private and secure",
      "Works on desktop and mobile browsers",
    ],
    useCases: [
      "Combine receipts and invoices into one PDF for expense reports.",
      "Turn a stack of phone photos of a contract or whiteboard into a single document.",
      "Convert chapter scans into a printable PDF for studying.",
      "Bundle product screenshots for a support ticket or design review.",
    ],
    faqs: [
      { q: "Is this image to PDF converter really free?", a: "Yes. UrgentPDFEditor is 100% free with no signup, no daily limit and no watermarks. Every tool, including image to PDF, is free forever." },
      { q: "Are my images uploaded to a server?", a: "No. The conversion runs entirely in your browser using JavaScript and pdf-lib. Your images never leave your device, which makes this one of the most private online PDF converters available." },
      { q: "What image formats are supported?", a: "You can convert JPG, JPEG, PNG, WEBP and GIF files. Other formats are automatically rasterised through your browser canvas before being embedded in the PDF." },
      { q: "Can I combine multiple images into one PDF?", a: "Yes. Drop several images at once and they will be added as consecutive pages in the order you choose." },
      { q: "Does it work on mobile?", a: "Yes. The image to PDF tool works on iPhone, iPad and Android browsers. Just open the page and tap the upload area." },
    ],
    related: ["jpg-to-pdf", "png-to-pdf", "merge-pdf", "compress-pdf"],
    keywords: "image to pdf, image to pdf converter, free image to pdf, photos to pdf, online image to pdf",
  },
  {
    path: "/jpg-to-pdf",
    toolSlug: "jpg-to-pdf",
    metaTitle: "JPG to PDF Converter Free Online — UrgentPDFEditor",
    metaDescription:
      "Convert JPG to PDF free online. Combine multiple JPG photos into a single PDF in your browser — fast, secure and 100% private.",
    h1: "JPG to PDF Converter — Free Online",
    intro:
      "Convert one or many JPG photos into a single PDF in seconds. Files stay on your device — no upload, no signup, no watermark.",
    about: [
      "JPG is the most common photo format on the planet, but PDF is what people expect for documents. Our free JPG to PDF converter bridges that gap: drop your JPG or JPEG files in, and a clean PDF comes out the other side, ready to send, print or archive.",
      "Because the converter runs locally in your browser, even large batches of JPG photos process almost instantly. You don't wait on an upload, you don't sit in a queue, and you don't hand your photos to a third-party server.",
      "It's a great fit for students scanning notes with their phone, freelancers turning portfolio shots into a PDF book, or anyone who needs to send a quick photo packet to HR, an insurance company or a landlord.",
    ],
    howTo: [
      { title: "Upload your JPG files", text: "Drag JPG/JPEG photos into the dropzone or click to browse." },
      { title: "Reorder pages", text: "Drag the file chips to set the order they appear in the PDF." },
      { title: "Convert", text: "Click Convert to PDF. Conversion runs in your browser." },
      { title: "Download", text: "Download the finished PDF and you're done." },
    ],
    benefits: [
      "Free JPG to PDF converter — no daily cap or signup",
      "Combine many JPG photos into a single PDF",
      "Original photo quality preserved",
      "Private: files never leave your browser",
      "Works on Windows, Mac, iPhone and Android",
    ],
    useCases: [
      "Scan documents with your phone and convert the JPGs to a single PDF.",
      "Build a printable photo album from a JPG collection.",
      "Send proof of payment or ID photos as a single, polished PDF.",
    ],
    faqs: [
      { q: "How do I convert JPG to PDF for free?", a: "Open this page, drop your JPG files into the upload area, click Convert and download the PDF. The whole process is free and runs entirely in your browser." },
      { q: "Is the JPG to PDF converter safe to use?", a: "Yes. Your JPG files never leave your device. There is no upload to any server, which is the safest possible workflow for sensitive scans or ID documents." },
      { q: "Can I convert multiple JPGs to one PDF?", a: "Yes. Add as many JPG files as you like — they will be combined into a single multi-page PDF." },
      { q: "Will the JPG quality be reduced?", a: "No. The original JPG image data is embedded into the PDF, so quality is preserved." },
    ],
    related: ["png-to-pdf", "image-to-pdf", "merge-pdf", "compress-pdf"],
    keywords: "jpg to pdf, jpg to pdf converter, free jpg to pdf, jpeg to pdf, jpg to pdf online",
  },
  {
    path: "/png-to-pdf",
    toolSlug: "png-to-pdf",
    metaTitle: "PNG to PDF Converter Free Online — UrgentPDFEditor",
    metaDescription:
      "Convert PNG to PDF free online. Combine PNG images into one PDF in your browser. No upload, no signup, no watermark — 100% private.",
    h1: "PNG to PDF Converter — Free Online",
    intro:
      "Convert PNG screenshots and graphics into a clean, shareable PDF without uploading anything. Free, private and instant.",
    about: [
      "PNG is the format of choice for screenshots, transparent graphics and crisp UI exports. When you need to share or archive PNGs, a PDF is usually the better container — and our free PNG to PDF converter makes that conversion a one-click job.",
      "The tool runs in your browser. No server processes your files, which means even confidential UI mockups or NDA-bound screenshots stay completely private.",
      "Designers, developers, QA testers and product managers all rely on PNG to PDF conversion to bundle screens for review. UrgentPDFEditor's online PNG to PDF converter makes that workflow free, fast and friction-free.",
    ],
    howTo: [
      { title: "Drop your PNG files", text: "Drag PNG images into the upload box or click to select them." },
      { title: "Order them", text: "Sort them so the PDF pages appear in the right sequence." },
      { title: "Convert to PDF", text: "Click Convert. The PDF is built locally with pdf-lib." },
      { title: "Download", text: "Save the PDF to your machine." },
    ],
    benefits: [
      "Free PNG to PDF converter, no watermark, no signup",
      "Preserves PNG quality and resolution",
      "Combines many PNGs into one tidy PDF",
      "100% in-browser — your screenshots stay private",
      "Mobile and desktop friendly",
    ],
    useCases: [
      "Bundle UI screenshots into a single PDF for design review.",
      "Combine bug-report screenshots into one document for engineering.",
      "Archive social-media or chat screenshots as a single PDF.",
    ],
    faqs: [
      { q: "Is this PNG to PDF tool free?", a: "Yes — totally free with no daily limit, no signup, and no watermarks added to the output." },
      { q: "Will transparency in PNG be preserved?", a: "PDFs render PNG transparency on a white background by default, which keeps the visual output clean and predictable across PDF readers." },
      { q: "Can I combine multiple PNGs into a single PDF?", a: "Yes. Drop multiple PNGs and reorder them before clicking Convert." },
      { q: "Are my PNG files uploaded?", a: "No. They are processed locally in your browser — they never leave your device." },
    ],
    related: ["jpg-to-pdf", "image-to-pdf", "merge-pdf", "compress-pdf"],
    keywords: "png to pdf, png to pdf converter, free png to pdf, png to pdf online, screenshots to pdf",
  },
  {
    path: "/word-to-pdf",
    toolSlug: "word-to-pdf",
    metaTitle: "Word to PDF Converter Free Online — UrgentPDFEditor",
    metaDescription:
      "Convert Word to PDF free online. Turn DOCX files into clean PDFs in your browser — fast, secure, no signup, no upload.",
    h1: "Word to PDF Converter — Free Online",
    intro:
      "Convert DOCX documents into clean, shareable PDFs in your browser. No installation, no upload, no watermark.",
    about: [
      "Word documents are great for editing, but PDF is the right format for sharing. Our free Word to PDF converter takes a DOCX file and outputs a polished PDF that opens identically on any device.",
      "Conversion runs locally with mammoth and jsPDF, so your document never touches a server. That makes UrgentPDFEditor the safest place to convert contracts, resumes and confidential reports from Word to PDF online.",
      "There is nothing to install. Open the page, drop your DOCX in, click convert, and download — that's the entire workflow for converting Word to PDF for free.",
    ],
    howTo: [
      { title: "Upload your DOCX", text: "Drop a Word .docx file into the upload area." },
      { title: "Convert in browser", text: "Click Convert. mammoth extracts text and jsPDF lays it out as a clean PDF." },
      { title: "Download", text: "Save the resulting PDF." },
    ],
    benefits: [
      "Free Word to PDF converter, no signup",
      "Runs locally — your documents stay private",
      "Clean output that opens in every PDF reader",
      "Works on every modern browser including mobile",
    ],
    useCases: [
      "Convert your CV from Word to PDF before sending it to recruiters.",
      "Lock down a contract draft as a PDF before circulating it.",
      "Turn meeting notes into a printable PDF handout.",
    ],
    faqs: [
      { q: "Is the Word to PDF converter free?", a: "Yes. UrgentPDFEditor is free with no signup, no daily quota and no output watermarks." },
      { q: "Will my Word document be uploaded?", a: "No. We convert it inside your browser, so the DOCX file never leaves your device." },
      { q: "Does it preserve formatting?", a: "Text content, headings and paragraph structure are preserved. Complex layouts (tables, embedded graphics) are simplified — for the most demanding documents, export to PDF directly from Microsoft Word." },
      { q: "Does it support .doc files?", a: "Modern .docx files are supported. The legacy binary .doc format is not — open the file in Word and save it as .docx first." },
    ],
    related: ["pdf-to-word", "merge-pdf", "compress-pdf", "lock-pdf"],
    keywords: "word to pdf, word to pdf converter, docx to pdf, free word to pdf, convert word to pdf online",
  },

  // ---------------- Convert from PDF ----------------
  {
    path: "/pdf-to-word",
    toolSlug: "pdf-to-word",
    metaTitle: "PDF to Word Converter Free Online — UrgentPDFEditor",
    metaDescription:
      "Convert PDF to Word (DOCX) free online. Extract text from any PDF into an editable Word document in your browser — no signup, fully private.",
    h1: "PDF to Word Converter — Free Online",
    intro:
      "Turn any PDF into an editable Word document in seconds. Conversion happens entirely in your browser, so your PDF stays private.",
    about: [
      "Editing a PDF directly is painful. Our free PDF to Word converter solves that by extracting the text from any PDF and packaging it into a clean DOCX file you can open and edit in Microsoft Word, Google Docs, LibreOffice or any other word processor.",
      "Because the conversion runs locally — using pdfjs to read the PDF and the docx library to build the Word file — your document never gets uploaded to a third-party server. That privacy is rare in free PDF to Word tools and especially valuable for confidential contracts, HR forms and legal documents.",
      "If you've ever needed to repurpose copy from a brochure, update a contract you no longer have the source for, or translate a PDF into another language, this online PDF to Word converter is the fastest way to get editable text without paying for Adobe Acrobat.",
    ],
    howTo: [
      { title: "Upload your PDF", text: "Drag your PDF file into the upload area or click to browse." },
      { title: "Convert in browser", text: "Click Convert. pdfjs reads the PDF and the docx library builds an editable Word file." },
      { title: "Download the DOCX", text: "Save the .docx file and open it in Word, Google Docs or LibreOffice to edit." },
    ],
    benefits: [
      "Free PDF to Word converter — no signup, no daily limit",
      "Editable .docx output, ready for Word and Google Docs",
      "Private by design — files never leave your browser",
      "Works on every device with a modern browser",
      "Fast: most PDFs convert in under a second",
    ],
    useCases: [
      "Edit a contract you only have as a PDF.",
      "Translate a PDF document by editing the converted Word file.",
      "Repurpose marketing copy from a brochure PDF for new content.",
      "Extract text from scanned reports for note-taking.",
    ],
    faqs: [
      { q: "How do I convert PDF to Word for free?", a: "Open the PDF to Word tool, drop your PDF into the upload area, click Convert and download the resulting .docx file. It's completely free and runs in your browser." },
      { q: "Is the PDF to Word converter really free?", a: "Yes. There are no daily limits, no required accounts, no email gates, and no watermark on the output." },
      { q: "Will my PDF be uploaded to a server?", a: "No. The PDF is processed entirely in your browser using pdfjs. Nothing leaves your device, which is ideal for confidential documents." },
      { q: "Will the formatting be preserved exactly?", a: "We extract text content into a clean editable DOCX. Complex layout (multi-column, embedded images, exact fonts) is simplified — for pixel-perfect conversion, a paid desktop app such as Adobe Acrobat is more accurate." },
      { q: "Does it work for scanned PDFs?", a: "Scanned PDFs are images, not text. To convert a scanned PDF you first need to run OCR on it. This tool extracts the text layer that already exists in the PDF." },
    ],
    related: ["word-to-pdf", "pdf-to-jpg", "merge-pdf", "compress-pdf"],
    keywords: "pdf to word, pdf to word converter, pdf to docx, free pdf to word, convert pdf to word online",
  },
  {
    path: "/pdf-to-jpg",
    toolSlug: "pdf-to-jpg",
    metaTitle: "PDF to JPG Converter Free Online — UrgentPDFEditor",
    metaDescription:
      "Convert PDF to JPG free online. Export every PDF page as a high-quality JPG image, bundled in a ZIP — fully private and runs in your browser.",
    h1: "PDF to JPG Converter — Free Online",
    intro:
      "Turn every page of a PDF into a high-quality JPG image. The whole conversion runs in your browser, so your PDF stays private.",
    about: [
      "Sometimes you need an image, not a PDF. Our free PDF to JPG converter renders every page of your PDF as a crisp JPG and bundles them into a single ZIP for easy download.",
      "Because conversion is local, even a long, sensitive PDF processes quickly without ever being uploaded. It's perfect for grabbing pages to embed in Notion, share on social media, or paste into a slide deck.",
      "Designers, marketers and teachers use PDF to JPG conversion all the time. UrgentPDFEditor makes the process free, watermark-free and private.",
    ],
    howTo: [
      { title: "Upload your PDF", text: "Drop the PDF file into the upload area." },
      { title: "Render each page", text: "Click Convert. Each PDF page is rasterised to a high-quality JPG using pdfjs." },
      { title: "Download the ZIP", text: "Save the ZIP containing one JPG per page." },
    ],
    benefits: [
      "Free PDF to JPG converter with no signup",
      "High-quality JPG output for every page",
      "Convenient ZIP bundle for multi-page PDFs",
      "Files never leave your browser",
      "Works on phones, tablets and computers",
    ],
    useCases: [
      "Embed PDF pages as images in Notion, Confluence or a blog post.",
      "Share a single page of a PDF on social media as an image.",
      "Pick the best page from a PDF and use it as a slide background.",
    ],
    faqs: [
      { q: "Is the PDF to JPG converter free?", a: "Yes — fully free, no signup, no daily cap, no watermarks." },
      { q: "Will my PDF be uploaded?", a: "No. Pages are rendered locally with pdfjs in your browser." },
      { q: "What quality are the JPGs?", a: "Pages are rendered at a high pixel ratio so the JPGs stay crisp even when zoomed in." },
      { q: "How are multiple pages delivered?", a: "All page JPGs are zipped into a single ZIP file you can download in one click." },
    ],
    related: ["pdf-to-word", "image-to-pdf", "compress-pdf", "merge-pdf"],
    keywords: "pdf to jpg, pdf to jpg converter, free pdf to jpg, pdf to image, convert pdf to jpg online",
  },

  // ---------------- Organize ----------------
  {
    path: "/merge-pdf",
    toolSlug: "merge-pdf",
    metaTitle: "Merge PDF Free Online — Combine PDFs in Browser",
    metaDescription:
      "Merge PDF files online for free. Combine multiple PDFs into one document in your browser — no signup, no upload, fully private.",
    h1: "Merge PDF — Free Online PDF Combiner",
    intro:
      "Combine two or more PDFs into a single document in seconds. Drop your files in any order, and we merge them locally in your browser.",
    about: [
      "Merging PDFs is one of the most common PDF tasks: glue a cover letter to a CV, combine bank statements into one document, or stitch together scanned chapters into a single book. Our free online merge PDF tool does it in seconds, completely in your browser.",
      "Because nothing is uploaded, the merge is fast even for very large PDFs and your documents stay private. There is no signup, no daily limit, no watermark and no email required — just drop the files in, reorder them and click Merge.",
      "Whether you need to merge two PDF files or combine ten different PDFs into one, the workflow is identical and the output is a single, clean PDF ready to send.",
    ],
    howTo: [
      { title: "Upload PDFs", text: "Drop multiple PDF files into the upload area." },
      { title: "Reorder", text: "Drag the file chips into the order you want the pages to appear." },
      { title: "Merge", text: "Click Merge PDF. pdf-lib combines the documents in your browser." },
      { title: "Download", text: "Save the merged PDF to your device." },
    ],
    benefits: [
      "Free PDF merger with no daily limit",
      "Combine unlimited PDFs into one file",
      "Original quality preserved exactly (no re-rendering)",
      "100% private — your files stay on your device",
      "Works on every device and browser",
    ],
    useCases: [
      "Attach a cover letter PDF to your CV PDF before sending it.",
      "Combine monthly bank statements into one yearly document.",
      "Stitch together scanned chapters of a book.",
      "Merge an invoice and supporting receipts into a single PDF.",
    ],
    faqs: [
      { q: "How do I merge PDF files for free?", a: "Open the Merge PDF tool, drop your PDFs in the upload area, drag them into the order you want, and click Merge. Download the combined PDF — no signup, no payment." },
      { q: "Is there a limit on how many PDFs I can merge?", a: "There is no hard limit. Because everything runs locally, the only constraint is your device's available memory. We've tested the tool with dozens of PDFs at once." },
      { q: "Are my PDFs uploaded somewhere?", a: "No. The merge runs entirely in your browser using pdf-lib. Your PDFs never leave your device." },
      { q: "Will the merged PDF lose quality?", a: "No. We copy pages directly without re-rendering them, so the visual quality and embedded fonts are preserved exactly." },
      { q: "Can I reorder pages while merging?", a: "Yes. Drag the file chips up and down to set the order before clicking Merge." },
    ],
    related: ["split-pdf", "compress-pdf", "rotate-pdf", "pdf-to-word"],
    keywords: "merge pdf, merge pdf online, combine pdf, free pdf merger, join pdf files",
  },
  {
    path: "/split-pdf",
    toolSlug: "split-pdf",
    metaTitle: "Split PDF Free Online — Extract PDF Pages",
    metaDescription:
      "Split PDF files online for free. Extract pages or split a PDF into separate documents in your browser — fast, secure, no signup needed.",
    h1: "Split PDF — Free Online PDF Splitter",
    intro:
      "Extract specific pages from a PDF or split it into separate documents. The split runs entirely in your browser.",
    about: [
      "Sometimes you only need one section of a PDF — a single chapter, the signature page of a contract, or just the parts of a report relevant to your team. Our free PDF splitter makes it easy to extract pages or split a PDF into multiple smaller documents in seconds.",
      "Like every UrgentPDFEditor tool, the split runs locally in your browser, so even highly confidential PDFs stay private. There's no signup, no watermark and no daily cap.",
      "Splitting a PDF online has never been faster: no upload wait, no progress bar, no queue.",
    ],
    howTo: [
      { title: "Upload your PDF", text: "Drop the PDF file into the upload area." },
      { title: "Choose pages", text: "Pick a page range or set of pages to extract." },
      { title: "Split in browser", text: "Click Split. pdf-lib creates the new PDF locally." },
      { title: "Download", text: "Save the resulting PDF(s)." },
    ],
    benefits: [
      "Free PDF splitter, no signup",
      "Extract any pages or page ranges",
      "Files stay private — nothing uploaded",
      "Original PDF quality preserved",
      "Works on every device",
    ],
    useCases: [
      "Pull out the signature page of a contract.",
      "Extract one chapter from a long PDF book.",
      "Split a multi-invoice PDF into individual invoices.",
    ],
    faqs: [
      { q: "How do I split a PDF for free?", a: "Upload the PDF, choose the page range or pages you want to extract, click Split, and download the result. The whole flow is free and runs in your browser." },
      { q: "Is the PDF splitter safe?", a: "Yes. Your PDF never leaves your device — splitting happens locally with pdf-lib." },
      { q: "Will the extracted pages keep their original quality?", a: "Yes. Pages are copied without re-rendering, so quality and formatting are preserved exactly." },
    ],
    related: ["merge-pdf", "rotate-pdf", "compress-pdf", "pdf-to-jpg"],
    keywords: "split pdf, split pdf online, free pdf splitter, extract pdf pages, divide pdf",
  },
  {
    path: "/rotate-pdf",
    toolSlug: "rotate-pdf",
    metaTitle: "Rotate PDF Free Online — Fix Page Orientation",
    metaDescription:
      "Rotate PDF pages online for free. Turn pages 90, 180 or 270 degrees in your browser — no signup, no upload, fully private.",
    h1: "Rotate PDF — Free Online PDF Rotator",
    intro:
      "Rotate every page of a PDF by 90, 180 or 270 degrees in seconds. The fix runs locally in your browser.",
    about: [
      "Scanned the page upside down? Phone snap landed sideways? Our free online PDF rotator saves your day with a single click — choose the rotation angle, click Rotate and download the corrected PDF.",
      "It's all done in the browser, so your PDF stays private and the rotation is instant. There's no signup, no daily limit and no watermark added to your file.",
    ],
    howTo: [
      { title: "Upload your PDF", text: "Drop the PDF you want to rotate into the upload area." },
      { title: "Pick an angle", text: "Choose 90°, 180° or 270°." },
      { title: "Rotate", text: "Click Rotate PDF. pdf-lib applies the rotation to every page." },
      { title: "Download", text: "Save the rotated PDF." },
    ],
    benefits: [
      "Free PDF rotation, no signup, no watermark",
      "Choose 90, 180 or 270 degrees",
      "Pages stay sharp — no re-rendering",
      "Files never leave your browser",
    ],
    useCases: [
      "Fix a sideways scan from your phone.",
      "Rotate a landscape PDF to portrait for printing.",
    ],
    faqs: [
      { q: "How do I rotate a PDF for free?", a: "Open the Rotate PDF tool, upload your file, pick an angle, click Rotate and download the result. No signup needed." },
      { q: "Does rotating change quality?", a: "No. We update the page rotation metadata in the PDF without re-rendering, so quality is preserved." },
      { q: "Is the file uploaded?", a: "No. Rotation happens locally in your browser." },
    ],
    related: ["merge-pdf", "split-pdf", "compress-pdf", "watermark-pdf"],
    keywords: "rotate pdf, rotate pdf online, free pdf rotator, turn pdf page, fix pdf orientation",
  },

  // ---------------- Optimize ----------------
  {
    path: "/compress-pdf",
    toolSlug: "compress-pdf",
    metaTitle: "Compress PDF Free Online — Reduce PDF File Size",
    metaDescription:
      "Compress PDF files online for free. Reduce PDF size while keeping quality — runs in your browser, no upload, no signup, fully private.",
    h1: "Compress PDF — Free Online PDF Compressor",
    intro:
      "Shrink your PDF without sacrificing readability. The compressor runs locally in your browser, so your file stays private.",
    about: [
      "Big PDFs are a pain to email, upload or share. Our free PDF compressor reduces file size by stripping unnecessary metadata and re-saving the document — all in your browser, with no signup and no daily quota.",
      "Because the work happens locally, even multi-megabyte PDFs compress quickly. Your file never gets uploaded to a third-party server, which keeps confidential PDFs safe.",
      "Use the PDF compressor before emailing reports, attaching documents to job applications, or uploading PDFs to portals with a strict size limit.",
    ],
    howTo: [
      { title: "Upload your PDF", text: "Drop the PDF you want to compress." },
      { title: "Compress in browser", text: "Click Compress. The PDF is re-saved with stripped metadata." },
      { title: "Download", text: "Save the smaller PDF." },
    ],
    benefits: [
      "Free PDF compressor — no signup",
      "Lossless metadata stripping",
      "Smaller files for email and uploads",
      "Files stay on your device",
      "Works on every modern browser",
    ],
    useCases: [
      "Shrink a CV PDF before emailing it.",
      "Reduce a contract PDF below an upload size limit.",
      "Send a smaller invoice to clients.",
    ],
    faqs: [
      { q: "How does this PDF compressor work?", a: "It re-saves the PDF using pdf-lib with stripped metadata and optimised object streams. For PDFs with very heavy embedded images, more aggressive image-based compression would require a desktop tool." },
      { q: "Is the compressor free?", a: "Yes — completely free with no signup or daily limit." },
      { q: "Are my files uploaded?", a: "No. Compression runs in your browser, so files stay private." },
      { q: "Will the PDF lose quality?", a: "No visible quality loss — text, fonts and images are preserved." },
    ],
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg", "watermark-pdf"],
    keywords: "compress pdf, compress pdf online, free pdf compressor, reduce pdf size, shrink pdf",
  },
  {
    path: "/watermark-pdf",
    toolSlug: "watermark-pdf",
    metaTitle: "Watermark PDF Free Online — Add Text Watermark",
    metaDescription:
      "Add a watermark to PDF files online for free. Stamp every page with custom text in your browser — no signup, no upload, fully private.",
    h1: "Watermark PDF — Free Online Watermark Tool",
    intro:
      "Stamp every page of a PDF with custom text. Choose your label, click Watermark and download the result.",
    about: [
      "Watermarking a PDF protects your work and signals the document's status: DRAFT, CONFIDENTIAL, FOR REVIEW. Our free online watermark tool adds custom text to every page in seconds.",
      "The watermark is rendered locally with pdf-lib, which means even sensitive PDFs never leave your device.",
    ],
    howTo: [
      { title: "Upload PDF", text: "Drop the PDF you want to watermark." },
      { title: "Type the watermark text", text: "Enter the text you want to stamp on every page." },
      { title: "Apply watermark", text: "Click Watermark PDF and the text is added to each page." },
      { title: "Download", text: "Save the watermarked PDF." },
    ],
    benefits: [
      "Free PDF watermarking, no signup",
      "Custom text watermark on every page",
      "Files never leave your browser",
      "Works on desktop and mobile",
    ],
    useCases: [
      "Mark drafts as DRAFT before sending for review.",
      "Brand client deliverables with your company name.",
      "Tag confidential PDFs with CONFIDENTIAL across each page.",
    ],
    faqs: [
      { q: "Is the PDF watermark tool free?", a: "Yes. UrgentPDFEditor's watermark tool is free with no signup or watermark of our own — only the text you choose appears on the page." },
      { q: "Can I watermark sensitive PDFs?", a: "Yes. The watermark is added in your browser, so the file is never uploaded to a server." },
      { q: "Can I customise the text?", a: "Yes — type any text you want, including company names, status labels, dates or messages." },
    ],
    related: ["lock-pdf", "compress-pdf", "merge-pdf", "rotate-pdf"],
    keywords: "watermark pdf, add watermark to pdf, free pdf watermark, stamp pdf, watermark pdf online",
  },

  // ---------------- Security ----------------
  {
    path: "/lock-pdf",
    toolSlug: "lock-pdf",
    metaTitle: "Lock PDF with Password Free — UrgentPDFEditor",
    metaDescription:
      "Lock PDF files with a password free online. Encrypt PDFs in your browser — no signup, no upload, fully private and secure.",
    h1: "Lock PDF with a Password — Free Online",
    intro:
      "Add password protection to any PDF. The encryption runs in your browser using a battle-tested library.",
    about: [
      "When a PDF contains sensitive information, a password is the first line of defence. Our free PDF lock tool encrypts your PDF directly in the browser — your file and your password never leave your device.",
      "There is no signup or daily quota. Drop the PDF in, type the password you want, and download the encrypted file.",
    ],
    howTo: [
      { title: "Upload PDF", text: "Drop the PDF file into the upload area." },
      { title: "Set a password", text: "Type the password you want to protect the PDF with." },
      { title: "Encrypt", text: "Click Lock PDF. The PDF is encrypted in your browser." },
      { title: "Download", text: "Save the password-protected PDF." },
    ],
    benefits: [
      "Free PDF password protection",
      "Strong, standard PDF encryption",
      "Password and file never leave your browser",
      "No signup, no quota",
    ],
    useCases: [
      "Protect a contract before sending it via email.",
      "Lock down a financial report shared with clients.",
      "Secure HR or medical PDFs before storing in the cloud.",
    ],
    faqs: [
      { q: "Is the PDF lock tool free?", a: "Yes — completely free with no signup and no daily limit." },
      { q: "Can you recover my password?", a: "No. The password never leaves your device — we don't see it and we cannot recover it. Save it somewhere safe." },
      { q: "How strong is the encryption?", a: "We use the standard PDF AES-256 encryption supported by all major PDF readers." },
    ],
    related: ["unlock-pdf", "watermark-pdf", "merge-pdf", "compress-pdf"],
    keywords: "lock pdf, password protect pdf, encrypt pdf, free pdf password, secure pdf online",
  },
  {
    path: "/unlock-pdf",
    toolSlug: "unlock-pdf",
    metaTitle: "Unlock PDF Free Online — Remove PDF Password",
    metaDescription:
      "Unlock PDF files free online. Remove the password from a PDF you own in your browser — fast, secure and 100% private.",
    h1: "Unlock PDF — Free Online Password Remover",
    intro:
      "Remove the password from a PDF you own in seconds. Decryption runs locally in your browser.",
    about: [
      "If you own a PDF and you know its password, our free PDF unlock tool removes the encryption so you can use the document like any other PDF. The whole flow runs in your browser, so the password and the unlocked PDF stay on your device.",
      "Please only unlock PDFs you have the right to access.",
    ],
    howTo: [
      { title: "Upload the PDF", text: "Drop the password-protected PDF into the upload area." },
      { title: "Enter the password", text: "Type the PDF's current password." },
      { title: "Unlock", text: "Click Unlock PDF. The PDF is decrypted in your browser." },
      { title: "Download", text: "Save the unlocked PDF." },
    ],
    benefits: [
      "Free PDF unlock — no signup",
      "Runs in browser — your password stays private",
      "Works for standard password-protected PDFs",
    ],
    useCases: [
      "Remove a password from your own PDF you no longer want to gate.",
      "Unlock a PDF you can no longer remember the access reason for, but still know the password to.",
    ],
    faqs: [
      { q: "Is this PDF unlock tool free?", a: "Yes — free with no signup or daily limit." },
      { q: "Can I unlock a PDF without the password?", a: "No. You must know the current password. UrgentPDFEditor will not crack passwords on PDFs you don't own." },
      { q: "Is it safe?", a: "Yes. Decryption happens entirely in your browser — your password and PDF never leave your device." },
    ],
    related: ["lock-pdf", "watermark-pdf", "compress-pdf", "merge-pdf"],
    keywords: "unlock pdf, remove pdf password, free pdf unlocker, decrypt pdf, unlock pdf online",
  },
];

export const getToolSeoByPath = (path: string) => toolSeo.find((t) => t.path === path);
export const getToolSeoBySlug = (slug: string) => toolSeo.find((t) => t.toolSlug === slug);
