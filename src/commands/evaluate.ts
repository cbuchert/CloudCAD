import { evaluate as mathjsEval } from 'mathjs'
import { Command } from './index'

export const evaluate: Command = ($workspace, cli) => cli.inputAndExecute('Expression to evaluate:', (value) => {
  try {
    const evaluated = mathjsEval(value)

    cli.output(`${value} = ${evaluated}`)
  } catch (e) {
    cli.warn(e)
  }
})
