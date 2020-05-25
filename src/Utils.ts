class Utils {
  public static fetch(url: string) {
    const response = UrlFetchApp.fetch(url)
    return JSON.parse(response.getContentText())
  }

  public static getLastRow(sheet, column) {
    const targetColumnRange = sheet.getRange(`${column}:${column}`)
    const lowermostCell = sheet.getRange(
      targetColumnRange.getLastRow(),
      targetColumnRange.getColumn()
    )
    if (lowermostCell.getValue()) {
      return lowermostCell.getRow()
    } else {
      return lowermostCell.getNextDataCell(SpreadsheetApp.Direction.UP).getRow()
    }
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

  /**
   * Parse value as boolean number
   * true: 1
   * false: 0
   */
  public static parseBooleanNumberValue(value?: string): boolean {
    if (!value) {
      return false
    }
    if (value !== '0' && value !== '1') {
      throw new Error(`This value should be "0" or "1": ${value}`)
    }
    const numberValue = Number(value)
    if (isNaN(numberValue)) {
      throw new Error(`This value can not be parsed as number: ${value}`)
    }
    return numberValue === 1
  }

  /**
   * Parse time formatted value and return { type, value }
   * Accept format: <value><unit>
   *   - <value>: number
   *   - <unit>: `h` or `m`
   */
  public static parseTimeFormat(
    value?: string
  ): { type: 'HOUR' | 'MINUTE'; value: number } | Error {
    if (!value) {
      return new Error('value is undefined')
    }
    const TIME_FORMATS: { type: 'HOUR' | 'MINUTE'; pattern: RegExp }[] = [
      {
        type: 'HOUR',
        pattern: /^(\d+)h$/,
      },
      {
        type: 'MINUTE',
        pattern: /^(\d+)m$/,
      },
    ]
    for (let i = 0; i < TIME_FORMATS.length; i++) {
      const format = TIME_FORMATS[i]
      if (format.pattern.test(value)) {
        const match = value.match(format.pattern)
        if (!match) {
          throw new Error(`Does not parsed value: ${value}`)
        }
        return {
          type: format.type,
          value: Number(match[1]),
        }
      }
    }
    return new Error(`Does not parsed value: ${value}`)
  }
}

export = Utils
