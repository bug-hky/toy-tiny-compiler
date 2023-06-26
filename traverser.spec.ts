import { expect, test } from "vitest"
import { NodeTypes } from "./parser"
import { traverser } from "./traverser"

test('traverser ast', () => {
  const ast = {
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

  const options: any = {
    Program: {
      enter (node, parent) {
        callbacks.push('program-enter')
      },
      exit (node, parent) {
        callbacks.push('program-exit')
      }
    },
    CallExpression: {
      enter (node, parent) {
        callbacks.push('call-expression-enter')
      },
      exit (node, parent) {
        callbacks.push('call-expression-exit')
      }
    },
    NumberLiteral: {
      enter (node, parent) {
        callbacks.push('number-literal-enter')
      },
      exit (node, parent) {
        callbacks.push('number-literal-exit')
      }
    },
  }

  traverser(ast, options);
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
    'program-enter',  
    'call-expression-enter',  
    'number-literal-enter',
    'number-literal-exit',
    'call-expression-enter',  
    'number-literal-enter',
    'number-literal-exit',
    'number-literal-enter',
    'number-literal-exit',
    'call-expression-exit',
    'call-expression-exit',
    'program-exit',
  ])
})