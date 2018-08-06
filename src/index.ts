import { runTest } from './runTest'
import { getTestResults } from './getTestResults'
import { updateColumnTitles } from './updateColumnTitles'
import { setRunTestTimeTriggers } from './setRunTestTimeTriggers'

function onOpen() {
  const menu = [
    { name: 'Run test', functionName: 'runTest' },
    { name: 'Get test results', functionName: 'getTestResults' },
    { name: 'Set run test time triggers', functionName: 'setRunTestTimeTriggers' },
    { name: 'Update column titles', functionName: 'updateColumnTitles' },
  ]
  SpreadsheetApp.getActiveSpreadsheet().addMenu('gas-webpagetest', menu)
}

global.onOpen = onOpen
global.runTest = runTest
global.getTestResults = getTestResults
global.setRunTestTimeTriggers = setRunTestTimeTriggers
global.updateColumnTitles = updateColumnTitles
