import { CommandDictionary } from "../commands"
import {
  initializeCLIInputManager,
  InputCaptureCallback,
} from "./CLIInputManager"
import { initializeCLIOutputManager } from "./CLIOutputManager"
import { initializeCommands } from "./CommandManager"

export class App {
  inputManager: {
    resetCLIInputHandler: () => void
    setCLIInputHandler: (callback: InputCaptureCallback) => void
  }

  outputManager: { writeToCLI: (value: string) => void }

  commandManager: {
    executeCommand: (command: string) => void
    commands: CommandDictionary
  }

  constructor(
    private inputForm: HTMLFormElement,
    private outputElement: HTMLPreElement,
    private svg: SVGElement
  ) {
    this.inputManager = initializeCLIInputManager(this.inputForm)
    this.outputManager = initializeCLIOutputManager(this.outputElement)
    this.commandManager = initializeCommands(this, this.svg)
  }

  reinitialize = () => {
    this.outputManager.writeToCLI("  Reinitializing the CLI Input Manager...")
    this.inputManager = initializeCLIInputManager(this.inputForm)
    this.outputManager.writeToCLI("  Done.")
    this.outputManager.writeToCLI("  Reinitializing the CLI Output Manager...")
    this.outputManager = initializeCLIOutputManager(this.outputElement)
    this.outputManager.writeToCLI("  Done.")
    this.outputManager.writeToCLI("  Reinitializing the Command Manager...")
    this.commandManager = initializeCommands(this, this.svg)
    this.outputManager.writeToCLI("  Done.")
  }
}
