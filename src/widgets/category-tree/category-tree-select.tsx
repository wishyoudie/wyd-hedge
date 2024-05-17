import CategoryTreeDisplay from "./category-tree-display";
import TreeItemView from "./tree-item-view";
import type { TreeNode } from "./types";
import { getChildrenChain, getParentChain } from "@/shared/utils/treeChains";

type Props = {
  root: TreeNode;
  value: number[];
  setValue: (value: number[]) => void;
};

export default function CategoryTreeSelect({ root, value, setValue }: Props) {
  const handleItemClick = (id: number) => {
    const current = [...value];
    if (current.includes(id)) {
      const children = getChildrenChain(root, id);

      setValue(current.filter((it) => it != id && !children.includes(it)));
    } else {
      const parents = getParentChain(root, id) ?? [];
      for (const parent of parents) {
        if (!current.includes(parent)) {
          current.push(parent);
        }
      }
      setValue(current);
    }
  };

  return (
    <CategoryTreeDisplay
      data={root}
      Node={(name, attributes) => {
        const isSelected = value.includes(+attributes!.id!);

        return (
          <TreeItemView
            className={
              isSelected
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : ""
            }
            name={name}
            attributes={attributes}
            onClick={handleItemClick}
          />
        );
      }}
    />
  );
}
