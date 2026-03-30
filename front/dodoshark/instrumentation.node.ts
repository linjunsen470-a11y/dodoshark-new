import {EnvHttpProxyAgent, setGlobalDispatcher} from 'undici'

const PROXY_ENV_KEYS = [
  'HTTP_PROXY',
  'HTTPS_PROXY',
  'ALL_PROXY',
  'http_proxy',
  'https_proxy',
  'all_proxy',
] as const

declare global {
  var __dodosharkEnvProxyInitialized: boolean | undefined
}

function hasProxyConfig() {
  return PROXY_ENV_KEYS.some((key) => Boolean(process.env[key]?.trim()))
}

if (!globalThis.__dodosharkEnvProxyInitialized && hasProxyConfig()) {
  // Route Sanity server fetches through the same local proxy the browser already uses.
  setGlobalDispatcher(new EnvHttpProxyAgent())
  globalThis.__dodosharkEnvProxyInitialized = true
}
