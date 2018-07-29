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

  /**
   * valueを数値としてパースしnumberを返す
   * 空文字や引数が空の場合はundefinedを返す
   * パースできない値は例外を投げる
   * @param value
   */
  public static parseNumberValue(value?: string): number | undefined {
    if (!value) {
      return undefined
    }
    const numberValue = Number(value)
    if (isNaN(numberValue)) {
      throw new Error(`This value can not be parsed as number: ${value}`)
    }
    return numberValue
  }
}

export = Utils
