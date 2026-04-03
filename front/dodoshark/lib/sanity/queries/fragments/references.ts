import { imageProjectionFull, imageProjectionLite } from '@/lib/sanity/queries/fragments/image'
import { slugProjection } from '@/lib/sanity/queries/fragments/slug'

export const referencedGenericProjection = /* groq */ `
  _id,
  _type,
  title,
  name,
  modelName,
  ${slugProjection},
  shortDescription,
  description,
  excerpt,
  mainImage {
    ${imageProjectionFull}
  },
  image {
    ${imageProjectionFull}
  },
  coverImage {
    ${imageProjectionFull}
  },
  heroImage {
    ${imageProjectionFull}
  }
`

export const referencedProductProjection = /* groq */ `
  _id,
  modelName,
  shortDescription,
  image {
    ${imageProjectionFull}
  }
`

export const productCardProjection = /* groq */ `
  _id,
  title,
  ${slugProjection},
  shortDescription,
  seriesTag,
  mainImage {
    ${imageProjectionLite}
  },
  category->{
    _id,
    title,
    slug {
      current
    }
  }
`

export const solutionCardProjection = /* groq */ `
  _id,
  title,
  ${slugProjection},
  summary,
  heroImage {
    ${imageProjectionLite}
  },
  category->{
    _id,
    title,
    slug {
      current
    }
  }
`

export const caseCardProjection = /* groq */ `
  _id,
  title,
  ${slugProjection},
  excerpt,
  coverImage {
    ${imageProjectionLite}
  },
  clientLogo {
    ${imageProjectionLite}
  }
`
