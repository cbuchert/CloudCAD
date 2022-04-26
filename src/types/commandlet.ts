export type Commandlet = {
  title: string
  command: string
  callback: Function
}

export type ExecutableCommandlets = { [command: string]: Function }
