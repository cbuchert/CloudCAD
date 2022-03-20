import { executeCommand } from "./CommandManager"

export type InputCaptureCallback = (e: Event) => void

let _input: HTMLFormElement

// Todo: Add handler for pressing space bar to submit the form.

export const initializeCLIInputManager = (inputForm: HTMLFormElement) => {
  _input = inputForm

  resetCLIInputHandler()

  return {
    setCLIInputHandler,
    resetCLIInputHandler,
  }
}

const setCLIInputHandler = (callback: InputCaptureCallback) => {
  // Start by cloning _input, removing all old event listeners.
  const clone = _input.cloneNode(true) as HTMLInputElement & {
    children: { input: HTMLInputElement }
  }

  // Replace the input node with the event listener stripped clone.
  _input.replaceWith(clone)

  // Add new event listeners to the clone.
  clone.addEventListener("submit", (e) => {
    e.preventDefault()
    callback(e)
    clearInput(clone.children.input as HTMLInputElement)
  })
}

const resetCLIInputHandler = () => {
  setCLIInputHandler((e) => {
    const formData = new FormData(e.target)
    const input = formData.get("input") as string

    executeCommand(input)
  })
}

const clearInput = (input: HTMLInputElement) => {
  input.value = ""
}
