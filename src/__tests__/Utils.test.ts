import Utils = require('../Utils')

describe('Utils', () => {
  describe('parseNumberValue', () => {
    it('should return undefined if value is undefined', () => {
      expect(Utils.parseNumberValue()).toBeUndefined()
    })
    it('should return undefined if value is empty string', () => {
      expect(Utils.parseNumberValue('')).toBeUndefined()
    })
    it('should return number if value is number string', () => {
      expect(Utils.parseNumberValue('0')).toBe(0)
      expect(Utils.parseNumberValue('1')).toBe(1)
      expect(Utils.parseNumberValue('99.9')).toBe(90.9)
    })
    it('should throw error if value can not be parsed', () => {
      expect(() => {
        Utils.parseNumberValue('1+0')
      }).toThrow()
    })
  })
})
