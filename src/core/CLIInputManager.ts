import { ICLIOutputManager } from "./CLIOutputManager"
import { ICommandManager } from "./CommandManager"

export type InputCaptureCallback = (e: SubmitEvent) => void

export interface ICLIInputManager {}

export class CLIInputManager implements ICLIInputManager {
  constructor(
    private inputForm: HTMLFormElement,
    private commandManager: ICommandManager,
    private cliOutputManager: ICLIOutputManager
  ) {
    cliOutputManager.writeToCLI("  Initializing the CLI Input Manager.")
    this.resetCLIInputHandler()
  }

  // Todo: Add handler for pressing space bar to submit the form.

  setCLIInputHandler = (callback: InputCaptureCallback) => {
    // Start by cloning this.inputForm, removing all old event listeners.
    const clone = this.inputForm.cloneNode(true) as HTMLInputElement & {
      children: { input: HTMLInputElement }
    }

    // Replace the input node with the event listener stripped clone.
    this.inputForm.replaceWith(clone)

    // Add new event listeners to the clone.
    clone.addEventListener("submit", (e) => {
      e.preventDefault()
      callback(e)
      this.clearInput(clone.children.input as HTMLInputElement)
    })
  }

  resetCLIInputHandler = () => {
    this.setCLIInputHandler((e) => {
      const formData = new FormData(e.target)
      const input = formData.get("input") as string

      this.commandManager.executeCommand(input)
    })
  }

  clearInput = (input: HTMLInputElement) => {
    input.value = ""
  }
}
