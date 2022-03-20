import { App } from "../core/App"

export type Command = (app: App, svg: SVGElement) => void
