import { evaluate as mathjsEval } from 'mathjs'
import { promptAndExecute } from '../cli/cli'
import { outputToCLI, warnToCLI } from '../cli/cliCommandHistory'

export const evaluate = () => promptAndExecute('Expression to evaluate:', (value) => {
  try {
    const evaluated = mathjsEval(value)

    outputToCLI(`${value} = ${evaluated}`)
  } catch (e) {
    warnToCLI(e)
  }
})
