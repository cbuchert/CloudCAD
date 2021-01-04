export type WriteToCLI = (value: string) => void

const cliHistoryElement = document.getElementById('cli-history')
export const cliCommandHistory: string[] = []

const updateCliHistoryUi: WriteToCLI = value => {
  cliHistoryElement.innerHTML += value
  cliHistoryElement.scrollTop = cliHistoryElement.scrollHeight
}

const updateCliCommandHistory: WriteToCLI = value => {
  cliCommandHistory.push(value)
}

export const commandToCLI: WriteToCLI = command => {
  updateCliCommandHistory(command)
  updateCliHistoryUi(`<div class="cli-history--record">${command}</div>`)
}

export const promptToCLI: WriteToCLI = prompt => {
  updateCliHistoryUi(`<div class="cli-history--prompt">  ${prompt}</div>`)
}

export const outputToCLI: WriteToCLI = output => {
  updateCliHistoryUi(`<div class="cli-history--output">  ${output}</div>`)
}

export const warnToCLI: WriteToCLI = warning => {
  updateCliHistoryUi(`<div class="cli-history--warning">  ${warning}</div>`)
}
