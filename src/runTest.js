import WebPagetest from './WebPagetest'
import Utils from './Utils'

global.runWebPagetest = (key, ...targets) => {
  const wpt = new WebPagetest(key)
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet()

  targets.forEach(({ url, sheetName, options }) => {
    const testId = wpt.runTest(url, options)

    const sheet = activeSpreadSheet.getSheetByName(sheetName)
    const lastARow = Utils.getLastRow(sheet, 'A')

    sheet.getRange('A' + (lastARow + 1)).setValue(testId)
  })
}
