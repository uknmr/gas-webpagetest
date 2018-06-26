declare var process: {
  env: {
    WEBPAGETEST_API_KEY: string
    RUN_TEST_URL: string
    GET_RESULTS_URL: string
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
