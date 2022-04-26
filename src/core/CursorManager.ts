import { getSVGPointFromClickEvent } from "../utils/getSVGPointFromClickEvent"
import { App } from "./App"
import { ICLIOutputManager } from "./CLIOutputManager"
import { SelectionManager } from "./SelectionManager"

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

// TODO: Refactor this around an observable.
export class CursorManager implements ICursorManager {
  eventBuffer: CursorEvent[] = []

  constructor(
    private app: App,
    private svg: SVGSVGElement,
    private selectionManager: SelectionManager,
    private cliOutputManager: ICLIOutputManager
  ) {
    cliOutputManager.writeToCLI("Initializing the Cursor manager.")
    svg.addEventListener("click", this._cursorCallback)
    svg.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault()
      app.cliInputManager.submit()
    })
    this.trackCursor()
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

  private trackCursor = () => {
    const cursorX = document.getElementById("cursor-x") as HTMLDivElement
    const cursorY = document.getElementById("cursor-y") as HTMLDivElement

    this.svg.addEventListener("mousemove", (e) => {
      requestAnimationFrame(() => {
        cursorX.style.left = e.clientX + "px"
        cursorY.style.top = e.clientY + "px"
      })
    })
  }

  private setCursorState = (newCallback: MouseEventHandler) => {
    this.svg.removeEventListener("click", this._cursorCallback)
    this.svg.addEventListener("click", newCallback)
    this._cursorCallback = newCallback
  }

  private _clearEventBuffer = () => (this.eventBuffer = [])

  handleEmpty = () => {
    this.setCursorState(this._handleEmpty)
  }

  handlePick = () => {
    this.setCursorState(this._handlePick)
  }

  handleFence = () => {
    this.setCursorState(this._handleFence)
  }

  handleMarquee = () => {
    this.setCursorState(this._handleMarquee)
  }
}
