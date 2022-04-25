import { App } from "./core/App"

document.addEventListener("DOMContentLoaded", (e) => {
  const svg = document.getElementById("svg")
  const output = document.getElementById("output")
  const input = document.getElementById("input")

  if (svg && output && input) {
    // Initialize the viewbox.
    svg.setAttribute("viewBox", `0 0 ${svg.clientWidth} ${svg.clientHeight}`)

    // New up the app.
    const app = new App(
      input as HTMLFormElement,
      output as HTMLPreElement,
      svg as unknown as SVGSVGElement
    )
  }
})
