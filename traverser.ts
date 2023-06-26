import { NodeTypes, RootNode, ChildNode } from "./parser"

export const traverser = (ast: RootNode, visitor) => {
  // 1. 深度优先搜索 2. visitor 实现
  const traverserArray = (childNodes: ChildNode[]) => {
    childNodes.forEach((child) => {
      traverserNode(child)
    })
  }

  const traverserNode = (node: ChildNode | RootNode) => {
    console.info('node', node);
    switch (node.type) {
      case NodeTypes.NumberLiteral:
        console.info('number', node);
        break;
      case NodeTypes.CallExpression:
        traverserArray(node.params);
        break;
      case NodeTypes.Program:
        traverserArray(node.body);
        break;
      default:
        break;
    }
  }

  traverserNode(ast)

  // return ast
}