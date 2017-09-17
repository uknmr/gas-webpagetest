import WebPagetest from './WebPagetest'
import Utils from './Utils'

global.runWebPagetest = (key, url) => {
  const wpt = new WebPagetest(key)
  const testId = wpt.runTest(url)

  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = activeSpreadSheet.getSheets()[0]
  const lastARow = Utils.getLastRow(sheet, 'A')

  sheet.getRange('A' + (lastARow + 1)).setValue(testId)
}
