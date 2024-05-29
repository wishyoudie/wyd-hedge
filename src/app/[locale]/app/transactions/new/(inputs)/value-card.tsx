import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import FormulaInput from "./formula-input";

export default function ValueCard({
  className,
  currency,
}: {
  className?: string;
  currency?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Transaction Value</CardTitle>
        <CardDescription>
          Type the value of your transaction. This input also support formulae.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="value" className="sr-only">
              Value
            </Label>
            <FormulaInput name="value" className="w-full" right={currency} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
