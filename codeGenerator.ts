import { RootNode, ChildNode, NodeTypes } from './parser';

/**
 *  *                  LISP                      C
 *
 *   2 + 2          (add 2 2)                 add(2, 2)
 *   4 - 2          (subtract 4 2)            subtract(4, 2)
 *   2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
*/

export const codeGenerator = (node: any): string => {
  
  switch (node.type) {
    case NodeTypes.Program:
      return node.body.map(codeGenerator).join('');
      break;
    case NodeTypes.ExpressionStatement:
      return codeGenerator(node.expression);
      break;
    case NodeTypes.CallExpression:
      return codeGenerator(node.callee) + '(' + node.arguments.map(codeGenerator).join(', ') + ')' 
      break;
    case NodeTypes.Identify:
      return node.name;
      break;
    case NodeTypes.NumberLiteral:
      return node.value;
      break;
    case NodeTypes.StringLiteral:
      return '"' + node.value + '"';
      break;
    default:
      throw new TypeError(node.type);
      break;
  }

}