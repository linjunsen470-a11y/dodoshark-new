import {defineEnableDraftMode} from 'next-sanity/draft-mode'

import {client} from '@/app/lib/sanity'
import {getSanityReadToken} from '@/app/lib/sanity.token'

export const {GET} = defineEnableDraftMode({
  client: client.withConfig({
    token: getSanityReadToken(),
    useCdn: false,
  }),
})
