import { NodeTypes, RootNode, ChildNode } from "./parser"

export const traverser = (ast: ChildNode | RootNode, visitor) => {
  // 1. 深度优先搜索 2. visitor 实现
  const traverserArray = (childNodes: ChildNode[], parentNode: ChildNode | RootNode | null) => {
    childNodes.forEach((child) => {
      traverserNode(child, parentNode)
    })
  }

  const traverserNode = (node: ChildNode | RootNode, parentNode: ChildNode | RootNode | null) => {
    console.info('node', node);
    if (visitor[node.type].enter) {
      visitor[node.type].enter(node, parentNode);
    }

    switch (node.type) {
      case NodeTypes.NumberLiteral:
      case NodeTypes.StringLiteral:
        break;
      case NodeTypes.CallExpression:
        traverserArray(node.params, node);
        break;
      case NodeTypes.Program:
        traverserArray(node.body, node);
        break;
      default:
        throw new Error('unknow node type');
    }

    if (visitor[node.type].exit) {
      visitor[node.type].exit(node, parentNode);
    }
  }

  traverserNode(ast, null)

  // return ast
}