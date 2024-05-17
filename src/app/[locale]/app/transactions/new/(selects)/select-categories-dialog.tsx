"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertOctagon } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import CategoryTreeSelect from "@/widgets/category-tree/category-tree-select";
import type { TreeNode } from "@/widgets/category-tree/types";
import { getCategoriesMap } from "@/shared/utils/getCategoriesMap";
import { Badge } from "@/components/ui/badge";

export function SelectCategoriesDialog(props: { categories: TreeNode }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number[]>([]);
  const categoriesMap = useMemo(
    () => getCategoriesMap(props.categories),
    [props.categories],
  );

  return (
    <>
      <input type="hidden" name="categories" value={value.join("_")} />
      <div>
        {value.map((id) => {
          const name = categoriesMap[id];
          return name === "root" ? null : (
            <Badge key={id}>{categoriesMap[id]}</Badge>
          );
        })}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost" className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[80vh] max-w-screen-xl">
          <div className="grid grid-cols-3 gap-4 ">
            <div className="col-span-2">
              <CategoryTreeSelect
                root={props.categories}
                value={value}
                setValue={setValue}
              />
            </div>
            <div className="flex flex-col justify-between p-8 pb-0">
              <div>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Select Categories
                </h3>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Используйте ваше Древо, чтобы добавить категории к этой
                  операции.
                </p>
                <Alert className="mt-6">
                  <AlertOctagon className="size-4" />
                  <AlertTitle>Обратите внимание</AlertTitle>
                  <AlertDescription>
                    При выборе категории помимо нее также добавляются все ее
                    предки.
                  </AlertDescription>
                </Alert>
              </div>
              <div className="grid gap-2">
                <Button onClick={() => setValue([])} variant="outline">
                  Clear Selection
                </Button>
                <Button onClick={() => setOpen(false)}>Done</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
