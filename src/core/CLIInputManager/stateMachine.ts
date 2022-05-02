export const stateMachine = {
  initial: "isListeningForCommands",
  states: {
    isListeningForCommands: {
      on: {
        GET_VALUE: "isListeningForRawValue",
      },
    },
    isListeningForRawValue: {
      on: {
        EXECUTE_COMMAND: "isListeningForCommands",
      },
    },
  },
}
