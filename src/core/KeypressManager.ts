import { ICLIInputManager } from "./CLIInputManager/CLIInputManager"
import { ICLIOutputManager } from "./CLIOutputManager"
import { ICommandManager } from "./CommandManager/CommandManager"

export interface IKeypressManager {}

export class KeypressManager implements IKeypressManager {
  constructor(
    private cliOutputManager: ICLIOutputManager,
    private cliInputManager: ICLIInputManager,
    private commandManager: ICommandManager,
  ) {
    cliOutputManager.writeToCLI("Initializing the Keypress manager.")

    document.onkeydown = (e) => {
      switch (e.key) {
        case "Escape": {
          cliOutputManager.writeToCLI("*** cancel ***")
          this.cliInputManager.clear()
          this.commandManager.reset()

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
