import { traverser, Visitor } from "./traverser"
import { NodeTypes, RootNode, NumberNode } from "./parser"

export const transformer = (ast: RootNode) => {

  const newAst:any = {
    type: NodeTypes.Program,
    body: []
  }

  ast.context = newAst.body;

  // 1. create new Ast & context
  // 2. callExpressionNode => ExpressionStatement & expression field & callee field
  // 3. append callExpressionNode => new ast 's context

  const visitor: Visitor = {
    [NodeTypes.CallExpression]: {
      enter (node, parent) {
        if (node.type === NodeTypes.CallExpression) {

          let expression: any = {
            type: NodeTypes.CallExpression,
            callee: {
              type: NodeTypes.Identify,
              name: node.name,
            },
            arguments: []
          }

          // create context field for accept sub number node content 
          node.context = expression.arguments

          if (parent?.type !== NodeTypes.CallExpression) {
            expression = {
              type: NodeTypes.ExpressionStatement,
              expression,
            }
          }

          parent?.context?.push(expression)
          
        }
      }
    },

    [NodeTypes.NumberLiteral]: {
      enter (node, parent) {
        if (node.type === NodeTypes.NumberLiteral) {
          const numberNode: NumberNode = {
            type: NodeTypes.NumberLiteral,
            value: node.value
          }

          // use context field for push content to parent node's arguments node 
          parent?.context?.push(numberNode)
        }
      }
    }
    
  }

  traverser(ast, visitor)

  return newAst
}