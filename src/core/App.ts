import {
  CLIInputManager,
  ICLIInputManager,
} from "./CLIInputManager/CLIInputManager"
import { CLIOutputManager, ICLIOutputManager } from "./CLIOutputManager"
import {
  CommandManager,
  ICommandManager,
} from "./CommandManager/CommandManager"
import { CursorManager, ICursorManager } from "./CursorManager"
import { IKeypressManager, KeypressManager } from "./KeypressManager"
import { SelectionManager } from "./SelectionManager"
import { IViewBoxManager, ViewBoxManager } from "./ViewBoxManager"

export class App {
  selectionManager!: SelectionManager
  commandManager!: ICommandManager
  cliInputManager!: ICLIInputManager
  cliOutputManager!: ICLIOutputManager
  keypressManager!: IKeypressManager
  cursorManager!: ICursorManager
  viewBoxManager!: IViewBoxManager

  constructor(
    private htmlInputElement: HTMLInputElement,
    private outputElement: HTMLPreElement,
    private svg: SVGSVGElement,
  ) {
    this.initialize()
  }

  initialize = () => {
    this.cliOutputManager = new CLIOutputManager(this.outputElement)
    this.viewBoxManager = new ViewBoxManager(this.cliOutputManager, this.svg)
    this.selectionManager = new SelectionManager(this.cliOutputManager)
    this.commandManager = new CommandManager(
      this,
      this.svg,
      this.cliOutputManager,
    )
    this.cliInputManager = new CLIInputManager(
      this.cliOutputManager,
      this.htmlInputElement,
      this.commandManager,
    )
    this.keypressManager = new KeypressManager(
      this.cliOutputManager,
      this.cliInputManager,
      this.commandManager,
    )
    this.cursorManager = new CursorManager(
      this,
      this.svg,
      this.selectionManager,
      this.cliOutputManager,
    )
  }
}
