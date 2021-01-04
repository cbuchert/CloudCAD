import { SVG } from '@svgdotjs/svg.js'
import './cli/cli'
import { formatXML } from './utils/formatXML'

const mountPoint = document.getElementById('model')
export const output = document.getElementById('code')
export const $workspace = SVG().addTo(mountPoint).size('100%', '100%')

const updateCode = () => {
  output.innerText = formatXML($workspace.svg())
}

$workspace.rect(100, 100)

updateCode()
