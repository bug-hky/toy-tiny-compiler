import { expect, test } from "vitest"
import { NodeTypes, RootNode } from "./parser"
import { traverser, Visitor } from "./traverser"

test('traverser ast', () => {
  const ast: RootNode = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: '2'
          },
          {
            type: NodeTypes.CallExpression,
            name: 'subtract',
            params: [
              {
                type: NodeTypes.NumberLiteral,
                value: '4'
              },
              {
                type: NodeTypes.NumberLiteral,
                value: '2'
              }
            ]
          },
        ]
      },
    ]
  }

  const callbacks: any = []


  const visitor: Visitor = {
    [NodeTypes.Program]: {
      enter (node) {
        callbacks.push(['program-enter', node.type, null])
      },
      exit (node) {
        callbacks.push(['program-exit', node.type, null])
      }
    },
    [NodeTypes.CallExpression]: {
      enter (node, parent) {
        callbacks.push(['call-expression-enter', node.type, parent!.type])
      },
      exit (node, parent) {
        callbacks.push(['call-expression-exit', node.type, parent!.type])
      }
    },
    [NodeTypes.NumberLiteral]: {
      enter (node, parent) {
        callbacks.push(['number-literal-enter', node.type, parent!.type])
      },
      exit (node, parent) {
        callbacks.push(['number-literal-exit', node.type, parent!.type])
      }
    },
    [NodeTypes.StringLiteral]: {
      enter (node, parent) {
        callbacks.push(['string-literal-enter', node.type, parent!.type])
      },
      exit (node, parent) {
        callbacks.push(['string-literal-exit', node.type, parent!.type])
      }
    },
  }

  traverser(ast, visitor)
  // console.info('callbacks-', callbacks)
  // -> Program (enter)
  //   -> CallExpression (enter)
  //     -> Number Literal (enter)
  //     <- Number Literal (exit)
  //     -> Call Expression (enter)
  //        -> Number Literal (enter)
  //        <- Number Literal (exit)
  //        -> Number Literal (enter)
  //        <- Number Literal (exit)
  //     <- CallExpression (exit)
  //   <- CallExpression (exit)
  // <- Program (exit)

  expect(callbacks).toEqual([
    ['program-enter', NodeTypes.Program, null ],  
    ['call-expression-enter', NodeTypes.CallExpression, NodeTypes.Program ],
    ['number-literal-enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression ],
    ['number-literal-exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression ],
    ['call-expression-enter', NodeTypes.CallExpression, NodeTypes.CallExpression ],
    ['number-literal-enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression ],
    ['number-literal-exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression ],
    ['number-literal-enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression ],
    ['number-literal-exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression ],
    ['call-expression-exit', NodeTypes.CallExpression, NodeTypes.CallExpression ],
    ['call-expression-exit', NodeTypes.CallExpression, NodeTypes.Program ],
    ['program-exit', NodeTypes.Program, null ],
  ])
})