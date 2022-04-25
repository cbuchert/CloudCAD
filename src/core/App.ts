import { Commandlet } from "../types/commandlet"
import { CLIInputManager, ICLIInputManager } from "./CLIInputManager"
import { CLIOutputManager, ICLIOutputManager } from "./CLIOutputManager"
import { CommandManager, ICommandManager } from "./CommandManager"
import { CursorManager, ICursorManager } from "./CursorManager/CursorManager"
import { IKeypressManager, KeypressManager } from "./KeypressManager"
import { SelectionManager } from "./SelectionManager"

export class App {
  selectionManager!: SelectionManager
  commandManager!: ICommandManager
  cliInputManager!: ICLIInputManager
  cliOutputManager!: ICLIOutputManager
  keypressManager!: IKeypressManager
  cursorManager!: ICursorManager

  constructor(
    private htmlInputElement: HTMLInputElement,
    private outputElement: HTMLPreElement,
    private svg: SVGSVGElement
  ) {
    this.initialize()
  }

  initialize = () => {
    this.cliOutputManager = new CLIOutputManager(this.outputElement)
    this.selectionManager = new SelectionManager(this.cliOutputManager)
    this.commandManager = new CommandManager(
      this,
      this.svg,
      this.cliOutputManager
    )
    this.cliInputManager = new CLIInputManager(
      this.htmlInputElement,
      this.commandManager,
      this.cliOutputManager
    )
    this.keypressManager = new KeypressManager(
      this.cliOutputManager,
      this.cliInputManager,
      this.commandManager
    )
    this.cursorManager = new CursorManager(
      this.svg,
      this.selectionManager,
      this.cliOutputManager
    )
  }

  executeCommandletOnCLISelection = async (commandlets: Commandlet[]) => {
    this.cliOutputManager.writeToCLI(
      "  " + commandlets.map(({ title }) => title).join(" | ")
    )

    await this.cliInputManager.awaitInputFromListOfCommandlets(commandlets)
  }
}
