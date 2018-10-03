declare namespace NodeJS {
  // extends process.env
  interface ProcessEnv {
    WEBPAGETEST_API_KEY?: string
    RUN_TEST_URL?: string
    RUN_TEST_INTERVAL?: string
    SHEET_NAME?: string
    NETWORK_ERROR_REPORT?: string
    WEBPAGETEST_OPTIONS_RUNS?: string
    WEBPAGETEST_OPTIONS_LOCATION?: string
    WEBPAGETEST_OPTIONS_FVONLY?: string
    WEBPAGETEST_OPTIONS_VIDEO?: string
    WEBPAGETEST_OPTIONS_NO_OPTIMIZATION?: string
    WEBPAGETEST_OPTIONS_MOBILE?: string
    WEBPAGETEST_OPTIONS_MOBILE_DEVICE?: string
    WEBPAGETEST_OPTIONS_LIGHTHOUSE?: string
    WEBPAGETEST_OPTIONS_SCRIPT_CODE?: string
  }

  // extends global
  export interface Global {
    runTest: () => void
    getTestResults: () => void
    setRunTestTimeTriggers: () => void
    updateColumnTitles: () => void
    onOpen: () => void
  }
}

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
  script: string
}>
