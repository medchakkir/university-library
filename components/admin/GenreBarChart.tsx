"use client";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Books",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function GenreBarChart({
  chartData,
}: {
  chartData: { genre: string; count: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Books by Genre</CardTitle>
        <CardDescription>How many books per genre?</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="genre"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Genre diversity looking good! <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Based on current catalog
        </div>
      </CardFooter>
    </Card>
  );
}
