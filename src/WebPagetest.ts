import Utils = require('./Utils')
import 'core-js/modules/es6.array.fill'

class WebPagetest {
  /**
   * @param {type}	key - runTest するときは必須。
   * @param {type}	server - 省略すれば www.webpagetest.org
   */
  constructor(
    private key?: string,
    private server: string = 'https://www.webpagetest.org',
  ) {}

  /**
   * WebPagetest 実行
   *
   * @param {type}	url - this is the parameter url
   * @param {type}	options - this is the parameter options
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
   * @param {type}	testId - this is the parameter testId
   *
   * @return {Object} responsedata
   */
  public getTestResults(testId) {
    const statusCode = this.getTestStatus(testId)

    if (statusCode !== 200) {
      return new Array(15).fill('')
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
      Utils.convertToSeconds(firstByte),
      Utils.convertToSeconds(firstLayout),
      Utils.convertToSeconds(firstPaint),
      Utils.convertToSeconds(firstContentfulPaint),
      Utils.convertToSeconds(firstMeaningfulPaint),
      Utils.convertToSeconds(speedIndex),
      Utils.convertToSeconds(domInteractive),
      Utils.convertToSeconds(loadTime),
      Utils.convertToSeconds(visualComplete),
      Utils.convertToSeconds(fullyLoaded),
      Utils.convertToSeconds(timeToInteractive),
      summary,
    ]
  }

  public test = this.runTest
  public results = this.getTestResults

  /**
   * WebPagetest 実行用 URL 生成
   *
   * @param {type}	url - 必須。
   * @param {type}	options - 省略可能。
   *
   * @return {String} URL
   */
  private generateRunTestURL(url: string, options: Options = {}): string {
    return (
      `${this.server}/runtest.php` +
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
    )
  }

  private generateTestStatusURL(testId: string) {
    return `${this.server}/testStatus.php?f=json&test=${testId}`
  }

  /**
   * WebPagetest 実行結果用 URL 生成
   *
   * @param {type}	testId - this is the parameter testId
   *
   * @return {String} URL
   */
  private generateTestResultsURL(testId: string) {
    return `${this.server}/jsonResult.php?test=${testId}&pagespeed=1`
  }
}

export = WebPagetest
