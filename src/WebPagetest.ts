import * as queryString from 'query-string'
import Utils = require('./Utils')
import 'core-js/modules/es6.array.fill'

class WebPagetest {
  /**
   * @param {type}    key - runTest するときは必須。
   * @param {type}    server - 省略すれば www.webpagetest.org
   */
  constructor(private key?: string, private server: string = 'https://www.webpagetest.org') {}

  /**
   * WebPagetest 実行
   *
   * @param {type}    url - this is the parameter url
   * @param {type}    options - this is the parameter options
   *
   * @return {} testId
   */
  public runTest(url: string, options?: Options): string {
    const requestURL = this.generateRunTestURL(url, options)
    const {
      data: { testId },
    } = Utils.fetch(requestURL)

    return testId
  }

  public getTestStatus(testId: string): number {
    const {
      data: { statusCode },
    } = Utils.fetch(this.generateTestStatusURL(testId))

    return statusCode
  }

  /**
   * テスト結果取得
   *
   * @param {type}    testId - this is the parameter testId
   *
   * @return {Object} responsedata
   */
  public getTestResults(testId) {
    // 空文字は無視する
    if (testId.length === 0) {
      return new Array(27).fill('')
    }
    const statusCode = this.getTestStatus(testId)

    if (statusCode !== 200) {
      return new Array(27).fill('')
    }

    const requestURL = this.generateTestResultsURL(testId)
    const {
      data: {
        completed,
        median: {
          firstView: {
            TTFB: firstByte,
            firstLayout,
            firstPaint,
            firstContentfulPaint,
            firstMeaningfulPaint,
            SpeedIndex: speedIndex,
            domInteractive,
            loadTime,
            visualComplete,
            fullyLoaded,
            'lighthouse.Performance.interactive': timeToInteractive,
            breakdown,
          },
        },
        summary,
      },
    } = Utils.fetch(requestURL)
    const date = new Date(completed * 1000)

    return [
      completed,
      Utilities.formatDate(date, 'GMT+9', 'yyyyMMddHH'),
      Utilities.formatDate(date, 'GMT+9', 'yyyyMMdd'),
      Utils.transform(firstByte),
      Utils.transform(firstLayout),
      Utils.transform(firstPaint),
      Utils.transform(firstContentfulPaint),
      Utils.transform(firstMeaningfulPaint),
      Utils.transform(speedIndex),
      Utils.transform(domInteractive),
      Utils.transform(loadTime),
      Utils.transform(visualComplete),
      Utils.transform(fullyLoaded),
      Utils.transform(timeToInteractive),
      Utils.transform(breakdown.html.bytes, 1),
      breakdown.html.requests,
      Utils.transform(breakdown.js.bytes, 1),
      breakdown.js.requests,
      Utils.transform(breakdown.css.bytes, 1),
      breakdown.css.requests,
      Utils.transform(breakdown.image.bytes, 1),
      breakdown.image.requests,
      Utils.transform(breakdown.font.bytes, 1),
      breakdown.font.requests,
      Utils.transform(breakdown.other.bytes, 1),
      breakdown.other.requests,
      summary,
    ]
  }

  public test = this.runTest
  public results = this.getTestResults

  /**
   * WebPagetest 実行用 URL 生成
   *
   * @param {type}    url - 必須。
   * @param {type}    options - 省略可能。
   *
   * @return {String} URL
   */
  public generateRunTestURL(url: string, options: Options = {}): string {
    const apiEndpoint = `${this.server}/runtest.php`
    const query =
      `?url=${encodeURIComponent(url)}` +
      `&location=${options.location || 'ec2-ap-northeast-1.3GFast'}` +
      `&runs=${options.runs || 1}` +
      `&fvonly=${options.fvonly || 1}` +
      `&video=${options.video || 1}` +
      `&f=${options.format || 'JSON'}` +
      `&noopt=${options.noOptimization || 1}` +
      `&k=${this.key}` +
      `&mobile=${options.mobile || 1}` +
      `&mobileDevice=${options.mobileDevice || 'Pixel'}` +
      `&lighthouse=${options.lighthouse || 1}`
    return apiEndpoint + query
  }

  private generateTestStatusURL(testId: string) {
    return `${this.server}/testStatus.php?f=json&test=${testId}`
  }

  /**
   * WebPagetest 実行結果用 URL 生成
   *
   * @param {type}    testId - this is the parameter testId
   *
   * @return {String} URL
   */
  private generateTestResultsURL(testId: string) {
    return `${this.server}/jsonResult.php?test=${testId}&pagespeed=1`
  }
}

export = WebPagetest
