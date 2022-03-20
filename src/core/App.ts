import { CommandDictionary } from "../commands"
import {
  initializeCLIInputManager,
  InputCaptureCallback,
} from "./CLIInputManager"
import { initializeCLIOutputManager } from "./CLIOutputManager"
import { initializeCommands } from "./CommandManager"

export class App {
  public inputManager: {
    resetCLIInputHandler: () => void
    setCLIInputHandler: (callback: InputCaptureCallback) => void
  }

  public outputManager: { writeToCLI: (value: string) => void }

  public commandManager: {
    executeCommand: (command: string) => void
    commands: CommandDictionary
  }

  constructor(
    inputForm: HTMLFormElement,
    outputElement: HTMLPreElement,
    svg: SVGElement
  ) {
    this.inputManager = initializeCLIInputManager(inputForm)
    this.outputManager = initializeCLIOutputManager(outputElement)
    this.commandManager = initializeCommands(this, svg)
  }
}
