import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
    projectId: 'nljl95h9',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: Parameters<typeof builder.image>[0]) {
    return builder.image(source)
}
