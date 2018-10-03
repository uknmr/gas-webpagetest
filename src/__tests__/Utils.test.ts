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
      expect(Utils.parseNumberValue('99.9')).toBe(99.9)
    })
    it('should throw error if value can not be parsed', () => {
      expect(() => {
        Utils.parseNumberValue('1+0')
      }).toThrow()
    })
  })
  describe('parseBooleanNumberValue', () => {
    it('should return false if value is undefined', () => {
      expect(Utils.parseBooleanNumberValue()).toBe(false)
    })
    it('should return false if value is "0"', () => {
      expect(Utils.parseBooleanNumberValue('0')).toBe(false)
    })
    it('should return true if value is "1"', () => {
      expect(Utils.parseBooleanNumberValue('1')).toBe(true)
    })

    it('should throw error if value can not be acceptable value', () => {
      expect(() => {
        Utils.parseBooleanNumberValue('-1')
      }).toThrow()
      expect(() => {
        Utils.parseBooleanNumberValue('2')
      }).toThrow()
      expect(() => {
        Utils.parseBooleanNumberValue('10')
      }).toThrow()
      expect(() => {
        Utils.parseBooleanNumberValue('a')
      }).toThrow()
    })
  })
  describe('parseTimeFormat', () => {
    it('should return { type: HOUR } when pass 1h', () => {
      expect(Utils.parseTimeFormat('1h')).toEqual({
        type: 'HOUR',
        value: 1,
      })
    })
    it('should return { type: HOUR } when pass 24h', () => {
      expect(Utils.parseTimeFormat('24h')).toEqual({
        type: 'HOUR',
        value: 24,
      })
    })
    it('should return { type: MINUTE } when pass 30m', () => {
      expect(Utils.parseTimeFormat('30m')).toEqual({
        type: 'MINUTE',
        value: 30,
      })
    })
    it('should return error when pass 1h30m', () => {
      expect(Utils.parseTimeFormat('1h30m')).toBeInstanceOf(Error)
    })
  })
})
