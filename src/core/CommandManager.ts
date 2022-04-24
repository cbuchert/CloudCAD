import { commands } from "../commands"
import { aliases } from "./aliases"
import { App } from "./App"
import { ICLIOutputManager } from "./CLIOutputManager"

export interface ICommandManager {
  executeCommand: (command: string) => void
}

export class CommandManager implements ICommandManager {
  constructor(
    private _app: App,
    private _svg: SVGElement,
    private cliOutputManager: ICLIOutputManager
  ) {
    cliOutputManager.writeToCLI("  Initializing the Command Manager.")
  }

  executeCommand = (command: string) => {
    if (command in commands) {
      //  Execute command
      this._app.cliOutputManager.writeToCLI(command)
      this._executeCommand(command)
    } else if (command in aliases) {
      //  Execute the command that the alias is pointing to.
      // @ts-ignore
      const aliasedCommand: string = aliases[command]

      this._app.cliOutputManager.writeToCLI(`${command} (${aliasedCommand})`)
      this._executeCommand(aliasedCommand)
    } else {
      //  Write an error message to the CLI output.
      this._app.cliOutputManager.writeToCLI(
        `"${command}" - Invalid command or alias.`
      )
    }
  }

  private _executeCommand = (command: string) => {
    commands[command](this._app, this._svg)
  }
}
