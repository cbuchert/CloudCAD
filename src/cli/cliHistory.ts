const cliHistoryElement = document.getElementById('cli-history')
export const cliHistory: string[] = []

const updateCliHistoryUi: (value: string) => void = value => {
  cliHistoryElement.innerHTML += value
  cliHistoryElement.scrollTop = cliHistoryElement.scrollHeight
}

const updateCliHistory: (value: string) => void = value => {
  cliHistory.push(value)
}

export const pushCommandToHistory: (command: string) => void = command => {
  updateCliHistory(command)
  updateCliHistoryUi(`<div class="cli-history--record">${command}</div>`)
}

export const pushWarningToHistory: (command: string, warning: string) => void = (command, warning) => {
  pushCommandToHistory(command)
  updateCliHistoryUi(`<div class="cli-history--warning">  ${warning}</div>`)
}
