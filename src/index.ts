import { App } from "./core/App"

let svg: SVGElement
let output: HTMLPreElement
let input: HTMLFormElement

document.addEventListener("DOMContentLoaded", (e) => {
  svg = document.getElementById("svg") as unknown as SVGElement
  output = document.getElementById("output") as unknown as HTMLPreElement
  input = document.getElementById("input") as unknown as HTMLFormElement

  const app = new App(input, output, svg)

  //Initialize the viewbox.
  svg.setAttribute("viewBox", `0 0 ${svg.clientWidth} ${svg.clientHeight}`)
})
