import { evaluate } from 'mathjs'
import { promptAndExecute } from '../cli/cli'
import { outputToCli, warnToCli } from '../cli/cliCommandHistory'

const commands = {
  evaluate: () => promptAndExecute('Expression to evaluate:', (value) => {
    try {
      const evaluated = evaluate(value)

      outputToCli(`${value} = ${evaluated}`)
    } catch (e) {
      warnToCli(e)
    }
  })
}

export default commands
