export interface ICLIOutputManager {
  writeToCLI: (value: string) => void
}

export class CLIOutputManager implements ICLIOutputManager {
  constructor(private _output: HTMLPreElement) {
    this.writeToCLI("  Initializing the CLI Output Manager.")
  }

  writeToCLI = (value: string) => {
    const newNode = document.createElement("p")

    newNode.innerText = value
    newNode.classList.add("output-text")

    //Write to the output.
    this._output.appendChild(newNode)
    //Scroll to the bottom of the _output container.
    this._output.scrollTop = this._output.scrollHeight
  }
}
