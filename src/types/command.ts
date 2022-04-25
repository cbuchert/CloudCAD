import { App } from "../core/App"

export type Command = (app: App, svg: SVGSVGElement) => Promise<void>
