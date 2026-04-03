import { defineQuery } from 'next-sanity'

import { categoryProjection } from '@/lib/sanity/queries/fragments/category'
import { imageProjectionFull, imageProjectionLite } from '@/lib/sanity/queries/fragments/image'
import { pageBuilderBlockProjection } from '@/lib/sanity/queries/fragments/pageBuilder'
import { productCardProjection } from '@/lib/sanity/queries/fragments/references'
import { seoProjection } from '@/lib/sanity/queries/fragments/seo'
import { slugProjection } from '@/lib/sanity/queries/fragments/slug'

export const productLandingMetadataQuery = defineQuery(/* groq */ `
  coalesce(
    *[_id == "productPage"][0],
    *[_type == "productPage"][0]
  ) {
    ${seoProjection}
  }
`)

export const productsPageQuery = defineQuery(/* groq */ `
  {
    "landing": coalesce(
      *[_id == "productPage"][0],
      *[_type == "productPage"][0]
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
      productCategories[]->{
        ${categoryProjection}
      }
    },
    "items": *[
      _type == "product"
      && defined(slug.current)
      && ($category == "" || category->slug.current == $category)
    ] | order(_createdAt desc) {
      ${productCardProjection}
    },
    "fallbackCategories": *[_type == "category"] | order(title asc) {
      ${categoryProjection}
    }
  }
`)

export const productMetadataQuery = defineQuery(/* groq */ `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    ${seoProjection},
    title,
    shortDescription,
    ${slugProjection},
    mainImage {
      ${imageProjectionFull}
    }
  }
`)

export const productDetailQuery = defineQuery(/* groq */ `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    ${seoProjection},
    title,
    seriesTag,
    shortDescription,
    ${slugProjection},
    mainImage {
      ${imageProjectionFull}
    },
    contentBlocks[] {
      ${pageBuilderBlockProjection}
    }
  }
`)
