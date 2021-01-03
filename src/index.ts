import { SVG } from '@svgdotjs/svg.js'
import './cli/cli'

const mountPoint = document.getElementById('model')
export const output = document.getElementById('code')
export const $workspace = SVG().addTo(mountPoint).size('100%', '100%')

const updateCode = () => {
  output.innerText = $workspace.svg()
}

output.addEventListener('updateCodeOutput', updateCode)
output.dispatchEvent(new Event('updateCodeOutput'))

$workspace.rect(100, 100)
