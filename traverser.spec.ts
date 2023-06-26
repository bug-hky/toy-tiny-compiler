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
  expect(traverser(ast)).toEqual({
      
  })
})