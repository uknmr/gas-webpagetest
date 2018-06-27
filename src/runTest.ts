import WebPagetest = require('./WebPagetest')

global.runTest = (): void => {
  const key = process.env.WEBPAGETEST_API_KEY
  const url = process.env.RUN_TEST_URL
  const sheetName = process.env.SHEET_NAME
  const wpt = new WebPagetest(key)
  const testId = wpt.test(url, { runs: 3 })

  const sheet = SpreadsheetApp.getActiveSpreadsheet()!.getSheetByName(sheetName)
  const lastRow = sheet.getLastRow()
  const targetCell = sheet.getRange(lastRow + 1, 1)

  targetCell.setValue(testId)
}
