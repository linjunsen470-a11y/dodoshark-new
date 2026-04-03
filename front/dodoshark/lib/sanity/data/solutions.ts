import { cache } from 'react'

import { fetchSanityData } from '@/lib/sanity.live'
import {
  solutionDetailQuery,
  solutionMetadataQuery,
  solutionsLandingMetadataQuery,
  solutionsPageQuery,
} from '@/lib/sanity/queries/solutions'

export const getSolutionsLandingMetadata = cache(async <T>() => {
  return fetchSanityData<T | null>({
    query: solutionsLandingMetadataQuery,
    stega: false,
  })
})

export const getSolutionsPageData = cache(async <T>(category: string, stega?: boolean) => {
  return fetchSanityData<T>({
    query: solutionsPageQuery,
    params: { category },
    stega,
  })
})

export const getSolutionMetadataBySlug = cache(async <T>(slug: string) => {
  return fetchSanityData<T | null>({
    query: solutionMetadataQuery,
    params: { slug },
    stega: false,
  })
})

export const getSolutionDetailBySlug = cache(async <T>(slug: string, stega?: boolean) => {
  return fetchSanityData<T | null>({
    query: solutionDetailQuery,
    params: { slug },
    stega,
  })
})
