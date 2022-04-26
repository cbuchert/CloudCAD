import { ICLIOutputManager } from "./CLIOutputManager"
import { ExecutableCommandlets, ICommandManager } from "./CommandManager"

export interface ICLIInputManager {
  submit: () => void
  handleCommandInput: () => void
  handleExecutableCommandlets: (
    executableCommandlets: ExecutableCommandlets
  ) => void
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

  handleExecutableCommandlets = (
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
}
