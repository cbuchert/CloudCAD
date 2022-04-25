import { Commandlet } from "../types/commandlet"
import { ICLIOutputManager } from "./CLIOutputManager"
import { ICommandManager } from "./CommandManager"

type ExecutableCommandlets = { [name: string]: Function }

export interface ICLIInputManager {
  submit: () => void
  handleInputFromListOfCommandlets: (commandlets: Commandlet[]) => Promise<void>
  handleCommandInput: () => void
}

export class CLIInputManager implements ICLIInputManager {
  private _previousCommand: string = ""

  private _handleCommand = async (input: string) => {
    await this.commandManager.executeCommand(input)
  }

  private _awaitValue =
    (executableCommandlets: ExecutableCommandlets) => async (input: string) => {
      if (executableCommandlets[input.toUpperCase()]) {
        executableCommandlets[input.toUpperCase()]()
      } else {
        this.cliOutputManager.writeToCLI(
          `[Error] ${input} is not an option. Please try again.`,
          4
        )

        return
      }

      this.handleCommandInput()
    }

  private _inputHandler: (input: string) => Promise<void>

  handleCommandInput = () => {
    this._inputHandler = this._handleCommand
  }

  private updateToHandleExecutableCommandlets = (
    executableCommandlets: ExecutableCommandlets
  ) => {
    this._inputHandler = this._awaitValue(executableCommandlets)
  }

  constructor(
    private inputElement: HTMLInputElement,
    private commandManager: ICommandManager,
    private cliOutputManager: ICLIOutputManager
  ) {
    cliOutputManager.writeToCLI("Initializing the CLI Input manager.")
    this._inputHandler = this._handleCommand
  }

  submit = async () => {
    const input = this.inputElement.value.trim()

    if (input) this._previousCommand = input
    this.inputElement.value = ""

    await this._inputHandler(input)
  }

  handleInputFromListOfCommandlets = async (commandlets: Commandlet[]) => {
    const executableCommandlets = commandlets.reduce(
      (acc, commandlet) => ({
        ...acc,
        [commandlet.command]: commandlet.callback,
      }),
      {}
    )

    this.updateToHandleExecutableCommandlets(executableCommandlets)
  }
}
