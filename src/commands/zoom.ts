import { Command } from "../types/command"

export const zoom: Command = (svg, getInput, writeToPrompt, [ scaleFactor ]) => {
  //TODO: Translate the zoom to work from the center of the screen, not the origin of the viewbox.
  const [ minX, minY ] = svg.getAttribute("viewBox").split(" ")
  const x = svg.clientWidth / parseFloat(scaleFactor)
  const y = svg.clientHeight / parseFloat(scaleFactor)

  svg.setAttribute("viewBox", `${minX} ${minY} ${x} ${y}`)
  writeToPrompt(`  Zoomed ${scaleFactor}x`)
}
