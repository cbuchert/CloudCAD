import { ICLIOutputManager } from "./CLIOutputManager"

type ViewBox = {
  x: number
  y: number
  height: number
  width: number
}

export interface IViewBoxManager {
  setViewBox: ({
    x,
    y,
    height,
    width,
  }: {
    x: number
    y: number
    height: number
    width: number
  }) => void
}

export class ViewBoxManager implements IViewBoxManager {
  previousViewBox: ViewBox

  constructor(
    private cliOutputManager: ICLIOutputManager,
    private svg: SVGSVGElement,
  ) {
    this.cliOutputManager.writeToCLI("Initializing the ViewBox manager.")
    this.previousViewBox = svg.getBBox()
    //  TODO: Update the width and height when the window changes size.
  }

  setViewBox = (newViewBox: ViewBox) => {
    // TODO: Interpolate between values on animation frames for smooth pan / zoom.
    this.svg.setAttribute(
      "viewBox",
      `${newViewBox.x} ${newViewBox.y} ${newViewBox.width} ${newViewBox.height}`,
    )

    this.previousViewBox = newViewBox
  }
}
