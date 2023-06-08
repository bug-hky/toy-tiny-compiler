import { Token, TokenTypes } from './tokenizer'

export enum NodeTypes {
  Root,
  Number,
  CallExpression,
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

interface CallExpressionNode extends Node {
  name: string;
  params: any[];
}

const createRootNode = (): RootNode => {
  return {
    type: NodeTypes.Root,
    body: [],
  }
}

const createNumberNode = (value: string): NumberNode => {
  return {
    type: NodeTypes.Number,
    value,
  }
}

const createCallExpressionNode = (name: string): CallExpressionNode => {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: []
  }
}

export const parserSingleNumber = (tokens: Token[]) => {

  let current = 0
  let token = tokens[current]

  const rootNode = createRootNode()

  if (token.type === TokenTypes.Number) {
    rootNode.body.push(createNumberNode(token.value))
  }

  return rootNode
}

export const parserCallExpression = (tokens: Token[]) => {

  let current = 0
  let token = tokens[current]

  const rootNode = createRootNode()

  if (token.type === TokenTypes.Paren && token.value === '(') {
    token = tokens[++current]
    const callExpressionNode = createCallExpressionNode(token.value)
    
    token = tokens[++current]
    while (!(token.type === TokenTypes.Paren && token.value === ')')) {
      if (token.type === TokenTypes.Number) {
        callExpressionNode.params.push(createNumberNode(token.value))
        token = tokens[++current]
      }
    }
    
    // jump last ')'
    current++
    rootNode.body.push(callExpressionNode)
  }

  return rootNode
}