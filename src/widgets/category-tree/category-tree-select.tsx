import CategoryTreeDisplay from "./category-tree-display";
import type { TreeNode } from "./types";
import { getChildrenChain, getParentChain } from "@/shared/utils/treeChains";

type Props = {
  root: TreeNode;
  value: number[];
  setValue: (value: number[]) => void;
};

export default function CategoryTreeSelect({ root, value, setValue }: Props) {
  const handleItemClick = (id: number) => () => {
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
      Node={({ name, attributes }) => {
        if (attributes!.isRoot) {
          return (
            <div
              className={`rounded-xl bg-primary py-3 text-center text-primary-foreground shadow transition-colors`}
            >
              <h3 className="font-medium">All</h3>
            </div>
          );
        }
        const id = +attributes!.id!;
        const isSelected = value.includes(id);

        return (
          <div
            className={`rounded-xl border border-input bg-background py-3 text-center shadow-sm transition-colors hover:bg-accent ${isSelected ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
            onClick={handleItemClick(id)}
          >
            <h3 className="font-medium">{name}</h3>
          </div>
        );
      }}
    />
  );
}
