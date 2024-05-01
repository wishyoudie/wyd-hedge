"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/card/card";

type Props = {
  // data
  className?: string;
};

const data = [
  { value: 12, date: "2024-12-12" },
  { value: 9, date: "2024-12-11" },
  { value: 15, date: "2024-12-10" },
  { value: 20, date: "2024-12-9" },
];

export default function OperationsByDayChart(props: Props) {
  return (
    <Card className={props.className}>
      <CardHeader>
        <CardTitle>Operations</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" minHeight={300}>
          <LineChart width={500} height={200} data={data}>
            <CartesianGrid stroke="hsl(var(--muted))" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              dataKey="value"
              type="monotone"
              name="Operations"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
