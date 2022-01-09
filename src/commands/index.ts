import { Command } from "../types/command"
import { pan } from "./pan"
import { zoom } from "./zoom"

export const commands: { [ command: string ]: Command } = {
  zoom,
  pan,
}
