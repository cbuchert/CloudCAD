import { App } from "../core/App"
import { Command } from "../types/command"

const _zoomExtents = (app: App, svg: SVGSVGElement) => () => {
  app.cliOutputManager.writeToCLI("Zooming to extents", 4)
}

const _zoomToScale = (app: App, svg: SVGSVGElement) => (input: string) => {
  app.cliOutputManager.writeToCLI("Zooming to scale", 4)
}

const _zoomByScale = (app: App, svg: SVGSVGElement) => (input: string) => {
  app.cliOutputManager.writeToCLI("Zooming by scale", 4)
}

const _zoomToWindow = (app: App, svg: SVGSVGElement) => (input: string) => {
  app.cliOutputManager.writeToCLI("Zooming to window", 4)
}

const _zoomPrevious = (app: App, svg: SVGSVGElement) => () => {
  app.cliOutputManager.writeToCLI("Zooming previous", 4)
}

export const zoom: Command = async (app, svg) => {
  //TODO: Translate the zoom to work from the center of the screen, not the origin of the viewbox.

  app.executeCommandletOnCLISelection([
    {
      title: "[E]xtents",
      command: "e",
      callback: _zoomExtents(app, svg),
    },
    {
      title: "[T]o scale",
      command: "t",
      callback: _zoomToScale(app, svg),
    },
    {
      title: "[S]cale by",
      command: "s",
      callback: _zoomByScale(app, svg),
    },
    {
      title: "[W]indow",
      command: "w",
      callback: _zoomToWindow(app, svg),
    },
    {
      title: "[P]revious",
      command: "p",
      callback: _zoomPrevious(app, svg),
    },
  ])
  // const scaleFactor = 2
  // const [svgOriginDeltaX, svgOriginDeltaY] = svg
  //   .getAttribute("viewBox")!
  //   .split(" ")
  // const width = svg.clientWidth / scaleFactor
  // const height = svg.clientHeight / scaleFactor
  //
  // svg.setAttribute(
  //   "viewBox",
  //   `${svgOriginDeltaX} ${svgOriginDeltaY} ${width} ${height}`
  // )
  // app.cliOutputManager.writeToCLI(`  Zoomed ${scaleFactor}x`)
}
