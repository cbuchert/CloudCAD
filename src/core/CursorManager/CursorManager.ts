import { ICLIOutputManager } from "../CLIOutputManager"
import { SelectionManager } from "../SelectionManager"

type CursorState = "empty" | "pick" | "fence" | "marquee"
type MouseEventHandler = (e: MouseEvent) => void

type CursorEvent = {
  mouseEvent: MouseEvent
  screenXY: {
    x: number
    y: number
  }
  svgXY: {
    x: number
    y: number
  }
}

export interface ICursorManager {
  eventBuffer: CursorEvent[]
  handleEmpty: () => void
  handlePick: () => void
  handleFence: () => void
  handleMarquee: () => void
}

export class CursorManager implements ICursorManager {
  eventBuffer: CursorEvent[] = []

  constructor(
    private svg: SVGElement,
    private selectionManager: SelectionManager,
    private cliOutputManager: ICLIOutputManager
  ) {
    cliOutputManager.writeToCLI("  Initializing the Cursor manager.")
    svg.addEventListener("click", this._cursorCallback)
  }

  _handleEmpty: MouseEventHandler = (e) => {}
  _handlePick: MouseEventHandler = (e) => {}
  _handleFence: MouseEventHandler = (e) => {}
  _handleMarquee: MouseEventHandler = (e) => {}

  private _cursorCallback: MouseEventHandler = this._handleEmpty

  private setCursorState = (newCallback: MouseEventHandler) => {
    this.svg.removeEventListener("click", this._cursorCallback)
    this.svg.addEventListener("click", newCallback)
    this._cursorCallback = newCallback
  }

  private _clearEventBuffer = () => (this.eventBuffer = [])

  handleEmpty = () => {}
  handlePick = () => {}
  handleFence = () => {}
  handleMarquee = () => {}
}
