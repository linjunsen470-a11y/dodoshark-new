import studio from '@sanity/eslint-config-studio'

export default [
  ...studio,
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
  },
]
