import { getOperationsWithCategories } from "~/server/operations";

export default async function CategoriesPage() {
  const operations = await getOperationsWithCategories();

  return (
    <>
      <h1>Categories</h1>
      <blockquote>
        <pre>{JSON.stringify(operations, null, " ")}</pre>
      </blockquote>
    </>
  );
}
