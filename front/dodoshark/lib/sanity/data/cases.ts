import { cache } from 'react'

import { fetchSanityData } from '@/lib/sanity.live'
import { caseDetailQuery, caseMetadataQuery } from '@/lib/sanity/queries/cases'

export const getCaseMetadataBySlug = cache(async <T>(slug: string) => {
  try {
    return await fetchSanityData<T | null>({
      query: caseMetadataQuery,
      params: { slug },
      stega: false,
    })
  } catch (error) {
    console.error('Error fetching case study metadata:', error)
    return null
  }
})

export const getCaseDetailBySlug = cache(async <T>(slug: string, stega?: boolean) => {
  try {
    return await fetchSanityData<T | null>({
      query: caseDetailQuery,
      params: { slug },
      stega,
    })
  } catch (error) {
    console.error('Error fetching case study:', error)
    return null
  }
})
