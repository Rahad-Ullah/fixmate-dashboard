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

// Sample data for multiple years
const earningsData = {
  2023: [
    { month: "Jan", earning: 1000 },
    { month: "Feb", earning: 1500 },
    { month: "Mar", earning: 1200 },
    { month: "Apr", earning: 1800 },
    { month: "May", earning: 1700 },
    { month: "Jun", earning: 2100 },
    { month: "Jul", earning: 1900 },
    { month: "Aug", earning: 2200 },
    { month: "Sep", earning: 2000 },
    { month: "Oct", earning: 2500 },
    { month: "Nov", earning: 2400 },
    { month: "Dec", earning: 2800 },
  ],
  2024: [
    { month: "Jan", earning: 1200 },
    { month: "Feb", earning: 1800 },
    { month: "Mar", earning: 1500 },
    { month: "Apr", earning: 2200 },
    { month: "May", earning: 2000 },
    { month: "Jun", earning: 2500 },
    { month: "Jul", earning: 2300 },
    { month: "Aug", earning: 2800 },
    { month: "Sep", earning: 2600 },
    { month: "Oct", earning: 3000 },
    { month: "Nov", earning: 2700 },
    { month: "Dec", earning: 3500 },
  ],
  2025: [
    { month: "Jan", earning: 1500 },
    { month: "Feb", earning: 1700 },
    { month: "Mar", earning: 2000 },
    { month: "Apr", earning: 2500 },
    { month: "May", earning: 2300 },
    { month: "Jun", earning: 2800 },
    { month: "Jul", earning: 2600 },
    { month: "Aug", earning: 3000 },
    { month: "Sep", earning: 2900 },
    { month: "Oct", earning: 3400 },
    { month: "Nov", earning: 3200 },
    { month: "Dec", earning: 3700 },
  ],
};

const chartConfig = {
  earning: {
    label: "Earning",
    color: "#0062EB",
  },
} satisfies ChartConfig;

export function EarningChart() {
  const [selectedYear, setSelectedYear] = React.useState("2025");

  const filteredData = earningsData[selectedYear] || [];

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xl">
            Monthly Earnings - {selectedYear}
          </CardTitle>
        </div>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a year"
          >
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {Object.keys(earningsData)
              .sort((a, b) => Number(b) - Number(a)) // latest year first
              .map((year) => (
                <SelectItem key={year} value={year}>
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
          <AreaChart data={filteredData}>
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
