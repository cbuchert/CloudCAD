import { execute } from '../commands'

const cliFormElement = document.getElementById('cli') as HTMLFormElement
const cliInputElement = document.getElementById('cli-input') as HTMLInputElement

cliFormElement.onsubmit = (e) => {
  e.preventDefault()

  const input: string = e.target[ 0 ].value

  cliInputElement.value = ''
  execute(input)
}
