import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";
import { documentEventHandler } from "@sanity/functions";
import { compile } from "tailwindcss";
const require$1 = createRequire(import.meta.url);
const tailwindStylesheetPath = require$1.resolve("tailwindcss/index.css");
const forbiddenHtmlPatterns = [
  /<script\b/i,
  /<iframe\b/i,
  /<object\b/i,
  /<embed\b/i,
  /<link\b/i,
  /<style\b/i,
  /\bon[a-z]+\s*=/i,
  /javascript\s*:/i
];
const forbiddenCssPatterns = [/@import/i, /expression\s*\(/i];
const compilerCache = /* @__PURE__ */ new Map();
const baseTemplateCss = `@import "tailwindcss" source(none);

@theme {
  --background: #ffffff;
  --foreground: #334155;
  --surface-dark: #0f172a;
  --surface-dark-soft: #1e293b;
  --surface-muted: #f8fafc;
  --accent: #f97316;
  --accent-soft: #fbbf24;
  --radius-container: 0.75rem;
  --radius-card: 0.75rem;
  --radius-control: 0.5rem;
  --font-sans: Inter, "Segoe UI", Arial, sans-serif;
  --font-display: Outfit, Inter, "Segoe UI", Arial, sans-serif;
}

@layer base {
  :root {
    color-scheme: light;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  img, svg, video, canvas {
    display: block;
    max-width: 100%;
    height: auto;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

img {
  color: transparent;
}

.premium-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-card);
  transition: all 0.4s ease;
}

.premium-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px -12px rgba(15, 23, 42, 0.12);
  border-color: rgba(249, 115, 22, 0.4);
}

.accent-gradient-text {
  background: linear-gradient(to right, #fb923c, #f97316);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 4px;
  background: linear-gradient(to right, var(--surface-dark-soft), #f97316);
  border-radius: 0.25rem;
}

.template-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
}

.template-icon svg {
  width: 1em;
  height: 1em;
  display: block;
}`;
function getCodeValue(value) {
  if (typeof value === "string") {
    return value.trim();
  }
  if (value && typeof value === "object" && typeof value.code === "string") {
    return value.code.trim();
  }
  return "";
}
function containsForbiddenPattern(source, patterns) {
  return patterns.some((pattern) => pattern.test(source));
}
function normalizeTemplateHtml(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return (bodyMatch?.[1] || html).trim();
}
function extractTailwindCandidates(html) {
  const candidates = /* @__PURE__ */ new Set();
  const classAttributePattern = /class\s*=\s*["']([^"']+)["']/gim;
  for (const match of html.matchAll(classAttributePattern)) {
    const tokens = match[1]?.split(/\s+/).filter(Boolean) ?? [];
    for (const token of tokens) {
      candidates.add(token);
    }
  }
  return Array.from(candidates);
}
function hashTemplateContent(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}
function buildAssetMap(projectId, dataset, templateImages) {
  const builder = imageUrlBuilder({ projectId, dataset });
  const assetMap = /* @__PURE__ */ new Map();
  for (const item of templateImages ?? []) {
    const key = item?.key?.trim().toLowerCase();
    if (!key || !item.image) continue;
    try {
      assetMap.set(key, builder.image(item.image).width(2e3).fit("max").url());
    } catch {
      continue;
    }
  }
  return assetMap;
}
function replaceTemplateAssets(source, assetMap, issues) {
  return source.replace(/\{\{asset:([a-z0-9-]+)\}\}/gi, (_match, rawKey) => {
    const key = rawKey.trim().toLowerCase();
    const url = assetMap.get(key);
    if (!url) {
      issues.push(`Missing template image for key "${key}"`);
      return "";
    }
    return url;
  });
}
async function loadTailwindStylesheet(id, base) {
  if (id === "tailwindcss") {
    return {
      path: tailwindStylesheetPath,
      base: path.dirname(tailwindStylesheetPath),
      content: await readFile(tailwindStylesheetPath, "utf8")
    };
  }
  const filePath = path.resolve(base, id);
  return {
    path: filePath,
    base: path.dirname(filePath),
    content: await readFile(filePath, "utf8")
  };
}
async function compileTemplateCss(html, customCss) {
  const candidates = extractTailwindCandidates(html);
  const cacheKey = `${html}
/*__CSS__*/
${customCss}`;
  let pending = compilerCache.get(cacheKey);
  if (!pending) {
    pending = compile(`${baseTemplateCss}
${customCss}`, {
      loadStylesheet: loadTailwindStylesheet
    }).then((compiler) => compiler.build(candidates));
    compilerCache.set(cacheKey, pending);
  }
  return pending;
}
async function renderTemplateArtifact(document, projectId, dataset) {
  const html = getCodeValue(document.htmlTemplate?.html);
  const customCss = getCodeValue(document.htmlTemplate?.customCss);
  if (!html) {
    throw new Error("Template HTML is empty.");
  }
  const issues = [];
  if (containsForbiddenPattern(html, forbiddenHtmlPatterns)) {
    issues.push("Template HTML contains forbidden tags or attributes.");
  }
  if (customCss && containsForbiddenPattern(customCss, forbiddenCssPatterns)) {
    issues.push("Template CSS contains forbidden rules.");
  }
  const assetMap = buildAssetMap(projectId, dataset, document.htmlTemplate?.templateImages);
  const processedHtml = replaceTemplateAssets(normalizeTemplateHtml(html), assetMap, issues);
  const processedCss = replaceTemplateAssets(customCss, assetMap, issues);
  if (issues.length > 0) {
    throw new Error(issues.join("\n"));
  }
  const compiledCss = await compileTemplateCss(processedHtml, processedCss);
  const finalHtml = [
    "<!DOCTYPE html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    "<style>",
    compiledCss,
    "</style>",
    "</head>",
    "<body>",
    processedHtml,
    "</body>",
    "</html>"
  ].join("");
  return {
    html: finalHtml,
    signature: hashTemplateContent(finalHtml)
  };
}
const handler = documentEventHandler(async ({ context, event }) => {
  const document = event.data;
  if (!document || document._type !== "solution" || document.detailRenderMode !== "htmlTemplate") {
    return;
  }
  const client = createClient({
    ...context.clientOptions,
    apiVersion: "2025-02-19",
    useCdn: false
  });
  try {
    const artifact = await renderTemplateArtifact(
      document,
      context.clientOptions.projectId,
      context.clientOptions.dataset
    );
    if (document.htmlTemplate?.renderedHtml === artifact.html && document.htmlTemplate?.renderedSignature === artifact.signature && document.htmlTemplate?.renderStatus === "ready") {
      return;
    }
    await client.patch(document._id).set({
      htmlTemplate: {
        ...document.htmlTemplate,
        renderedHtml: artifact.html,
        renderedSignature: artifact.signature,
        renderedAt: (/* @__PURE__ */ new Date()).toISOString(),
        renderStatus: "ready",
        renderError: ""
      }
    }).commit();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown template rendering error.";
    if (document.htmlTemplate?.renderStatus === "failed" && document.htmlTemplate?.renderError === message) {
      return;
    }
    await client.patch(document._id).set({
      htmlTemplate: {
        ...document.htmlTemplate,
        renderedHtml: "",
        renderedSignature: "",
        renderedAt: (/* @__PURE__ */ new Date()).toISOString(),
        renderStatus: "failed",
        renderError: message
      }
    }).commit();
    throw error;
  }
});
export {
  handler
};
//# sourceMappingURL=index.js.map
