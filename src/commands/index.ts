import { pushWarningToHistory } from '../cli/cliHistory'

const invalidCommandText = 'Invalid command'

export const execute: (command: string) => void = (command) => {
  switch (command) {
    default:
      pushWarningToHistory(command, invalidCommandText)
      break
  }
}
