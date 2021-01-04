import { CLI } from '../cli/cli'
import { evaluate } from './evaluate'

export type Command = ($workspace, cli: CLI) => void

const commands = {
  evaluate,
}

export default commands
