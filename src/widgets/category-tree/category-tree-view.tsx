"use client";

import CategoryTreeItem from "./category-tree-item";
import CategoryTreeDisplay from "./category-tree-display";
import type { TreeNode } from "./types";

export default function CategoryTreeView(props: { data: TreeNode }) {
  return (
    <CategoryTreeDisplay
      data={props.data}
      Node={({ name, attributes }) => (
        <CategoryTreeItem name={name} attributes={attributes!} />
      )}
    />
  );
}
