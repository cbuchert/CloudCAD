const cliHistoryElement = document.getElementById('cli-history')
export const cliHistory: string[] = []

export const updateHistory: (value: string) => void = value => {
  cliHistoryElement.innerHTML += `${cliHistory.length ? '\n' : ''}${value}`
  cliHistory.push(value)
  cliHistoryElement.scrollTop = cliHistoryElement.scrollHeight
}
