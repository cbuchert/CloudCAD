import { SVG } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.panzoom.js'
import './cli/cli'
import { formatXML } from './utils/formatXML'

const mountPoint = document.getElementById('model')
export const output = document.getElementById('code')
export const $workspace = SVG().addTo('#model').size('100%', '100%').viewbox(0, 0, mountPoint.offsetWidth, mountPoint.offsetHeight).panZoom()

const updateCode = () => {
  output.innerText = formatXML($workspace.svg())
}

$workspace.on('panning', updateCode)
$workspace.on('zoom', updateCode)

$workspace.rect(100, 100).x(100).y(100).stroke('#00ff00')

updateCode()
