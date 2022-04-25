import { SelectionManager } from "./SelectionManager"

describe("SelectionManager", () => {
  let selectionManager: SelectionManager

  beforeEach(() => {
    selectionManager = new SelectionManager({ writeToCLI: (value) => {} })
  })

  const createSVGElement = () =>
    document.createElementNS("http://www.w3.org/2000/svg", "path")

  it("can safely add elements to its current selection.", () => {
    const element = createSVGElement()

    selectionManager.add([element])
    expect(selectionManager.currentSelection.length).toEqual(1)

    selectionManager.add([element, element])
    expect(selectionManager.currentSelection.length).toEqual(1)
  })

  it("can safely add multiple elements at the same time.", () => {
    const elements = new Array(10).fill(null).map(createSVGElement)

    selectionManager.add([...elements, ...elements])
    expect(selectionManager.currentSelection.length).toEqual(10)
  })

  it("can unsafely (quickly) add elements to its current selection (no duplicate checking).", () => {
    const element = createSVGElement()

    selectionManager.add__unsafe([element])
    expect(selectionManager.currentSelection.length).toEqual(1)

    selectionManager.add__unsafe([element])
    expect(selectionManager.currentSelection.length).toEqual(2)

    selectionManager.add__unsafe([element, element])
    expect(selectionManager.currentSelection.length).toEqual(4)
  })

  it("can clear its current selection.", () => {
    const element = createSVGElement()

    selectionManager.add__unsafe([element, element, element])
    selectionManager.clear()

    expect(selectionManager.currentSelection.length).toEqual(0)
  })

  it("can remove elements from its current selection.", () => {
    const firstElement = createSVGElement()
    const secondElement = createSVGElement()

    selectionManager.add([firstElement, secondElement])
    selectionManager.remove([firstElement])

    expect(selectionManager.currentSelection.length).toEqual(1)
  })

  it("doesn't blow up when you try to remove the same element multiple times.", () => {
    const element = createSVGElement()

    selectionManager.add([element, createSVGElement(), createSVGElement()])
    selectionManager.remove([element])
    expect(selectionManager.currentSelection.length).toEqual(2)
    selectionManager.remove([element, element])
    expect(selectionManager.currentSelection.length).toEqual(2)
  })
})
