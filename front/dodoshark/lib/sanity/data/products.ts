import { cache } from 'react'

import { fetchSanityData } from '@/lib/sanity.live'
import {
  productDetailQuery,
  productLandingMetadataQuery,
  productMetadataQuery,
  productsPageQuery,
} from '@/lib/sanity/queries/products'

export const getProductsLandingMetadata = cache(async <T>() => {
  return fetchSanityData<T | null>({
    query: productLandingMetadataQuery,
    stega: false,
  })
})

export const getProductsPageData = cache(async <T>(category: string, stega?: boolean) => {
  return fetchSanityData<T>({
    query: productsPageQuery,
    params: { category },
    stega,
  })
})

export const getProductMetadataBySlug = cache(async <T>(slug: string) => {
  return fetchSanityData<T | null>({
    query: productMetadataQuery,
    params: { slug },
    stega: false,
  })
})

export const getProductDetailBySlug = cache(async <T>(slug: string, stega?: boolean) => {
  return fetchSanityData<T | null>({
    query: productDetailQuery,
    params: { slug },
    stega,
  })
})
