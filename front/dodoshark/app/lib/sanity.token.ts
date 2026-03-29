export const sanityReadToken = process.env.SANITY_API_READ_TOKEN?.trim()

export function getSanityReadToken() {
  if (!sanityReadToken) {
    throw new Error('Missing SANITY_API_READ_TOKEN')
  }

  return sanityReadToken
}
