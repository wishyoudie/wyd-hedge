import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputName({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Transaction Name</CardTitle>
        <CardDescription>
          Add a identifiable name for your transaction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name" className="sr-only">
              Name
            </Label>
            <Input
              name="name"
              type="text"
              className="w-full"
              placeholder="Morning Latte"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
