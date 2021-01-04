import { Svg } from '@svgdotjs/svg.js'
import { CLI } from '../cli/cli'
import { evaluate } from './evaluate'

export type Command = ($workspace: Svg, cli: CLI) => void

const commands = {
  evaluate,
}

export default commands
