// Use bracket notation to prevent Webpack statically inlining undefined at build time
export const sanityReadToken = process.env['SANITY_API_READ_TOKEN']?.trim()

export function getSanityReadToken() {
  if (!sanityReadToken) {
    console.warn('Missing SANITY_API_READ_TOKEN. Visual editing will be disabled.')
  }

  return sanityReadToken
}
