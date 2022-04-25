import { ICLIOutputManager } from "./CLIOutputManager"

export class SelectionManager {
  currentSelection: SVGElement[] = []

  constructor(private cliOutputManager: ICLIOutputManager) {
    cliOutputManager.writeToCLI("Initializing the Selection manager.", 2)
  }

  add = (elements: SVGElement[] = []) => {
    for (const element of elements) {
      if (!this.currentSelection.includes(element)) {
        this.currentSelection.push(element)
      }
    }
  }

  add__unsafe = (elements: SVGElement[] = []) => {
    this.currentSelection.push(...elements)
  }

  remove = (elements: SVGElement[] = []) => {
    for (const element of elements) {
      const index = this.currentSelection.indexOf(element)

      if (index >= 0) {
        this.currentSelection.splice(index, 1)
      }
    }
  }

  clear = () => {
    this.currentSelection = []
  }
}
