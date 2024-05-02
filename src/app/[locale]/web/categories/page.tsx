import { getUserCategories } from "~/server/categories";
import CategoryTree, {
  type TreeNode,
} from "~/widgets/category-tree/category-tree";
import type { Category } from "~/server/db/schema";

function findParent(tree: TreeNode, id: number) {
  if (tree.attributes!.id === id) return tree;
  const q = [...tree.children];

  while (q.length > 0) {
    const current = q.pop()!;
    if (current.attributes!.id === id) return current;
    q.push(...current.children);
  }

  return null;
}

function toTreeData(categories: Category[]): TreeNode | null {
  let root;
  const q: Category[] = [];
  const extraQ: Category[] = [];
  for (const category of categories) {
    if (category.parentId === null) {
      root = category;
    } else {
      q.push(category);
    }
  }

  if (!root) {
    return null;
  }

  const result: TreeNode = {
    name: root.name,
    attributes: {
      id: root.id,
      isRoot: true,
    },
    children: [],
  };

  while (q.length > 0) {
    const current = q.pop()!;
    const parent = findParent(result, current.parentId!);

    if (!parent) {
      extraQ.push(current);
    } else {
      parent.children.push({
        name: current.name,
        attributes: {
          id: current.id,
          isRoot: false,
        },
        children: [],
      });
    }
  }

  while (extraQ.length > 0) {
    const current = extraQ.pop()!;
    const parent = findParent(result, current.parentId!);

    if (!parent) {
      return null;
    } else {
      parent.children.push({
        name: current.name,
        attributes: {
          id: current.id,
          isRoot: false,
        },
        children: [],
      });
    }
  }

  return result;
}

export default async function CategoriesPage() {
  const categories = await getUserCategories();

  const categoriesTreeData = toTreeData(categories);

  return (
    <div className="h-full space-y-4 p-8 pt-6">
      <header className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
      </header>
      {categoriesTreeData ? (
        <CategoryTree data={categoriesTreeData} />
      ) : (
        <div>No Valid Data</div>
      )}
    </div>
  );
}
