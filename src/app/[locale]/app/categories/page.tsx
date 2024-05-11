import { getUserCategories } from "@/server/categories";
import { toTreeData } from "./toTreeData";
import CategoryTreePlaceholder from "@/widgets/category-tree/category-tree-empty";
import CategoryTree from "@/widgets/category-tree/category-tree";

export default async function CategoriesPage() {
  const categories = await getUserCategories();

  if (categories.length < 2) {
    return (
      <div className="h-full space-y-4 p-8 pt-6">
        <header className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        </header>
        <CategoryTreePlaceholder rootId={categories[0]!.id} />
      </div>
    );
  }

  const categoriesTreeData = toTreeData(categories);

  if (!categoriesTreeData) return <div>No valid data</div>;

  return (
    <main className="container h-[calc(100vh-88px)] pb-4">
      <div className="flex items-center justify-between py-4">
        <h1 className="whitespace-nowrap text-xl font-semibold tracking-tight">
          Categories
        </h1>
      </div>
      <CategoryTree data={categoriesTreeData} />
    </main>
  );
}
