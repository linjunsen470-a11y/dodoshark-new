import { defineQuery } from 'next-sanity'

import { imageProjectionLite } from '@/lib/sanity/queries/fragments/image'
import { caseCardProjection, productCardProjection, solutionCardProjection } from '@/lib/sanity/queries/fragments/references'
import { seoProjection } from '@/lib/sanity/queries/fragments/seo'


export const homeMetadataQuery = defineQuery(/* groq */ `
  coalesce(
    *[_type == "homePage" && _id == "homePage"][0],
    *[_type == "homePage"][0]
  ) {
    ${seoProjection}
  }
`)

export const homePageQuery = defineQuery(/* groq */ `
  coalesce(
    *[_type == "homePage" && _id == "homePage"][0],
    *[_type == "homePage"][0]
  ) {
    ${seoProjection},
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroBackgrounds[] {
      ${imageProjectionLite}
    },
    stats[]{
      label,
      value,
      suffix
    },
    aboutFeatures[]{
      title,
      description,
      image {
        ${imageProjectionLite}
      }
    },
    confidenceSection{
      titleLineOne,
      titleLineTwo,
      description,
      cards[]{
        title,
        subtitle,
        points,
        image {
          ${imageProjectionLite}
        }
      }
    },
    featuredAgriProducts[]->{
      ${productCardProjection}
    },
    featuredFoodProducts[]->{
      ${productCardProjection}
    },
    featuredSolutions[]->{
      ${solutionCardProjection}
    },
    featuredCases[]->{
      ${caseCardProjection}
    },
    advantagesSection{
      title,
      items[]{
        title,
        description,
        image {
          ${imageProjectionLite}
        }
      }
    },
    featuredHomeVideos[]->{
      _id,
      title,
      youtubeUrl,
      publishedAt,
      status,
      coverImage {
        ${imageProjectionLite}
      },
      tags[]->{
        title
      }
    },
    whyChooseUsVideoUrl,
    whyChooseUsVideoCoverImage {
      ${imageProjectionLite}
    },
    productsBannerImage {
      ${imageProjectionLite}
    },
    solutionsBackgroundImage {
      ${imageProjectionLite}
    },
    aboutUsLogoImage {
      ${imageProjectionLite}
    }
  }
`)
