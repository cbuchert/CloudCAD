import { Command } from "../types/command"

export const pan: Command = (app, svg) => {
  //TODO: Query the user for how much they'd like to pan.
  const deltaX = 10
  const deltaY = 10
  const [minX, minY, x, y] = svg
    .getAttribute("viewBox")!
    .split(" ")!
    .map(parseFloat)
  const newMinX: number = minX + deltaX
  const newMinY: number = minY + deltaY

  svg.setAttribute("viewBox", `${newMinX} ${newMinY} ${x} ${y}`)
  app.cliOutputManager.writeToCLI(`  Panned to ${newMinX}, ${newMinY}`)
}
