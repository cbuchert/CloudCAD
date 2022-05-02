import { createMachine, interpret } from "@xstate/fsm"
import { ICLIOutputManager } from "../CLIOutputManager"
import { ICommandManager } from "../CommandManager/CommandManager"
import { stateMachine } from "./stateMachine"

export interface ICLIInputManager {
  submit: () => void
  clear: () => void
  setInterpreterState: (
    newState: "isListeningForCommands" | "isListeningForRawValue",
  ) => void
}

export class CLIInputManager implements ICLIInputManager {
  private stateMachine

  constructor(
    private cliOutputManager: ICLIOutputManager,
    private inputElement: HTMLInputElement,
    private commandManager: ICommandManager,
  ) {
    cliOutputManager.writeToCLI("Initializing the CLI Input manager.")

    this.stateMachine = interpret(createMachine(stateMachine)).start()

    // Always keep focus on the input.
    inputElement.addEventListener("blur", () => {
      setTimeout(() => {
        inputElement.focus()
      }, 0)
    })
  }

  submit = () => {
    const value = this.inputElement.value.trim()

    this.clear()

    switch (this.stateMachine.state.value) {
      case "isListeningForCommands":
        this.commandManager.execute(value)
        break

      case "isListeningForRawValue":
        console.log("emit the raw value somehow")
        break
    }
  }

  clear = () => {
    this.inputElement.value = ""
  }

  setInterpreterState = (newState: string) => {
    this.stateMachine.send(newState)
  }
}
