import { commands } from "../commands"
import { Commandlet } from "../types/commandlet"
import { aliases } from "./aliases"
import { App } from "./App"
import { ICLIInputManager } from "./CLIInputManager"
import { ICLIOutputManager } from "./CLIOutputManager"

export type ExecutableCommandlets = { [name: string]: Function }

export interface ICommandManager {
  isExecutingCommand: boolean
  executeCommand: (command: string) => Promise<void>
  executeFromCommandlets: (commandlets: Commandlet[]) => Promise<void>
}

export class CommandManager implements ICommandManager {
  isExecutingCommand: boolean

  constructor(
    private _app: App,
    private _svg: SVGSVGElement,
    private cliOutputManager: ICLIOutputManager,
    private cliInputManager: ICLIInputManager
  ) {
    cliOutputManager.writeToCLI("Initializing the Command manager.")
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

  executeFromCommandlets = async (commandlets: Commandlet[]) => {
    const executableCommandlets = commandlets.reduce(
      (acc, commandlet) => ({
        ...acc,
        [commandlet.command]: commandlet.callback,
      }),
      {}
    )

    this.cliInputManager.handleExecutableCommandlets(executableCommandlets)
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
