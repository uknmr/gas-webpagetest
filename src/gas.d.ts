declare var process: {
  env: {
    WEBPAGETEST_API_KEY: string
    RUN_TEST_URL: string
    SHEET_NAME: string
    WEBPAGETEST_OPTIONS_RUNS: string
  }
}

declare var global: any

declare type Options = Partial<{
  location: string
  runs: number
  fvonly: number
  video: number
  format: string
  noOptimization: number
  mobile: number
  mobileDevice: string
  lighthouse: number
}>
