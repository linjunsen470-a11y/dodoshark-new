import { cache } from 'react'

import { fetchSanityData } from '@/lib/sanity.live'
import { homeMetadataQuery, homePageQuery } from '@/lib/sanity/queries/home'

export const getHomeMetadataData = cache(async <T>() => {
  try {
    return await fetchSanityData<T | null>({
      query: homeMetadataQuery,
      stega: false,
    })
  } catch {
    return null
  }
})

export const getHomePageData = cache(async <T>(preview = false) => {
  try {
    return await fetchSanityData<T | null>({
      query: homePageQuery,
      stega: preview ? undefined : false,
    })
  } catch {
    return null
  }
})
