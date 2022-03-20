let _output: HTMLPreElement

export const initializeCLIOutputManager = (outputElement: HTMLPreElement) => {
  _output = outputElement

  return {
    writeToCLI,
  }
}

export const writeToCLI = (value: string) => {
  const newNode = document.createElement("p")

  newNode.innerText = value

  //Write to the output.
  _output.appendChild(newNode)
  //Scroll to the bottom of the _output container.
  _output.scrollTop = _output.scrollHeight
}
