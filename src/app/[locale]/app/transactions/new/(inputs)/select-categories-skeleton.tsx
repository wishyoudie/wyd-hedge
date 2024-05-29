import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function SelectCategoriesSkeleton() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Select your transaction categories</CardDescription>
      </CardHeader>
      <CardFooter className="justify-center border-t p-4">
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Add Category
        </Button>
      </CardFooter>
    </Card>
  );
}
