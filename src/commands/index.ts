import { pushCommandToHistory, pushOutputToHistory, pushWarningToHistory } from '../cli/cliHistory'

const invalidCommandText = 'Invalid command'
const isMathExpression: RegExp = /^([-+/*]\d+(\.\d+)?)*/

export const execute: (command: string) => void = (command) => {
  if (isMathExpression.test(command)) {
    pushCommandToHistory(command)
    pushOutputToHistory(`${command} = ${eval(command)}`)

    return
  }

  switch (command) {
    default:
      pushWarningToHistory(command, invalidCommandText)
      break
  }
}
