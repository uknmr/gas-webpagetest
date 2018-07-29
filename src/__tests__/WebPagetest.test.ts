import WebPagetest = require('../WebPagetest')
import * as fs from 'fs'
import * as path from 'path'

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
  describe('generateTestResult', () => {
    beforeAll(() => {
      // stub https://developers.google.com/apps-script/reference/utilities/utilities#formatdatedate-timezone-format
      global.Utilities = {
        formatDate: (date: Date, timeZone: string, format: string) => {
          return `${date.toISOString()}, ${timeZone}, ${format}`
        },
      }
    })
    afterAll(() => {
      delete global.Utilities
    })
    it('should return result values', () => {
      const webPagetest = new WebPagetest('key')
      const response = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, 'fixtures/WebPagetest-response-google.com.json'),
          'utf-8'
        )
      )
      const names = webPagetest.generateTestResultNames()
      const result = webPagetest.convertWebPageResponseToResult(response)
      const values = webPagetest.generateTestResultValues(result)
      const actualResults = names.map((name, index) => {
        return {
          name,
          value: values[index],
        }
      })
      expect(actualResults).toMatchInlineSnapshot(`
Array [
  Object {
    "name": "completedTimeStamp",
    "value": 1532835031,
  },
  Object {
    "name": "yyyyMMddHH",
    "value": "2018-07-29T03:30:31.000Z, GMT+9, yyyyMMddHH",
  },
  Object {
    "name": "yyyyMMdd",
    "value": "2018-07-29T03:30:31.000Z, GMT+9, yyyyMMdd",
  },
  Object {
    "name": "firstByte",
    "value": "0.48",
  },
  Object {
    "name": "firstLayout",
    "value": "0.54",
  },
  Object {
    "name": "firstPaint",
    "value": "0.59",
  },
  Object {
    "name": "firstContentfulPaint",
    "value": "0.59",
  },
  Object {
    "name": "firstMeaningfulPaint",
    "value": "0.59",
  },
  Object {
    "name": "speedIndex",
    "value": "0.61",
  },
  Object {
    "name": "domInteractive",
    "value": "0.63",
  },
  Object {
    "name": "loadTime",
    "value": "1.47",
  },
  Object {
    "name": "visualComplete",
    "value": "1.10",
  },
  Object {
    "name": "fullyLoaded",
    "value": "1.91",
  },
  Object {
    "name": "timeToInteractive",
    "value": "1.96",
  },
  Object {
    "name": "html.bytes",
    "value": "68.6",
  },
  Object {
    "name": "html.requests",
    "value": 9,
  },
  Object {
    "name": "js.bytes",
    "value": "286.7",
  },
  Object {
    "name": "js.requests",
    "value": 5,
  },
  Object {
    "name": "css.bytes",
    "value": "0.0",
  },
  Object {
    "name": "css.requests",
    "value": 0,
  },
  Object {
    "name": "image.bytes",
    "value": "37.7",
  },
  Object {
    "name": "image.requests",
    "value": 6,
  },
  Object {
    "name": "font.bytes",
    "value": "0.0",
  },
  Object {
    "name": "font.requests",
    "value": 0,
  },
  Object {
    "name": "other.bytes",
    "value": "0.0",
  },
  Object {
    "name": "other.requests",
    "value": 0,
  },
  Object {
    "name": "summary",
    "value": "http://www.webpagetest.org/results.php?test=180729_D6_c92a1ce569da3ae435ac558fc934a38b",
  },
]
`)
    })
  })
})
