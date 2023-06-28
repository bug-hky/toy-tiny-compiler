import { Token, TokenTypes } from './tokenizer'

// 做类型推导和收窄时，类型一定要明确

export enum NodeTypes {
  Program,
  NumberLiteral,
  CallExpression,
  StringLiteral,
  ExpressionStatement,
  Identify,
}

export interface Node {
  type: NodeTypes
}

export interface NumberNode extends Node {
  type: NodeTypes.NumberLiteral;
  value: string;
}

export interface StringNode extends Node {
  type: NodeTypes.StringLiteral;
  value: string;
}

export interface CallExpressionNode extends Node {
  type: NodeTypes.CallExpression;
  name: string;
  params: ChildNode[];
}

export type ChildNode =  StringNode | NumberNode | CallExpressionNode;

export interface RootNode extends Node {
  type: NodeTypes.Program;
  body: ChildNode[];
}

const createRootNode = (): RootNode => {
  return {
    type: NodeTypes.Program,
    body: [],
  }
}

const createNumberNode = (value: string): NumberNode => {
  return {
    type: NodeTypes.NumberLiteral,
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

export const parser = (tokens: Token[]) => {

  let current = 0
  
  const rootNode = createRootNode()
  
  const walk = (): any => {

    let token = tokens[current]

    if (token.type === TokenTypes.Number) {
      current++
      return createNumberNode(token.value)
    }

    if (token.type === TokenTypes.Paren && token.value === '(') {
      token = tokens[++current]
      const callExpressionNode = createCallExpressionNode(token.value)
      
      token = tokens[++current]
      while (!(token.type === TokenTypes.Paren && token.value === ')')) {
        callExpressionNode.params.push(walk())
        token = tokens[current]
      }
      
      // jump last ')'
      current++
      return callExpressionNode
    }

    throw new Error('unknown token please input right params')
  }
  
  while (current < tokens.length) {
    rootNode.body.push(walk())
  }

  return rootNode
}