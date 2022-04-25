import { Command } from "../types/command"

export const reinitialize: Command = async (app, svg) => {
  app.initialize()
}
