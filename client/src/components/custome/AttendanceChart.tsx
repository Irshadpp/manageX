import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A stacked bar chart with a legend for attendance overview";

// Sample attendance data (this will come from your API dynamically)
const chartData = [
  { date: "2024-09-01", present: 1, absent: 0, late: 0, halfDay: 0, onLeave: 0 },
  { date: "2024-09-02", present: 0, absent: 1, late: 0, halfDay: 0, onLeave: 0 },
  { date: "2024-09-03", present: 0, absent: 0, late: 1, halfDay: 0, onLeave: 0 },
  { date: "2024-09-04", present: 0, absent: 0, late: 0, halfDay: 1, onLeave: 0 },
  { date: "2024-09-05", present: 0, absent: 0, late: 0, halfDay: 0, onLeave: 1 },
];

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
  late: {
    label: "Late",
    color: "hsl(var(--chart-3))",
  },
  halfDay: {
    label: "Half Day",
    color: "hsl(var(--chart-4))",
  },
  onLeave: {
    label: "On Leave",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
        <CardDescription>September 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(5)} // Show day only (e.g., 01, 02)
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="present"
              stackId="a"
              fill="var(--color-present)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="absent"
              stackId="a"
              fill="var(--color-absent)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="late"
              stackId="a"
              fill="var(--color-late)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="halfDay"
              stackId="a"
              fill="var(--color-halfDay)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="onLeave"
              stackId="a"
              fill="var(--color-onLeave)"
              radius={[0, 0, 4, 4]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending attendance overview <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing attendance data for the selected date range
        </div>
      </CardFooter>
    </Card>
  );
}
