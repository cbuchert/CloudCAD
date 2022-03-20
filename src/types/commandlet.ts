import { App } from "../core/App"

export type Commandlet = {
  name: string
  description: string
  command: string
  children: Commandlet[]
  callback: (app: App, svg: SVGElement) => void
}
