import commands from '../commands'
import { commandToCLI, outputToCLI, promptToCLI, warnToCLI } from './cliCommandHistory'

const invalidCommandText = 'Invalid command'
const cliFormElement = document.getElementById('cli') as HTMLFormElement
const cliInputElement = document.getElementById('cli-input') as HTMLInputElement

const clearInput = () => cliInputElement.value = ''

const execute: (command: string) => void = (command) => {
  if (commands[ command ]) commands[ command ]()
  else warnToCLI(invalidCommandText)
}

const handleCommand: (callback: (value: string) => void) => (e: Event) => void = callback => e => {
  e.preventDefault()

  const input: string = e.target[ 0 ].value

  clearInput()
  commandToCLI(input)
  callback(input)
}

const resetCLIHandler = () => cliFormElement.onsubmit = handleCommand(execute)

resetCLIHandler()

cliInputElement.onkeydown = e => {
  if (e.key === 'Escape') {
    outputToCLI('//')
    clearInput()
    resetCLIHandler()
  }
}

export const promptAndExecute: (message: string, callback: (value: string) => void) => void = (message, callback) => {
  promptToCLI(message)

  cliFormElement.onsubmit = handleCommand((input) => {
    callback(input)
    resetCLIHandler()
  })
}
