export type Command = (
  svg: SVGElement,
  getInput: (input: string) => Promise<void>,
  writeToPrompt: (value: string) => void,
  parameters: string[]
) => void
