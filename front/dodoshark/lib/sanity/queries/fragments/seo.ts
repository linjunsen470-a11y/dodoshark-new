export const seoProjection = /* groq */ `
  seo {
    title,
    description,
    keywords,
    canonicalUrl,
    noIndex,
    ogImage {
      ...,
      asset
    }
  }
`
