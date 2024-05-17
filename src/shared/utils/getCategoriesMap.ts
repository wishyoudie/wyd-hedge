import type { TreeNode } from "@/widgets/category-tree/types";

export function getCategoriesMap(root: TreeNode): Record<number, string> {
  const result: Record<number, string> = {};
  const q = [root];

  while (q.length > 0) {
    const current = q.pop();
    if (current) {
      result[+current.attributes!.id!] = current.name;
      q.push(...current.children);
    }
  }

  return result;
}
