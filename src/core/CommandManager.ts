import { commands } from "../commands"
import { Commandlet, ExecutableCommandlets } from "../types/commandlet"
import { aliases } from "./aliases"
import { App } from "./App"
import { ICLIInputManager } from "./CLIInputManager"
import { ICLIOutputManager } from "./CLIOutputManager"

export interface ICommandManager {
  executeCommand: (command: string) => Promise<void>
  executeFromCommandlets: (commandlets: Commandlet[]) => Promise<void>
  listenForCommand: () => void
}

// TODO: Refactor this so that flow control is managed. Right now, the implementation is naive.
// Still figuring out what the shape of that looks like. :|
export class CommandManager implements ICommandManager {
  private _previousCommand = ""

  constructor(
    private app: App,
    private svg: SVGSVGElement,
    private cliOutputManager: ICLIOutputManager,
    private cliInputManager: ICLIInputManager
  ) {
    cliOutputManager.writeToCLI("Initializing the Command manager.")
    cliInputManager.setInputHandler(this._handleCommand)
  }

  listenForCommand = () => {
    this.cliInputManager.setInputHandler(this._handleCommand)
  }

  executeCommand = async (command: string) => {
    if (command in commands) {
      //  Execute command
      this._previousCommand = command
      this.app.cliOutputManager.writeToCLI(command)
      await this._executeCommand(command)
    } else if (command in aliases) {
      //  Execute the command that the alias is pointing to.
      // @ts-ignore
      const aliasedCommand: string = aliases[command]
      this._previousCommand = aliasedCommand

      this.app.cliOutputManager.writeToCLI(`${command} (${aliasedCommand})`)
      await this._executeCommand(aliasedCommand)
    } else {
      //  Write an error message to the CLI output.
      this.app.cliOutputManager.writeToCLI(
        `"${command}" - Invalid command or alias.`
      )
    }
  }

  private _handleCommand = async (input: string) => {
    if (input) {
      await this.executeCommand(input)
    } else {
      this.cliOutputManager.writeToCLI(
        `Executing previous command (${this._previousCommand})`
      )
      await this.executeCommand(this._previousCommand)
    }
  }

  private _executeCommand = async (command: string) => {
    return commands[command](this.app, this.svg)
  }

  private _handleCommandlets =
    (executableCommandlets: ExecutableCommandlets) => (input: string) => {
      if (input && input.toUpperCase() in executableCommandlets) {
        executableCommandlets[input.toUpperCase()]()

        this.cliInputManager.setInputHandler(this._handleCommand)
      } else {
        this.cliOutputManager.writeToCLI(
          `"${input}" not recognized. Please try again.`,
          4
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

    this.cliOutputManager.writeToCLI(
      commandlets
        .map(({ title, command }) => `[${command}] ${title}`)
        .join("    "),
      2
    )
    this.cliInputManager.setInputHandler(
      this._handleCommandlets(executableCommandlets)
    )
  }
}
