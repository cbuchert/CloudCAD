import { Command } from "../types/command"

export const pan: Command = (svg, getInput, writeToPrompt, [ deltaX, deltaY ]) => {
  const [ minX, minY, x, y ] = svg.getAttribute("viewBox").split(" ").map(parseFloat)
  const newMinX: number = minX + parseFloat(deltaX)
  const newMinY: number = minY + parseFloat(deltaY)

  svg.setAttribute("viewBox", `${newMinX} ${newMinY} ${x} ${y}`)
  writeToPrompt(`  Panned to ${newMinX}, ${newMinY}`)
}
