export class SelectionManager {
  currentSelection: SVGElement[] = []

  add = (elements: SVGElement[] = []) => {
    const novelElements = elements.filter(
      (element) => !this.currentSelection.includes(element)
    )

    this.currentSelection.push(...novelElements)
  }

  add__unsafe = (elements: SVGElement[]) => {
    this.currentSelection.push(...elements)
  }

  remove = (elements: SVGElement[] = []) => {
    for (const element of elements) {
      const index = this.currentSelection.indexOf(element)

      this.currentSelection.splice(index, 1)
    }
  }

  clear = () => {
    this.currentSelection = []
  }
}
