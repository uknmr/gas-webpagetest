export class TimeTrigger {
  /**
   * @see https://developers.google.com/apps-script/reference/script/clock-trigger-builder#everyHours(Integer)
   */
  public addNewEveryHourTrigger(functionName: string, hours: number) {
    ScriptApp.newTrigger(functionName)
      .timeBased()
      .everyHours(hours)
      .create()
  }

  /**
   * @see https://developers.google.com/apps-script/reference/script/clock-trigger-builder#everyMinutes(Integer)
   */
  public addNewEveryMinutesTrigger(functionName: string, minutes: 1 | 5 | 10 | 15 | 30) {
    ScriptApp.newTrigger(functionName)
      .timeBased()
      .everyMinutes(minutes) // It must be one of 1, 5, 10, 15 or 30.
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
