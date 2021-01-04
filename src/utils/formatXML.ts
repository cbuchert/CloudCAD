type FormatXML = (xml: string, tab?: string) => string

export const formatXML: FormatXML = (xml, tab = '  ') => {
  let formatted = ''
  let indent = ''

  xml.split(/>\s*</).forEach(function (node) {
    // Decrease indent
    if (node.match(/^\/\w/)) indent = indent.substring(tab.length)

    formatted += indent + '<' + node + '>\r\n'

    // Increase indent
    if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab
  })

  return formatted.substring(1, formatted.length - 3)
}
