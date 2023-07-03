import { codeGenerator } from './codeGenerator'
import { tokenizer } from './tokenizer'
import { parser } from './parser'
import { transformer } from './transformer'
// traverser has already import in transformer, so do not need repeat import traverser
// import { traverser } from './traverser'

export const compiler = (input: string): string => {
  const tokens = tokenizer(input)
  const ast = parser(tokens)
  const newAst = transformer(ast)
  const newCode = codeGenerator(newAst)
  return newCode
}