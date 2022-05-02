export const stateMachine = {
  initial: "shouldExecuteCommand",
  states: {
    shouldExecuteCommand: {
      on: {
        LISTEN_FOR_COMMANDLETS: "shouldExecuteCommandlet",
      },
    },
    shouldExecuteCommandlet: {
      on: {
        LISTEN_FOR_COMMANDS: "shouldExecuteCommand",
      },
    },
  },
}
