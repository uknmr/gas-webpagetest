import WebPagetest from './WebPagetest'
import Utils from './Utils'

global.getTestResults = () => {
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet()

  activeSpreadSheet.getSheets().forEach(sheet => {
    const lastTestIdRow = Utils.getLastRow(sheet, 'A')
    const lastCompletedRow = Utils.getLastRow(sheet, 'B')
    const testIds = sheet.getRange(`A${lastCompletedRow + 1}:A${lastTestIdRow}`)
      .getValues()
      .reduce((a, b) => a.concat(b))

    if (!testIds.length) {
      Logger.log('対象 testId はありませんでした')
      return
    }

    const wpt = new WebPagetest()
    const results = testIds.map(testId => wpt.getTestResults(testId))

    const targetRange = sheet.getRange(
      lastCompletedRow + 1,
      2,
      results.length,
      results[0].length,
    )
    targetRange.setValues(results)
  })
}
