import { Commandlet } from "../types/commandlet"
import { ICLIOutputManager } from "./CLIOutputManager"
import { ICommandManager } from "./CommandManager"

type ExecutableCommandlets = { [name: string]: Function }

export interface ICLIInputManager {
  submit: () => void
  awaitInputFromListOfCommandlets: (commandlets: Commandlet[]) => Promise<void>
}

export class CLIInputManager implements ICLIInputManager {
  private _previousCommand: string = ""

  private _handleCommand = async (input: string) => {
    await this.commandManager.executeCommand(input)

    return "done."
  }

  private _awaitValue =
    (executableCommandlets: ExecutableCommandlets) => async (input: string) => {
      if (executableCommandlets[input]) {
        executableCommandlets[input]()
      }

      this.awaitCommand()
      return input
    }

  private _inputHandler: (input: string) => Promise<string>

  constructor(
    private inputElement: HTMLInputElement,
    private commandManager: ICommandManager,
    private cliOutputManager: ICLIOutputManager
  ) {
    cliOutputManager.writeToCLI("  Initializing the CLI Input manager.")
    this._inputHandler = this._handleCommand
  }

  submit = async () => {
    const input = this.inputElement.value.trim()

    if (input) this._previousCommand = input
    this.inputElement.value = ""

    await this._inputHandler(input)
  }

  awaitCommand = () => {
    this._inputHandler = this._handleCommand
  }

  awaitCommandlets = (executableCommandlets: ExecutableCommandlets) => {
    this._inputHandler = this._awaitValue(executableCommandlets)
  }

  awaitInputFromListOfCommandlets = async (commandlets: Commandlet[]) => {
    const executableCommandlets = commandlets.reduce(
      (acc, commandlet) => ({
        ...acc,
        [commandlet.command]: commandlet.callback,
      }),
      {}
    )

    this.awaitCommandlets(executableCommandlets)
  }
}
