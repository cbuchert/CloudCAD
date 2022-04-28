import { Subject } from "rxjs"
import { ICLIOutputManager } from "./CLIOutputManager"

export interface ICLIInputManager {
  $cliInputValue: Subject<string>
  submit: () => void
}

export class CLIInputManager implements ICLIInputManager {
  $cliInputValue = new Subject<string>()

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
    const value = this.inputElement.value.trim()

    this.inputElement.value = ""

    this.$cliInputValue.next(value)
  }
}
