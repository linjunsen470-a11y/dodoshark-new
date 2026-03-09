export type SharedBackgroundVariant = 'default' | 'muted' | 'dark'

type SharedBackgroundTheme = {
  section: string
  heading: string
  subtitle: string
  body: string
}

const sharedBackgroundThemes: Record<SharedBackgroundVariant, SharedBackgroundTheme> = {
  default: {
    section: 'bg-white',
    heading: 'text-slate-900',
    subtitle: 'text-slate-500',
    body: 'text-slate-600',
  },
  muted: {
    section: 'bg-slate-50',
    heading: 'text-slate-900',
    subtitle: 'text-slate-500',
    body: 'text-slate-600',
  },
  dark: {
    section: 'bg-slate-800',
    heading: 'text-white',
    subtitle: 'text-slate-300',
    body: 'text-slate-300',
  },
}

export function getSharedBackgroundTheme(variant: SharedBackgroundVariant = 'default') {
  return sharedBackgroundThemes[variant]
}

export type FeatureListBackgroundStyle = 'white' | 'lightGray' | 'darkGray'

export function mapFeatureBackgroundStyleToVariant(
  style: FeatureListBackgroundStyle = 'white',
): SharedBackgroundVariant {
  if (style === 'lightGray') return 'muted'
  if (style === 'darkGray') return 'dark'
  return 'default'
}
