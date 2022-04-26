import { ICLIOutputManager } from "./CLIOutputManager"

export interface ICLIInputManager {
  submit: () => void
  setInputHandler: (inputHandler: InputHandler) => void
}

type InputHandler = (input: string) => void

// TODO: Refactor this to implement around an observable.
export class CLIInputManager implements ICLIInputManager {
  private _inputHandler: InputHandler = (input) => {}

  constructor(
    private cliOutputManager: ICLIOutputManager,
    private inputElement: HTMLInputElement
  ) {
    cliOutputManager.writeToCLI("Initializing the CLI Input manager.")

    // Always keep focus on the input.
    inputElement.addEventListener("blur", () => {
      setTimeout(() => {
        inputElement.focus()
      }, 0)
    })
  }

  submit = () => {
    const input = this.inputElement.value.trim()

    this.inputElement.value = ""

    this._inputHandler(input)
  }

  setInputHandler = (inputHandler: InputHandler) =>
    (this._inputHandler = inputHandler)
}
