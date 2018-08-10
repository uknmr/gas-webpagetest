export type EveryMinutesType = 1 | 5 | 10 | 15 | 30

export class TimeTrigger {
  /**
   * @see https://developers.google.com/apps-script/reference/script/clock-trigger-builder#everyHours(Integer)
   */
  public addNewEveryHoursTrigger(functionName: string, hours: number) {
    ScriptApp.newTrigger(functionName)
      .timeBased()
      .everyHours(hours)
      .create()
  }

  /**
   * EveryMinutes's value must be one of 1, 5, 10, 15 or 30.
   */
  public canAcceptableAsEveryMinutes(minutes: number): minutes is EveryMinutesType {
    return [1, 5, 10, 15, 30].indexOf(minutes) !== -1
  }

  /**
   * @see https://developers.google.com/apps-script/reference/script/clock-trigger-builder#everyMinutes(Integer)
   */
  public addNewEveryMinutesTrigger(functionName: string, minutes: EveryMinutesType) {
    ScriptApp.newTrigger(functionName)
      .timeBased()
      .everyMinutes(minutes)
      .create()
  }

  public deleteTrigger(functionName: string) {
    // delete function that match functionName
    const triggers = ScriptApp.getProjectTriggers()
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === functionName) {
        ScriptApp.deleteTrigger(trigger)
      }
    })
  }
}
