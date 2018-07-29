import * as queryString from 'querystring'
import Utils = require('./Utils')
import 'core-js/modules/es6.array.fill'

type TestResult = {
  completed: number
  date: Date
  firstByte: number
  firstLayout: number
  firstPaint: number
  firstContentfulPaint: number
  firstMeaningfulPaint: number
  speedIndex: number
  domInteractive: number
  loadTime: number
  visualComplete: number
  fullyLoaded: number
  timeToInteractive: number
  breakdown: any
  summary: any
}

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
    const response = Utils.fetch(requestURL)
    return this.generateTestResultValues(this.convertWebPageResponseToResult(response))
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
    const query = queryString.stringify({
      ...{
        url: url,
        location: options.location || 'ec2-ap-northeast-1.3GFast',
        runs: options.runs !== undefined ? options.runs : 1,
        fvonly: options.fvonly !== undefined ? options.fvonly : 1,
        video: options.video !== undefined ? options.video : 1,
        f: options.format || 'JSON',
        noopt: options.noOptimization !== undefined ? options.noOptimization : 1,
        k: this.key,
        mobile: options.mobile !== undefined ? options.mobile : 1,
        mobileDevice: options.mobileDevice || 'Pixel',
        lighthouse: options.lighthouse !== undefined ? options.lighthouse : 1,
      },
      // omit script if does not pass options.script
      ...(options.script
        ? {
            script: options.script,
          }
        : {}),
    })
    return `${apiEndpoint}?${query}`
  }

  /**
   * WebPagetestのresponseからTestResultオブジェクトに変換します
   * @param response
   */
  public convertWebPageResponseToResult(response: any): TestResult {
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
    } = response

    const date = new Date(completed * 1000)
    return {
      completed,
      date,
      firstByte,
      firstLayout,
      firstPaint,
      firstContentfulPaint,
      firstMeaningfulPaint,
      speedIndex,
      domInteractive,
      loadTime,
      visualComplete,
      fullyLoaded,
      timeToInteractive,
      breakdown,
      summary,
    }
  }

  public generateTestResultNames() {
    return this.generateResultMapping().map(map => {
      return map.name
    })
  }

  public generateTestResultValues(result: TestResult) {
    return this.generateResultMapping().map(map => {
      return map.value(result)
    })
  }

  private generateResultMapping() {
    return [
      {
        name: 'completedTimeStamp',
        value: (result: TestResult) => result.completed,
      },
      {
        name: 'yyyyMMddHH',
        value: (result: TestResult) => Utilities.formatDate(result.date, 'GMT+9', 'yyyyMMddHH'),
      },
      {
        name: 'yyyyMMdd',
        value: (result: TestResult) => Utilities.formatDate(result.date, 'GMT+9', 'yyyyMMdd'),
      },
      {
        name: 'firstByte',
        value: (result: TestResult) => Utils.transform(result.firstByte),
      },
      {
        name: 'firstLayout',
        value: (result: TestResult) => Utils.transform(result.firstLayout),
      },
      {
        name: 'firstPaint',
        value: (result: TestResult) => Utils.transform(result.firstPaint),
      },
      {
        name: 'firstContentfulPaint',
        value: (result: TestResult) => Utils.transform(result.firstContentfulPaint),
      },
      {
        name: 'firstMeaningfulPaint',
        value: (result: TestResult) => Utils.transform(result.firstMeaningfulPaint),
      },
      {
        name: 'speedIndex',
        value: (result: TestResult) => Utils.transform(result.speedIndex),
      },
      {
        name: 'domInteractive',
        value: (result: TestResult) => Utils.transform(result.domInteractive),
      },
      {
        name: 'loadTime',
        value: (result: TestResult) => Utils.transform(result.loadTime),
      },
      {
        name: 'visualComplete',
        value: (result: TestResult) => Utils.transform(result.visualComplete),
      },
      {
        name: 'fullyLoaded',
        value: (result: TestResult) => Utils.transform(result.fullyLoaded),
      },
      {
        name: 'timeToInteractive',
        value: (result: TestResult) => Utils.transform(result.timeToInteractive),
      },
      {
        name: 'html.bytes',
        value: (result: TestResult) => Utils.transform(result.breakdown.html.bytes, 1),
      },
      {
        name: 'html.requests',
        value: (result: TestResult) => result.breakdown.html.requests,
      },
      {
        name: 'js.bytes',
        value: (result: TestResult) => Utils.transform(result.breakdown.js.bytes, 1),
      },
      {
        name: 'js.requests',
        value: (result: TestResult) => result.breakdown.js.requests,
      },
      {
        name: 'css.bytes',
        value: (result: TestResult) => Utils.transform(result.breakdown.css.bytes, 1),
      },
      {
        name: 'css.requests',
        value: (result: TestResult) => result.breakdown.css.requests,
      },
      {
        name: 'image.bytes',
        value: (result: TestResult) => Utils.transform(result.breakdown.image.bytes, 1),
      },
      {
        name: 'image.requests',
        value: (result: TestResult) => result.breakdown.image.requests,
      },
      {
        name: 'font.bytes',
        value: (result: TestResult) => Utils.transform(result.breakdown.font.bytes, 1),
      },
      {
        name: 'font.requests',
        value: (result: TestResult) => result.breakdown.font.requests,
      },
      {
        name: 'other.bytes',
        value: (result: TestResult) => Utils.transform(result.breakdown.other.bytes, 1),
      },
      {
        name: 'other.requests',
        value: (result: TestResult) => result.breakdown.other.requests,
      },
      {
        name: 'summary',
        value: (result: TestResult) => result.summary,
      },
    ]
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
