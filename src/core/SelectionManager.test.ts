import { SelectionManager } from "./SelectionManager"

describe("SelectionManager", () => {
  const createSVGElement = () =>
    document.createElementNS("http://www.w3.org/2000/svg", "path")

  it("can safely add elements to its current selection.", () => {
    const selectionManager = new SelectionManager()
    const element = createSVGElement()

    selectionManager.addSafe([element])
    selectionManager.addSafe([element, element])

    expect(selectionManager.currentSelection.length).toEqual(1)
  })
})
