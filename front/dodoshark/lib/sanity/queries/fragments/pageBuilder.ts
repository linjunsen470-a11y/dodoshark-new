import { imageProjectionFull } from '@/lib/sanity/queries/fragments/image'
import {
  referencedGenericProjection,
  referencedProductProjection,
} from '@/lib/sanity/queries/fragments/references'

export const portableImageProjection = /* groq */ `
  ...,
  asset
`

export const pageBuilderBlockProjection = /* groq */ `
  ...,
  backgroundImage {
    ${imageProjectionFull}
  },
  media {
    ${imageProjectionFull}
  },
  referenceImage {
    ${imageProjectionFull}
  },
  mediaItems[] {
    ...,
    image {
      ${imageProjectionFull}
    }
  },
  images[] {
    ${imageProjectionFull}
  },
  items[] {
    ...,
    icon {
      ${imageProjectionFull}
    },
    image {
      ${imageProjectionFull}
    },
    logo {
      ${imageProjectionFull}
    },
    videoThumbnail {
      ${imageProjectionFull}
    }
  },
  footerCta {
    ...
  },
  videos[] {
    ...,
    thumbnail {
      ${imageProjectionFull}
    }
  },
  content[] {
    ...,
    _type == "image" => {
      ${portableImageProjection}
    },
    _type == "productReference" => {
      ...,
      titleOverride,
      product->{
        ${referencedGenericProjection}
      }
    }
  },
  references[] {
    ...,
    reference->{
      ${referencedGenericProjection}
    }
  },
  enableBannerOverlap,
  bannerImage {
    ${imageProjectionFull}
  },
  bannerOverlayColor,
  groups[] {
    ...,
    items[] {
      ...,
      productVariant->{
        ${referencedProductProjection}
      }
    }
  },
  defaultGroupIndex,
  maxItemsPerRow,
  showModelDescription,
  footerText,
  rows[] {
    ...,
    cards[] {
      ...,
      reference->{
        ${referencedGenericProjection}
      },
      inlineCard {
        ...,
        image {
          ${imageProjectionFull}
        }
      }
    }
  }
`
