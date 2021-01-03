import { evaluate } from 'mathjs'
import { promptAndExecute } from '../cli/cli'
import { outputToCLI, warnToCLI } from '../cli/cliCommandHistory'

const commands = {
  evaluate: () => promptAndExecute('Expression to evaluate:', (value) => {
    try {
      const evaluated = evaluate(value)

      outputToCLI(`${value} = ${evaluated}`)
    } catch (e) {
      warnToCLI(e)
    }
  })
}

export default commands
