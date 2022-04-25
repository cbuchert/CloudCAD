export const getSVGPointFromClickEvent = (
  e: MouseEvent,
  svg: SVGSVGElement
): SVGPoint => {
  const point = svg.createSVGPoint()

  point.x = e.clientX
  point.y = e.clientY

  return point.matrixTransform(svg.getScreenCTM()?.inverse())
}
