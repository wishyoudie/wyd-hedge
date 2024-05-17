import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserCategoriesTree } from "@/server/categories";
import { PlusCircle } from "lucide-react";
import { SelectCategoriesDialog } from "./select-categories-dialog";

export default async function SelectCategories() {
  const categories = await getUserCategoriesTree();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Select your transaction categories</CardDescription>
      </CardHeader>
      <CardFooter className="justify-center border-t p-4">
        {categories && typeof categories !== "number" ? (
          <SelectCategoriesDialog categories={categories} />
        ) : (
          <Button size="sm" variant="ghost" className="gap-1" disabled>
            <PlusCircle className="h-3.5 w-3.5" />
            Unable to add categories
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
