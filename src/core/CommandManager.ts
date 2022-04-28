import { filter, take } from "rxjs"
import { commands } from "../commands"
import { Commandlet, ExecutableCommandlets } from "../types/commandlet"
import { aliases } from "./aliases"
import { App } from "./App"
import { ICLIInputManager } from "./CLIInputManager"
import { ICLIOutputManager } from "./CLIOutputManager"

export interface ICommandManager {
  executeCommand: (command: string) => Promise<void>
  executeFromCommandlets: (commandlets: Commandlet[]) => Promise<void>
}

export class CommandManager implements ICommandManager {
  private _previousCommand = ""
  private isListeningForCommand = true

  constructor(
    private app: App,
    private svg: SVGSVGElement,
    private cliOutputManager: ICLIOutputManager,
    private cliInputManager: ICLIInputManager
  ) {
    cliOutputManager.writeToCLI("Initializing the Command manager.")

    this._listenForCommands()
  }

  _listenForCommands = () => {
    this.cliInputManager.$cliInputValue
      .pipe(filter((value) => this.isListeningForCommand))
      .subscribe(this._handleCommand)
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

    this._listenForCommandlets(executableCommandlets)
  }

  _listenForCommandlets = (executableCommandlets: ExecutableCommandlets) => {
    this.isListeningForCommand = false
    this.cliInputManager.$cliInputValue
      .pipe(
        filter((value) => !this.isListeningForCommand),
        take(1)
      )
      .subscribe(this._handleCommandlets(executableCommandlets))
      .add(() => (this.isListeningForCommand = true))
  }

  private _handleCommandlets =
    (executableCommandlets: ExecutableCommandlets) => (input: string) => {
      if (input && input.toUpperCase() in executableCommandlets) {
        executableCommandlets[input.toUpperCase()]()
      } else {
        this.cliOutputManager.writeToCLI(`"${input}" not recognized.`, 4)
      }
    }
}
