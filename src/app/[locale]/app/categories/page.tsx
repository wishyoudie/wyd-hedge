import { getUserCategoriesTree } from "@/server/categories";
import CategoryTreePlaceholder from "@/widgets/category-tree/category-tree-empty";
import CategoryTreeView from "@/widgets/category-tree/category-tree-view";

export default async function CategoriesPage() {
  const categories = await getUserCategoriesTree();

  return (
    <div className="h-[calc(100vh-100px)] space-y-4 p-8 pt-2">
      <header className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
      </header>
      <main className="container h-full pb-4">
        {typeof categories === "number" ? (
          <CategoryTreePlaceholder rootId={categories} />
        ) : categories ? (
          <CategoryTreeView data={categories} />
        ) : (
          <div>No valid data</div>
        )}
      </main>
    </div>
  );
}
