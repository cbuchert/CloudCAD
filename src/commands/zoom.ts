import { Command } from "../types/command"

export const zoom: Command = (app, svg) => {
  //TODO: Translate the zoom to work from the center of the screen, not the origin of the viewbox.
  //TODO: Prompt the user for the type of zoom.
  const scaleFactor = 2
  const [minX, minY] = svg.getAttribute("viewBox").split(" ")
  const x = svg.clientWidth / scaleFactor
  const y = svg.clientHeight / scaleFactor

  svg.setAttribute("viewBox", `${minX} ${minY} ${x} ${y}`)
  app.outputManager.writeToCLI(`  Zoomed ${scaleFactor}x`)
}
