import { expect, test } from 'vitest'
import { TokenTypes } from './tokenizer'
import { parserSingleNumber, parserCallExpression, parser, NodeTypes } from './parser'

test('parser single number', () => {
  const tokens = [
    {
      type: TokenTypes.Number,
      value: '2'
    }
  ]

  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.NumberLiteral,
        value: '2'
      }
    ]
  }

  expect(parserSingleNumber(tokens)).toEqual(ast)
})

test('parser callExpression', () => {
  const tokens = [
    { type: TokenTypes.Paren,  value: '('        },
    { type: TokenTypes.Name,   value: 'add'      },
    { type: TokenTypes.Number, value: '2'        },
    { type: TokenTypes.Number, value: '4'        },
    { type: TokenTypes.Paren,  value: ')'        },
  ]

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
            type: NodeTypes.NumberLiteral,
            value: '4'
          }
        ]
      }
    ]
  }

  expect(parserCallExpression(tokens)).toEqual(ast)
})

test('parser loop', () => {
  const tokens = [
    { type: TokenTypes.Paren,  value: '('        },
    { type: TokenTypes.Name,   value: 'add'      },
    { type: TokenTypes.Number, value: '2'        },
    { type: TokenTypes.Number, value: '4'        },
    { type: TokenTypes.Paren,  value: ')'        },
    { type: TokenTypes.Paren,  value: '('        },
    { type: TokenTypes.Name,   value: 'add'      },
    { type: TokenTypes.Number, value: '2'        },
    { type: TokenTypes.Number, value: '4'        },
    { type: TokenTypes.Paren,  value: ')'        },
  ]

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
            type: NodeTypes.NumberLiteral,
            value: '4'
          }
        ]
      },
      {
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: '2'
          },
          {
            type: NodeTypes.NumberLiteral,
            value: '4'
          }
        ]
      }
    ]
  }

  expect(parser(tokens)).toEqual(ast)
})

test('parser', () => {
  const tokens = [
    { type: TokenTypes.Paren,  value: '('        },
    { type: TokenTypes.Name,   value: 'add'      },
    { type: TokenTypes.Number, value: '2'        },
    { type: TokenTypes.Paren,  value: '('        },
    { type: TokenTypes.Name,   value: 'subtract' },
    { type: TokenTypes.Number, value: '4'        },
    { type: TokenTypes.Number, value: '2'        },
    { type: TokenTypes.Paren,  value: ')'        },
    { type: TokenTypes.Paren,  value: ')'        },
  ]

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

  expect(parser(tokens)).toEqual(ast)
})