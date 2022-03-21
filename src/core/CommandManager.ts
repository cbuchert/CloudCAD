import { commands } from "../commands"
import { App } from "./App"
import { aliases } from "./aliases"

let _app: App
let _svg: SVGElement

export const executeCommand = (command: string) => {
  if (command in commands) {
    //  Execute command
    _app.outputManager.writeToCLI(command)
    _executeCommand(command)
  } else if (command in aliases) {
    //  Execute the command that the alias is pointing to.
    const aliasedCommand: string = aliases[command]
    _app.outputManager.writeToCLI(`${command} (${aliasedCommand})`)

    _executeCommand(aliasedCommand)
  } else {
    //  Write an error message to the CLI output.
    _app.outputManager.writeToCLI(`"${command}" - Invalid command or alias.`)
  }
}

const _executeCommand = (command: string) => {
  commands[command](_app, _svg)
}

export const initializeCommands = (app: App, svg: SVGElement) => {
  _app = app
  _svg = svg

  return {
    commands,
    executeCommand,
  }
}
