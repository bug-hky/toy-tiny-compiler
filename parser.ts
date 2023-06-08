import { Token, TokenTypes } from './tokenizer'

export enum NodeTypes {
  Program,
  Number,
}

interface Node {
  type: NodeTypes
}

interface RootNode extends Node {
  body: Node[];
}

interface NumberNode extends Node {
  value: string;
}


export const parserSingleNumber = (tokens: Token[]) => {

  let current = 0
  let token = tokens[current]

  const createRootNode = (): RootNode => {
    return {
      type: NodeTypes.Program,
      body: [],
    }
  }

  const createNumberNode = (value: string): NumberNode => {
    return {
      type: NodeTypes.Number,
      value,
    }
  }

  const rootNode = createRootNode()

  if (token.type === TokenTypes.Number) {
    rootNode.body.push(createNumberNode(token.value))
  }

  return rootNode
}