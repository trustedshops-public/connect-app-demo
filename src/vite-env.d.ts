/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_PROXY_API_URL: string
  readonly VITE_CONTROL_CENTER_STAGE: string
  readonly VITE_INTERNAL_URL: string
  readonly VITE_API_KEY: string
  readonly VITE_USE_MOCK_BASELAYER: string
  readonly VITE_AUTH_SERVICE_URL: string
  readonly VITE_WIDGETS_API_URL: string
  readonly VITE_CLIENT_ID: string
  readonly VITE_CLIENT_SECRET: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare type Nullable<T> = T | null

declare interface Window {
  eventsLib?: any
}
