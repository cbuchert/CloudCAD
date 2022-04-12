import { SelectionManager } from "./SelectionManager"

describe("SelectionManager", () => {
  let selectionManager: SelectionManager

  beforeEach(() => {
    selectionManager = new SelectionManager()
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
})
