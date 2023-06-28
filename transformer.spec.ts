import { expect, test } from "vitest"
import { NodeTypes, RootNode } from "./parser"
import { originalAst } from "./parser.spec"
import { traverser, Visitor } from "./traverser"
import { transformer } from "./transformer"

test('transformer ast equal old ast', () => {
  const newAst: RootNode = {
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

  expect(originalAst).toEqual(newAst)
})

test('transformer ast', () => {

  const transformerAst: any = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.ExpressionStatement,
        expression: {
          type: NodeTypes.CallExpression,
          callee: {
            type: NodeTypes.Identify,
            name: 'add',
          },
          arguments: [
            {
              type: NodeTypes.NumberLiteral,
              value: '2'
            },
            {
              type: NodeTypes.CallExpression,
              callee: {
                type: NodeTypes.Identify,
                name: 'subtract',
              },
              arguments: [
                {
                  type: NodeTypes.NumberLiteral,
                  value: '4'
                },
                {
                  type: NodeTypes.NumberLiteral,
                  value: '2'
                }
              ]
            }
          ]
        }
      }
    ]
  }
  
  expect(transformer(originalAst)).toEqual(transformerAst)
})