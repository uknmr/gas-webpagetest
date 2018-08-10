import 'core-js/modules/es6.number.is-integer'
import { TimeTrigger } from './TimeTrigger'
import Utils = require('./Utils')

export const setRunTestTimeTriggers = (): void => {
  const parsedInterval = Utils.parseTimeFormat(process.env.RUN_TEST_INTERVAL)
  if (parsedInterval instanceof Error) {
    throw new Error(`should define RUN_TEST_INTERVAL with correct format in .env.
Error: ${parsedInterval.message}`)
  }
  const timeTrigger = new TimeTrigger()
  // delete exists time trigger
  timeTrigger.deleteTrigger('runTest')
  timeTrigger.deleteTrigger('getTestResults')
  // set new Time Trigger
  if (parsedInterval.type === 'HOUR') {
    if (parsedInterval.value <= 0) {
      throw new Error(`RUN_TEST_INTERVAL hour must be larger than 0h.`)
    }
    timeTrigger.addNewEveryHoursTrigger('runTest', parsedInterval.value)
  } else if (parsedInterval.type === 'MINUTE') {
    if (!timeTrigger.canAcceptableAsEveryMinutes(parsedInterval.value)) {
      throw new Error(`RUN_TEST_INTERVAL minutes must be one of 1m, 5m, 10m, 15m or 30m.`)
    }
    timeTrigger.addNewEveryMinutesTrigger('runTest', parsedInterval.value)
  }
  // check the result every 10min or 30min
  const getTestResultsInterval = (parsedInterval => {
    if (parsedInterval.type === 'MINUTE') {
      return 10
    } else {
      return 30
    }
  })(parsedInterval)
  timeTrigger.addNewEveryMinutesTrigger('getTestResults', getTestResultsInterval)
}
