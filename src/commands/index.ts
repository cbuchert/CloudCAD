import { updateHistory } from '../cli/cliHistory'

export const execute: (command: string) => void = (command) => {
  switch (command) {
    default:
      updateHistory('<span class="cli-history--warning">Not a valid command.</span>')
      break
  }
}
