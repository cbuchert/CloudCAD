import { ICLIOutputManager } from "./CLIOutputManager"

export interface IKeypressManager {}

export class KeypressManager implements IKeypressManager {
  constructor(private cliOutputManager: ICLIOutputManager) {
    cliOutputManager.writeToCLI("  Initializing the Keypress Manager.")

    document.onkeydown = (e) => {
      switch (e.key) {
        case "Escape": {
          cliOutputManager.writeToCLI("\\\\")
        }
      }
    }
  }
}