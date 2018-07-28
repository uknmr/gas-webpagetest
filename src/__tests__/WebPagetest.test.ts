import WebPagetest = require('../WebPagetest')

describe('WebPagetest', () => {
  describe('#generateRunTestURL', () => {
    it('should return test url when it has not options', () => {
      const webPagetest = new WebPagetest('key')
      const url = webPagetest.generateRunTestURL('https://example.com')
      expect(url).toMatchInlineSnapshot(
        `"https://www.webpagetest.org/runtest.php?url=https%3A%2F%2Fexample.com&location=ec2-ap-northeast-1.3GFast&runs=1&fvonly=1&video=1&f=JSON&noopt=1&k=key&mobile=1&mobileDevice=Pixel&lighthouse=1"`
      )
    })
    it('should return test url when it has options', () => {
      const webPagetest = new WebPagetest('key')
      const url = webPagetest.generateRunTestURL('https://example.com', {
        location: 'ec2-ap-northeast-1:Chrome',
        runs: 1,
        fvonly: 0,
        video: 0,
        mobile: 0,
        format: 'JSON',
        noOptimization: 0,
        mobileDevice: 'iPhone5c',
        lighthouse: 0,
      })
      expect(url).toMatchInlineSnapshot(
        `"https://www.webpagetest.org/runtest.php?url=https%3A%2F%2Fexample.com&location=ec2-ap-northeast-1%3AChrome&runs=1&fvonly=0&video=0&f=JSON&noopt=0&k=key&mobile=0&mobileDevice=iPhone5c&lighthouse=0"`
      )
    })
  })
})
