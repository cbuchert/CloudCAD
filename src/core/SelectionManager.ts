export class SelectionManager {
  currentSelection: SVGElement[] = []

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
