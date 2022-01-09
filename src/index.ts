import { commands } from "./commands"

let svg: SVGElement, output: HTMLPreElement, input: HTMLFormElement

const writeToOutput = (value: string) => {
  const newNode = document.createElement("p")

  newNode.innerText = value

  //Write to the output.
  output.appendChild(newNode)
  //Scroll to the bottom of the output container.
  output.scrollTop = output.scrollHeight
}

document.addEventListener("DOMContentLoaded", e => {
  svg = document.getElementById("svg") as unknown as SVGElement
  output = document.getElementById("output") as unknown as HTMLPreElement
  input = document.getElementById("input") as unknown as HTMLFormElement

  //Initialize the viewbox.
  svg.setAttribute("viewBox", `0 0 ${svg.clientWidth} ${svg.clientHeight}`)

  input.addEventListener("submit", (e) => {
    e.preventDefault()

    const [ command, ...parameters ] = input.elements[ "input" ].value.split(" ")

    writeToOutput(command)
    if (command in commands) {
      try {
        commands[ command ](svg, (input: string) => new Promise(res => res()), writeToOutput, parameters)
      } catch (e) {
        throw e
      }
    } else {
      writeToOutput("Command not found.")
    }

    //Clear the input.
    input.elements[ "input" ].value = ""
  })
})
