import { Command } from "../types/command"
import { pan } from "./pan"
import { zoom } from "./zoom"

export type CommandDictionary = { [command: string]: Command }

export const commands: CommandDictionary = {
  zoom,
  pan,
}
