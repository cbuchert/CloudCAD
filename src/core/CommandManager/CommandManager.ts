import { createMachine, interpret } from "@xstate/fsm"
import { commands } from "../../commands"
import { Commandlet, ExecutableCommandlets } from "../../types/commandlet"
import { aliases } from "../aliases"
import { App } from "../App"
import { ICLIOutputManager } from "../CLIOutputManager"
import { stateMachine } from "./stateMachine"

export interface ICommandManager {
  execute: (command: string) => void
  executeFromCommandlets: (commandlets: Commandlet[]) => void
  reset: () => void
}

export class CommandManager implements ICommandManager {
  private stateMachine
  private _previousCommand = ""
  private workingExecutableCommandlets: ExecutableCommandlets = {}

  constructor(
    private app: App,
    private svg: SVGSVGElement,
    private cliOutputManager: ICLIOutputManager,
  ) {
    cliOutputManager.writeToCLI("Initializing the Command manager.")

    this.stateMachine = interpret(createMachine(stateMachine)).start()
  }

  execute = (command: string) => {
    switch (this.stateMachine.state.value) {
      case "shouldExecuteCommand":
        this._handleCommand(command)
        break

      case "shouldExecuteCommandlet":
        this._handleCommandlets(command)
        break
    }
  }

  executeFromCommandlets = (commandlets: Commandlet[]) => {
    const executableCommandlets = commandlets.reduce(
      (acc, commandlet) => ({
        ...acc,
        [commandlet.command]: commandlet.callback,
      }),
      {},
    )

    this.workingExecutableCommandlets = executableCommandlets

    this.cliOutputManager.writeToCLI(
      commandlets
        .map(({ title, command }) => `[${command}] ${title}`)
        .join("    "),
      2,
    )

    this.stateMachine.send("LISTEN_FOR_COMMANDLETS")
  }

  reset = () => {
    this.workingExecutableCommandlets = {}
    this.stateMachine.send("LISTEN_FOR_COMMANDS")
  }

  private _handleCommand = (input: string) => {
    if (input) {
      this._attemptToExecuteCommand(input)
    } else {
      this.cliOutputManager.writeToCLI(
        `Executing previous command (${this._previousCommand})`,
      )
      this._attemptToExecuteCommand(this._previousCommand)
    }
  }

  private _attemptToExecuteCommand = (command: string) => {
    if (command in commands) {
      //  Execute command
      this._previousCommand = command
      this.app.cliOutputManager.writeToCLI(command)
      this._executeCommand(command)
    } else if (command in aliases) {
      //  Execute the command that the alias is pointing to.
      // @ts-ignore
      const aliasedCommand: string = aliases[command]
      this._previousCommand = aliasedCommand

      this.app.cliOutputManager.writeToCLI(`${command} (${aliasedCommand})`)
      this._executeCommand(aliasedCommand)
    } else {
      //  Write an error message to the CLI output.
      this.app.cliOutputManager.writeToCLI(
        `"${command}" - Invalid command or alias.`,
      )
    }
  }

  private _executeCommand = (command: string) => {
    return commands[command](this.app, this.svg)
  }

  private _handleCommandlets = (input: string) => {
    if (input && input.toUpperCase() in this.workingExecutableCommandlets) {
      this.workingExecutableCommandlets[input.toUpperCase()]()
      this.workingExecutableCommandlets = {}
      this.stateMachine.send("LISTEN_FOR_COMMANDS")
    } else {
      this.cliOutputManager.writeToCLI(`"${input}" not recognized.`, 4)
    }
  }
}
