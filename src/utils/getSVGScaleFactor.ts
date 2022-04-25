/**
 * Where do scale factors come from?
 * TL;DR: 1 SVG inch equals 96 reference pixels for 1:1 drawing. 1 cm is 1/2.54 of an inch.
 * https://www.w3.org/TR/css3-values/#reference-pixel
 * https://stackoverflow.com/a/21767407
 */
import { UnitOfMeasure } from "../types/unitOfMeasure"
import { Vec2 } from "../types/vec2"

const REFERENCE_PIXELS_PER_INCH = 96
const CENTIMETERS_PER_INCH = 2.54

export const getSVGScaleFactor = (
  viewPortSize: Vec2,
  domContainerSize: Vec2,
  unitOfMeasure: UnitOfMeasure
): number => {
  // Figure out the raw scale factor.
  const rawScaleFactor =
    domContainerSize.y / viewPortSize.y / (domContainerSize.x / viewPortSize.x)

  // Scale it for different systems of scale.
  switch (unitOfMeasure) {
    case "metric":
      return rawScaleFactor / (REFERENCE_PIXELS_PER_INCH / CENTIMETERS_PER_INCH)

    case "imperial":
      return rawScaleFactor / REFERENCE_PIXELS_PER_INCH

    default:
      return rawScaleFactor / REFERENCE_PIXELS_PER_INCH
  }
}
