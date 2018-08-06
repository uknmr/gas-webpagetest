import 'core-js/modules/es6.number.is-integer'
import { TimeTrigger } from './TimeTrigger'
import Utils = require('./Utils')

export const setRunTestTimeTriggers = (): void => {
  const intervalHours = Utils.parseNumberValue(process.env.RUN_TEST_INTERVAL_HOURS)
  if (intervalHours === undefined) {
    throw new Error('should define RUN_TEST_INTERVAL_HOURS in .env')
  }
  if (!Number.isInteger(intervalHours)) {
    throw new Error('RUN_TEST_INTERVAL_HOURS should be integer')
  }
  const timeTrigger = new TimeTrigger()
  // delete exists time trigger
  timeTrigger.deleteTrigger('runTest')
  timeTrigger.deleteTrigger('getTestResults')
  // set new Time Trigger
  timeTrigger.addNewEveryHourTrigger('runTest', intervalHours)
  // check the result every 10min or 30min
  const getTestResultsInterval = (hour => {
    if (hour <= 1) {
      return 10
    } else {
      return 30
    }
  })(intervalHours)
  timeTrigger.addNewEveryMinutesTrigger('getTestResults', getTestResultsInterval)
}
