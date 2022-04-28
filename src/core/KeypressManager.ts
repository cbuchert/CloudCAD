import { ICLIInputManager } from "./CLIInputManager"
import { ICLIOutputManager } from "./CLIOutputManager"

export interface IKeypressManager {}

export class KeypressManager implements IKeypressManager {
  constructor(
    private cliOutputManager: ICLIOutputManager,
    private cliInputManager: ICLIInputManager
  ) {
    cliOutputManager.writeToCLI("Initializing the Keypress manager.")

    document.onkeydown = (e) => {
      switch (e.key) {
        case "Escape": {
          cliOutputManager.writeToCLI("*** cancel ***")

          break
        }

        case " ": {
          this.cliInputManager.submit()

          break
        }

        case "Enter": {
          this.cliInputManager.submit()

          break
        }
      }
    }
  }
}
