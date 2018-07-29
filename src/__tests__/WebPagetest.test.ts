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
    it('should return test url that include script when it has script', () => {
      const webPagetest = new WebPagetest('key')
      const url = webPagetest.generateRunTestURL('https://example.com', {
        script: `logData    0

// put any urls you want to navigate
navigate    www.aol.com
navigate    news.aol.com

logData    1

// this step will get recorded
navigate    news.aol.com/world
`,
      })
      expect(url).toMatchInlineSnapshot(
        `"https://www.webpagetest.org/runtest.php?url=https%3A%2F%2Fexample.com&location=ec2-ap-northeast-1.3GFast&runs=1&fvonly=1&video=1&f=JSON&noopt=1&k=key&mobile=1&mobileDevice=Pixel&lighthouse=1&script=logData%20%20%20%200%0A%0A%2F%2F%20put%20any%20urls%20you%20want%20to%20navigate%0Anavigate%20%20%20%20www.aol.com%0Anavigate%20%20%20%20news.aol.com%0A%0AlogData%20%20%20%201%0A%0A%2F%2F%20this%20step%20will%20get%20recorded%0Anavigate%20%20%20%20news.aol.com%2Fworld%0A"`
      )
    })
  })
})
