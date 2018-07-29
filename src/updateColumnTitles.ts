import WebPagetest = require('./WebPagetest')

global.updateColumnTitles = (): void => {
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
  const firstRange = sheet.getRange(1, 1, 1, 1)
  const firstCellValue = firstRange.getValue()
  const FIRST_CELL_COLUMN_TITLE = 'testId'
  if (firstCellValue !== FIRST_CELL_COLUMN_TITLE) {
    // if have not column title, add new column at first row
    sheet.insertRowBefore(1)
  }
  // update column titles
  const wpt = new WebPagetest()
  const titles = [FIRST_CELL_COLUMN_TITLE].concat(wpt.generateTestResultNames())
  const targetRange = sheet.getRange(1, 1, 1, titles.length)
  targetRange.setValues([titles])
}
