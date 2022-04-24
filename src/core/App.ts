import { CLIInputManager, ICLIInputManager } from "./CLIInputManager"
import { CLIOutputManager, ICLIOutputManager } from "./CLIOutputManager"
import { CommandManager, ICommandManager } from "./CommandManager"
import { CursorManager, ICursorManager } from "./CursorManager/CursorManager"
import { IKeypressManager, KeypressManager } from "./KeypressManager"
import { SelectionManager } from "./SelectionManager"

export class App {
  selectionManager: SelectionManager
  commandManager: ICommandManager
  cliInputManager: ICLIInputManager
  cliOutputManager: ICLIOutputManager
  keypressManager: IKeypressManager
  cursorManager: ICursorManager

  constructor(
    private inputForm: HTMLFormElement,
    private outputElement: HTMLPreElement,
    private svg: SVGElement
  ) {
    this.selectionManager = new SelectionManager()
    this.commandManager = new CommandManager(this, this.svg)
    this.cliInputManager = new CLIInputManager(
      this.inputForm,
      this.commandManager
    )
    this.cliOutputManager = new CLIOutputManager(this.outputElement)
    this.keypressManager = new KeypressManager(this.cliOutputManager)
    this.cursorManager = new CursorManager(svg, this.selectionManager)
  }

  reinitialize = () => {
    this.cliOutputManager.writeToCLI("  Reinitializing the Selection Manager.")
    this.selectionManager = new SelectionManager()
    this.cliOutputManager.writeToCLI("  Reinitializing the Command Manager.")
    this.commandManager = new CommandManager(this, this.svg)
    this.cliOutputManager.writeToCLI("  Reinitializing the CLI Input Manager.")
    this.cliInputManager = new CLIInputManager(
      this.inputForm,
      this.commandManager
    )
    this.cliOutputManager.writeToCLI("  Reinitializing the CLI Output Manager.")
    this.cliOutputManager = new CLIOutputManager(this.outputElement)
    this.cliOutputManager.writeToCLI("  Reinitializing the Keypress Manager.")
    this.keypressManager = new KeypressManager(this.cliOutputManager)
    this.cliOutputManager.writeToCLI("  Reinitializing the Cursor Manager.")
    this.cursorManager = new CursorManager(this.svg, this.selectionManager)
  }
}
