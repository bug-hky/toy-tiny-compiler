import { NodeTypes, RootNode, ChildNode, CallExpressionNode } from "./parser"

// use CallExpressionNode type because only CallExpressionNode has subNodes in ChildNode 's SubType
export type ParentNode = RootNode | CallExpressionNode | undefined

export type VisitorOptionMethod = (node: RootNode | ChildNode, parent: ParentNode) => void

export interface VisitorOption {
  enter: VisitorOptionMethod;
  exit?: VisitorOptionMethod;
}

export interface StrictVisitor {
  [NodeTypes.Program]: VisitorOption;
  [NodeTypes.CallExpression]: VisitorOption;
  [NodeTypes.NumberLiteral]: VisitorOption;
  [NodeTypes.StringLiteral]: VisitorOption;
}

export type Visitor = Partial<StrictVisitor>


export const traverser = (ast: ChildNode | RootNode, visitor: Visitor) => {
  // 1. 深度优先搜索 2. visitor 实现
  const traverserArray = (
    childNodes: ChildNode[],
    parentNode: ParentNode
  ) => {
    childNodes.forEach((child) => {
      traverserNode(child, parentNode)
    })
  }

  const traverserNode = (node: ChildNode | RootNode, parentNode?: ParentNode) => {
    // console.info('node', node);

    const currentOption = visitor[node.type]
    if (currentOption) {
      currentOption.enter(node, parentNode);
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
        throw new Error('unknown node type');
    }

    if (currentOption && currentOption.exit) {
      currentOption.exit(node, parentNode);
    }
  }

  traverserNode(ast)

}