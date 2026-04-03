import { defineQuery } from 'next-sanity'

import { categoryProjection } from '@/lib/sanity/queries/fragments/category'
import { imageProjectionFull, imageProjectionLite } from '@/lib/sanity/queries/fragments/image'
import { pageBuilderBlockProjection } from '@/lib/sanity/queries/fragments/pageBuilder'
import { solutionCardProjection } from '@/lib/sanity/queries/fragments/references'
import { seoProjection } from '@/lib/sanity/queries/fragments/seo'
import { slugProjection } from '@/lib/sanity/queries/fragments/slug'

export const solutionsLandingMetadataQuery = defineQuery(/* groq */ `
  coalesce(
    *[_id == "solutionsPage"][0],
    *[_type == "solutionsPage"][0]
  ) {
    ${seoProjection}
  }
`)

export const solutionsPageQuery = defineQuery(/* groq */ `
  {
    "landing": coalesce(
      *[_id == "solutionsPage"][0],
      *[_type == "solutionsPage"][0]
    ) {
      ${seoProjection},
      hero {
        badge,
        title,
        subtitle,
        image {
          ${imageProjectionLite}
        }
      },
      solutionCategories[]->{
        ${categoryProjection}
      }
    },
    "items": *[
      _type == "solution"
      && defined(slug.current)
      && ($category == "" || category->slug.current == $category)
    ] | order(_createdAt desc) {
      ${solutionCardProjection}
    },
    "fallbackCategories": *[_type == "category"] | order(title asc) {
      ${categoryProjection}
    }
  }
`)

export const solutionMetadataQuery = defineQuery(/* groq */ `
  *[_type == "solution" && slug.current == $slug][0] {
    _id,
    ${seoProjection},
    title,
    ${slugProjection},
    summary,
    heroImage {
      ${imageProjectionFull}
    }
  }
`)

export const solutionDetailQuery = defineQuery(/* groq */ `
  *[_type == "solution" && slug.current == $slug][0] {
    _id,
    ${seoProjection},
    title,
    ${slugProjection},
    summary,
    detailRenderMode,
    htmlTemplate {
      renderedHtml,
      renderedSignature,
      renderedAt,
      renderStatus,
      renderError
    },
    category -> {
      ${categoryProjection}
    },
    heroImage {
      ${imageProjectionFull}
    },
    contentBlocks[] {
      ${pageBuilderBlockProjection}
    },
    relatedProducts[]->{
      _id,
      _type,
      title,
      name,
      modelName,
      ${slugProjection},
      shortDescription,
      mainImage {
        ${imageProjectionFull}
      }
    },
    relatedVlogs[]->{
      _id,
      title,
      excerpt,
      youtubeUrl,
      thumbnail {
        ${imageProjectionFull}
      },
      category->{
        title
      }
    }
  }
`)
