import { Command } from "../types/command"

export const zoom: Command = (app, svg) => {
  //TODO: Translate the zoom to work from the center of the screen, not the origin of the viewbox.
  //TODO: Prompt the user for the type of zoom.
  const scaleFactor = 2
  const [svgOriginDeltaX, svgOriginDeltaY] = svg
    .getAttribute("viewBox")!
    .split(" ")
  const width = svg.clientWidth / scaleFactor
  const height = svg.clientHeight / scaleFactor

  svg.setAttribute(
    "viewBox",
    `${svgOriginDeltaX} ${svgOriginDeltaY} ${width} ${height}`
  )
  app.cliOutputManager.writeToCLI(`  Zoomed ${scaleFactor}x`)
}
