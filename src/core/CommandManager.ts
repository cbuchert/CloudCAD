import { commands } from "../commands"
import { aliases } from "./aliases"
import { App } from "./App"
import { ICLIOutputManager } from "./CLIOutputManager"

export interface ICommandManager {
  isExecutingCommand: boolean
  executeCommand: (command: string) => Promise<void>
}

export class CommandManager implements ICommandManager {
  isExecutingCommand: boolean

  constructor(
    private _app: App,
    private _svg: SVGSVGElement,
    private cliOutputManager: ICLIOutputManager
  ) {
    cliOutputManager.writeToCLI("  Initializing the Command manager.")
    this.isExecutingCommand = false
  }

  executeCommand = async (command: string) => {
    if (command in commands) {
      //  Execute command
      this._app.cliOutputManager.writeToCLI(command)
      await this._executeCommand(command)
    } else if (command in aliases) {
      //  Execute the command that the alias is pointing to.
      // @ts-ignore
      const aliasedCommand: string = aliases[command]

      this._app.cliOutputManager.writeToCLI(`${command} (${aliasedCommand})`)
      await this._executeCommand(aliasedCommand)
    } else {
      //  Write an error message to the CLI output.
      this._app.cliOutputManager.writeToCLI(
        `"${command}" - Invalid command or alias.`
      )
    }
  }

  private _executeCommand = (command: string) => {
    if (this._app && this._svg) {
      this.isExecutingCommand = true

      const commandPromise = commands[command](this._app, this._svg).finally(
        () => {
          this.isExecutingCommand = false
        }
      )
    }
  }
}
