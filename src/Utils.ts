class Utils {
  public static fetch(url: string) {
    const response = UrlFetchApp.fetch(url)
    return JSON.parse(response.getContentText())
  }

  public static getLastRow(sheet, row) {
    return sheet
      .getRange(`${row}:${row}`)
      .getValues()
      .filter(String).length
  }

  public static transform(value, digits = 2) {
    return (value / 1000).toFixed(digits)
  }
}

export = Utils
