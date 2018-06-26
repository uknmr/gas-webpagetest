import WebPagetest = require('./WebPagetest')
import Utils = require('./Utils')

global.getTestResults = () => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()!.getActiveSheet()
  const lastTestIdRow = Utils.getLastRow(sheet, 'A')
  const lastCompletedRow = Utils.getLastRow(sheet, 'B')
  const testIds = sheet
    .getRange(`A${lastCompletedRow + 1}:A${lastTestIdRow}`)
    .getValues()
    .reduce((a, b) => a.concat(b))

  if (!testIds.length) {
    Logger.log('対象 testId はありませんでした')
    return
  }

  const wpt = new WebPagetest()
  const results = testIds.map(testId => wpt.results(testId))

  const targetRange = sheet.getRange(
    lastCompletedRow + 1,
    2,
    results.length,
    results[0].length,
  )
  targetRange.setValues(results)
}
