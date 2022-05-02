import { ICLIOutputManager } from "./CLIOutputManager"

export interface IViewBoxManager {
  setViewBox: (newViewBox: SVGRect) => void
  previousViewBox: SVGRect
}

export class ViewBoxManager implements IViewBoxManager {
  previousViewBox: SVGRect

  constructor(
    private cliOutputManager: ICLIOutputManager,
    private svg: SVGSVGElement,
  ) {
    this.cliOutputManager.writeToCLI("Initializing the ViewBox manager.")
    this.previousViewBox = this._getCurrentViewBox()
    //  TODO: Update the width and height when the window changes size.
  }

  private _getCurrentViewBox = (): SVGRect => {
    const [x, y, height, width] = this.svg
      .getAttribute("viewBox")!
      .split(" ")
      .map(parseFloat)

    return <DOMRect> { x, y, height, width }
  }

  setViewBox = (newViewBox: SVGRect) => {
    this.previousViewBox = this._getCurrentViewBox()

    // TODO: Interpolate between values on animation frames for smooth pan / zoom.
    this.svg.setAttribute(
      "viewBox",
      `${newViewBox.x} ${newViewBox.y} ${newViewBox.width} ${newViewBox.height}`,
    )
  }
}
