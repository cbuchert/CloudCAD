import commands from '../commands'
import { commandToCli, promptToCli, warnToCli } from './cliCommandHistory'

const invalidCommandText = 'Invalid command'
const cliFormElement = document.getElementById('cli') as HTMLFormElement
const cliInputElement = document.getElementById('cli-input') as HTMLInputElement

const execute: (command: string) => void = (command) => {
  if (commands[ command ]) commands[ command ]()
  else warnToCli(invalidCommandText)
}

const handleCommand: (callback: (value: string) => void) => (e: Event) => void = callback => e => {
  e.preventDefault()

  const input: string = e.target[ 0 ].value

  cliInputElement.value = ''
  commandToCli(input)
  callback(input)
}

cliFormElement.onsubmit = handleCommand(execute)

export const promptAndExecute: (message: string, callback: (value: string) => void) => void = (message, callback) => {
  promptToCli(message)

  cliFormElement.onsubmit = handleCommand((input) => {
    callback(input)

    cliFormElement.onsubmit = handleCommand(execute)
  })
}
