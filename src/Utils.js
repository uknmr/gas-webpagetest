export default class Utils {
  static getLastRow(sheet, row) {
    return sheet.getRange(`${row}:${row}`)
      .getValues()
      .filter(String)
      .length
  }

  static fetchRequest(url) {
    const response = UrlFetchApp.fetch(url)
    return JSON.parse(response.getContentText())
  }

  static convertToSeconds(millisecond, digits = 2) {
    return (millisecond / 1000).toFixed(digits)
  }
}
