import { getSVGPointFromClickEvent } from "../../utils/getSVGPointFromClickEvent"
import { App } from "../App"
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
  // handleGetPoint: () => Promise<Vec2>
}

export class CursorManager implements ICursorManager {
  eventBuffer: CursorEvent[] = []
  cursorX: HTMLDivElement
  cursorY: HTMLDivElement

  constructor(
    private app: App,
    private svg: SVGSVGElement,
    private selectionManager: SelectionManager,
    private cliOutputManager: ICLIOutputManager
  ) {
    const submitOnContextClick: (e) => void = (e) => {
      e.preventDefault()
      app.cliInputManager.submit()
    }

    this.cursorX = document.getElementById("cursor-x") as HTMLDivElement
    this.cursorY = document.getElementById("cursor-y") as HTMLDivElement
    cliOutputManager.writeToCLI("Initializing the Cursor manager.")
    svg.addEventListener("click", this._cursorCallback)
    svg.addEventListener("contextmenu", submitOnContextClick)
    this.cursorX.addEventListener("contextmenu", submitOnContextClick)
    this.cursorY.addEventListener("contextmenu", submitOnContextClick)
    this.trackCursor()
  }

  private trackCursor = () => {
    this.svg.addEventListener("mousemove", (e) => {
      requestAnimationFrame(() => {
        this.cursorX.style.left = e.clientX + "px"
        this.cursorY.style.top = e.clientY + "px"
      })
    })
  }

  _handleEmpty: MouseEventHandler = (e) => {}
  _handlePick: MouseEventHandler = (e) => {}
  _handleFence: MouseEventHandler = (e) => {}
  _handleMarquee: MouseEventHandler = (e) => {}
  _handleGetPoint: MouseEventHandler = (e) => {}
  _handleLogPoint: MouseEventHandler = (e) => {
    console.log(getSVGPointFromClickEvent(e, this.svg))
  }

  private _cursorCallback: MouseEventHandler = this._handleLogPoint

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
