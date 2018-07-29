import WebPagetest = require('./WebPagetest')
import Utils = require('./Utils')

export const runTest = (): void => {
  const key = process.env.WEBPAGETEST_API_KEY
  if (!key) {
    throw new Error('should define WEBPAGETEST_API_KEY in .env')
  }
  const url = process.env.RUN_TEST_URL
  if (!url) {
    throw new Error('should define RUN_TEST_URL in .env')
  }
  const sheetName = process.env.SHEET_NAME
  if (!sheetName) {
    throw new Error('should define SHEET_NAME in .env')
  }
  // Optional
  const runs = Utils.parseNumberValue(process.env.WEBPAGETEST_OPTIONS_RUNS)
  const location = process.env.WEBPAGETEST_OPTIONS_LOCATION
  const fvonly = Utils.parseNumberValue(process.env.WEBPAGETEST_OPTIONS_FVONLY)
  const video = Utils.parseNumberValue(process.env.WEBPAGETEST_OPTIONS_VIDEO)
  const noOptimization = Utils.parseNumberValue(process.env.WEBPAGETEST_OPTIONS_NO_OPTIMIZATION)
  const mobile = Utils.parseNumberValue(process.env.WEBPAGETEST_OPTIONS_MOBILE)
  const mobileDevice = process.env.WEBPAGETEST_OPTIONS_MOBILE_DEVICE
  const lighthouse = Utils.parseNumberValue(process.env.WEBPAGETEST_OPTIONS_LIGHTHOUSE)
  const script = process.env.WEBPAGETEST_OPTIONS_SCRIPT_CODE
  const wpt = new WebPagetest(key)
  const testId = wpt.test(url, {
    runs,
    location,
    fvonly,
    video,
    // format: JSON for getTestResults
    format: 'JSON',
    noOptimization,
    mobile,
    mobileDevice,
    lighthouse,
    script,
  })

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  if (!activeSpreadsheet) {
    throw new Error('Not found active spreadsheet')
  }
  const sheet = activeSpreadsheet.getSheetByName(sheetName)
  if (!sheet) {
    throw new Error(`Not found sheet by name:${sheetName}`)
  }
  const lastRow = sheet.getLastRow()
  const targetCell = sheet.getRange(lastRow + 1, 1)

  targetCell.setValue(testId)
}
