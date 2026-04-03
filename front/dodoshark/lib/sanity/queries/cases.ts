import { defineQuery } from 'next-sanity'

import { imageProjectionFull } from '@/lib/sanity/queries/fragments/image'
import { seoProjection } from '@/lib/sanity/queries/fragments/seo'
import { slugProjection } from '@/lib/sanity/queries/fragments/slug'

export const caseMetadataQuery = defineQuery(/* groq */ `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    ${slugProjection},
    excerpt,
    ${seoProjection},
    coverImage {
      ${imageProjectionFull}
    }
  }
`)

export const caseDetailQuery = defineQuery(/* groq */ `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    ${slugProjection},
    excerpt,
    location,
    ${seoProjection},
    coverImage {
      ${imageProjectionFull}
    },
    clientLogo {
      alt,
      asset->{
        _id,
        url,
        metadata{
          dimensions{
            width,
            height
          }
        }
      }
    },
    tags[]->{
      _id,
      title,
      slug{
        current
      }
    },
    metrics[]{
      label,
      value
    },
    body[]{
      ...,
      _type == "image" => {
        ${imageProjectionFull}
      }
    },
    usedEquipment[]->{
      _id,
      title,
      modelName,
      ${slugProjection},
      shortDescription,
      description,
      excerpt,
      "image": coalesce(mainImage, image, coverImage, heroImage){
        ${imageProjectionFull}
      }
    }
  }
`)
