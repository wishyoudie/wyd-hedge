import type { TreeNode } from "@/widgets/category-tree/types";

export function getParentChain(root: TreeNode, id: number) {
  function dfs(node: TreeNode, currentPath: number[]): number[] | null {
    const nodeId = +node.attributes!.id!;

    if (!node) {
      return null;
    }
    currentPath.push(+node.attributes!.id!);

    if (nodeId === id) {
      return currentPath.slice();
    }

    for (const child of node.children) {
      const result = dfs(child, currentPath);
      if (result) {
        return result;
      }
    }

    currentPath.pop();
    return null;
  }

  return dfs(root, []);
}

export function getChildrenChain(root: TreeNode, targetId: number) {
  function findNode(node: TreeNode, targetId: number): TreeNode | null {
    if (!node) return null;
    const nodeId = +node.attributes!.id!;
    if (nodeId === targetId) return node;
    for (const child of node.children) {
      const found = findNode(child, targetId);
      if (found) return found;
    }
    return null;
  }

  function dfs(node: TreeNode, currentPath: number[], result: number[]) {
    if (!node) return;
    const nodeId = +node.attributes!.id!;
    currentPath.push(nodeId);

    if (node.children.length === 0) {
      result.push(...currentPath.slice());
    } else {
      for (const child of node.children) {
        dfs(child, currentPath, result);
      }
    }

    currentPath.pop();
  }

  const result: number[] = [];
  const targetNode = findNode(root, targetId);
  if (targetNode) {
    dfs(targetNode, [], result);
  }
  return result;
}
