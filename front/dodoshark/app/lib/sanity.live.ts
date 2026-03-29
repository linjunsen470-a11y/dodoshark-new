import {defineLive} from 'next-sanity/live'
import type {ClientPerspective, QueryParams} from 'next-sanity'

import {client} from '@/app/lib/sanity'
import {sanityReadToken} from '@/app/lib/sanity.token'

export const {sanityFetch, SanityLive} = defineLive({
  client,
  serverToken: sanityReadToken,
  browserToken: sanityReadToken,
})

type FetchSanityDataOptions = {
  query: string
  params?: QueryParams
  perspective?: Exclude<ClientPerspective, 'raw'>
  stega?: boolean
}

export async function fetchSanityData<T>({
  query,
  params,
  perspective,
  stega,
}: FetchSanityDataOptions) {
  const {data} = await sanityFetch({
    query,
    params,
    perspective,
    stega,
  })

  return data as T
}
