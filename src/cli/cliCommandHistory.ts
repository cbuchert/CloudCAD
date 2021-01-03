const cliHistoryElement = document.getElementById('cli-history')
export const cliCommandHistory: string[] = []

const updateCliHistoryUi: (value: string) => void = value => {
  cliHistoryElement.innerHTML += value
  cliHistoryElement.scrollTop = cliHistoryElement.scrollHeight
}

const updateCliCommandHistory: (value: string) => void = value => {
  cliCommandHistory.push(value)
}

export const commandToCLI: (command: string) => void = command => {
  updateCliCommandHistory(command)
  updateCliHistoryUi(`<div class="cli-history--record">${command}</div>`)
}

export const promptToCLI: (prompt: string) => void = prompt => {
  updateCliHistoryUi(`<div class="cli-history--prompt">  ${prompt}</div>`)
}

export const outputToCLI: (output: string) => void = output => {
  updateCliHistoryUi(`<div class="cli-history--output">  ${output}</div>`)
}

export const warnToCLI: (warning: string) => void = (warning) => {
  updateCliHistoryUi(`<div class="cli-history--warning">  ${warning}</div>`)
}
