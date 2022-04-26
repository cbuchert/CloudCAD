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

  await app.commandManager.executeFromCommandlets([
    {
      title: "extents",
      command: "E",
      callback: _zoomExtents(app, svg),
    },
    {
      title: "to scale",
      command: "T",
      callback: _zoomToScale(app, svg),
    },
    {
      title: "scale by",
      command: "S",
      callback: _zoomByScale(app, svg),
    },
    {
      title: "to window",
      command: "W",
      callback: _zoomToWindow(app, svg),
    },
    {
      title: "previous",
      command: "P",
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
