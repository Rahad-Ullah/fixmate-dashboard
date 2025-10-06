"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useUpdateMultiSearchParams } from "@/hooks/useUpdateMultiSearchParams";

// get the last 5 years
const recentYears: number[] = [];
for (let i = 0; i < 5; i++) {
  recentYears.push(new Date().getFullYear() - i);
}

const chartConfig = {
  earning: {
    label: "Earning",
    color: "#0062EB",
  },
} satisfies ChartConfig;

export function EarningChart({
  data,
}: {
  data: { month: string; profit: number }[];
}) {
  const selectedYear =
    useSearchParams().get("year") || recentYears[0].toString();
  const updateSearchParams = useUpdateMultiSearchParams();

  const formattedData = data.map((item) => ({
    month: item.month,
    earning: item.profit,
  }));

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xl">
            Monthly Earnings - {selectedYear}
          </CardTitle>
        </div>
        <Select
          value={selectedYear}
          onValueChange={(value) => updateSearchParams({ year: value })}
        >
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a year"
          >
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {recentYears?.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="fillEarning" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-earning)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-earning)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={60}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="earning"
              type="monotone"
              fill="url(#fillEarning)"
              stroke="var(--color-earning)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
