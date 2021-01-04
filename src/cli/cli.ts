import commands from '../commands'
import { $workspace } from '../index'
import { commandToCLI, outputToCLI, promptToCLI, warnToCLI, WriteToCLI } from './cliCommandHistory'

export type CLI = {
  inputAndExecute: InputAndExecute
  prompt: WriteToCLI
  warn: WriteToCLI
  output: WriteToCLI
}

const invalidCommandText = 'Invalid command'
const cliFormElement = document.getElementById('cli') as HTMLFormElement
const cliInputElement = document.getElementById('cli-input') as HTMLInputElement
const cli: CLI = {
  inputAndExecute,
  prompt: promptToCLI,
  warn: warnToCLI,
  output: outputToCLI,
}

resetCLIHandler()

cliInputElement.onkeydown = e => {
  if (e.key === 'Escape') {
    outputToCLI('//')
    clearInput()
    resetCLIHandler()
  }
}

function clearInput() { return cliInputElement.value = '' }

function execute(command) {
  if (commands[ command ]) commands[ command ]($workspace, cli)
  else warnToCLI(invalidCommandText)
}

function handleCommand(callback) {
  return e => {
    e.preventDefault()

    const input: string = e.target[ 0 ].value

    clearInput()
    commandToCLI(input)
    callback(input)
  }
}

function resetCLIHandler() { return cliFormElement.onsubmit = handleCommand(execute) }

type InputAndExecute = (message: string, callback: (value: string) => void) => void

export function inputAndExecute(message, callback) {
  promptToCLI(message)

  cliFormElement.onsubmit = handleCommand((input) => {
    callback(input)
    resetCLIHandler()
  })
}
