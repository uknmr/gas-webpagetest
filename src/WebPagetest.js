import Utils from './Utils'

export default class WebPagetest {
  server
  key

  /**
   * @param {type}	key - runTest するときは必須。
   * @param {type}	server - 省略すれば www.webpagetest.org
   */
  constructor(key, server) {
    this.key = key
    this.server = server || 'https://www.webpagetest.org'
  }

  /**
   * WebPagetest 実行
   *
   * @param {type}	url - this is the parameter url
   * @param {type}	options - this is the parameter options
   *
   * @return {} testId
   */
  runTest(url, options) {
    const requestURL = this.generateRunTestURL(url, options)
    const {data: {testId}} = Utils.fetchRequest(requestURL)

    return testId
  }

  /**
   * WebPagetest 実行用 URL 生成
   *
   * @param {type}	url - 必須。
   * @param {type}	options - 省略可能。
   *
   * @return {String} URL
   */
  generateRunTestURL(url, options = {}) {
    return `${this.server}/runtest.php`
      + `?url=${encodeURIComponent(url)}`
      + `&location=${options.location || 'ec2-ap-northeast-1.3GFast'}`
      + `&fvonly=${options.fvonly || 1}`
      + `&video=${options.video || 1}`
      + `&f=${options.format || 'JSON'}`
      + `&k=${this.key}`
      + `&mobile=${options.mobile || 1}`
      + `&mobileDevice=${options.mobileDevice || 'Nexus7'}`
      + `&lighthouse=${options.lighthouse || 1}`
  }

  /**
   * テスト結果取得
   *
   * @param {type}	testId - this is the parameter testId
   *
   * @return {Object} responsedata
   */
  getTestResults(testId) {
    const requestURL = this.generateTestResultsURL(testId)
    const {data} = Utils.fetchRequest(requestURL)
    const date = new Date(data.completed * 1000)

    return [
      data.completed,
      Utilities.formatDate(date, 'GMT+9', 'yyyyMMddHH'),
      Utilities.formatDate(date, 'GMT+9', 'yyyyMMdd'),
      Utils.convertToSeconds(data.average.firstView.TTFB),
      Utils.convertToSeconds(data.average.firstView.loadTime),
      Utils.convertToSeconds(data.average.firstView.domInteractive),
      Utils.convertToSeconds(data.average.firstView.render),
      Utils.convertToSeconds(data.average.firstView.visualComplete),
      Utils.convertToSeconds(data.average.firstView.fullyLoaded),
      Utils.convertToSeconds(data.average.firstView.firstPaint),
      Utils.convertToSeconds(data.average.firstView.SpeedIndex),
      data.summary,
    ]
  }

  /**
   * WebPagetest 実行結果用 URL 生成
   *
   * @param {type}	testId - this is the parameter testId
   *
   * @return {String} URL
   */
  generateTestResultsURL(testId) {
    return `${this.server}/jsonResult.php?test=${testId}&pagespeed=1`
  }
}
