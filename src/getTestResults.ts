import WebPagetest = require('./WebPagetest')
import Utils = require('./Utils')

export const getTestResults = () => {
  const sheetName = process.env.SHEET_NAME
  if (!sheetName) {
    throw new Error('should define SHEET_NAME in .env')
  }
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  if (!activeSpreadsheet) {
    throw new Error('Not found active spreadsheet')
  }
  const sheet = activeSpreadsheet.getSheetByName(sheetName)
  if (!sheet) {
    throw new Error(`Not found sheet by name:${sheetName}`)
  }
  const lastTestIdRow = Utils.getLastRow(sheet, 'A')
  const lastCompletedRow = Utils.getLastRow(sheet, 'B')
  const testIds = sheet
    .getRange(`A${lastCompletedRow + 1}:A${lastTestIdRow}`)
    .getValues()
    .reduce((a, b) => a.concat(b), [])

  if (!testIds.length) {
    Logger.log('対象 testId はありませんでした')
    return
  }

  const wpt = new WebPagetest()
  const results = testIds.map(testId => wpt.results(testId))

  const targetRange = sheet.getRange(lastCompletedRow + 1, 2, results.length, results[0].length)
  targetRange.setValues(results)
}
