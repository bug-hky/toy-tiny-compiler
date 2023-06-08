import { expect, test } from 'vitest'
import { tokenizer, TokenTypes } from './tokenizer'
import { parserSingleNumber, NodeTypes } from './parser'

test('left paren', () => {
  const code = '('
  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('right paren', () => {
  const code = ')'
  const tokens = [
    { type: TokenTypes.Paren, value: ')' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('name', () => {
  const code = 'add'
  const tokens = [
    { type: TokenTypes.Name, value: 'add' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('number', () => {
  const code = '12'
  const tokens = [
    { type: TokenTypes.Number, value: '12' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('(add 2 6)', () => {
  const code = ' ( add 2 6 ) '
  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Number, value: '6' },
    { type: TokenTypes.Paren, value: ')' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('tokenizer', () => {
  const code = '(add 2 (subtract 4 2))'
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

  expect(tokenizer(code)).toEqual(tokens)
})


// parser part

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
        type: NodeTypes.Number,
        value: '2'
      }
    ]
  }

  expect(parserSingleNumber(tokens)).toEqual(ast)
})