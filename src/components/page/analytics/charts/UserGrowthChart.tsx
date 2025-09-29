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

// Sample data for multiple years (monthly user growth)
const userGrowthData = {
  2023: [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 430 },
    { month: "Mar", users: 810 },
    { month: "Apr", users: 880 }, // bigger jump
    { month: "May", users: 1350 }, // smaller jump
    { month: "Jun", users: 1400 }, // bigger jump
    { month: "Jul", users: 1650 }, // slower
    { month: "Aug", users: 1800 },
    { month: "Sep", users: 2750 },
    { month: "Oct", users: 2850 }, // smaller
    { month: "Nov", users: 3300 },
    { month: "Dec", users: 3800 }, // nice finish
  ],
  2024: [
    { month: "Jan", users: 4200 },
    { month: "Feb", users: 4550 },
    { month: "Mar", users: 5100 }, // faster
    { month: "Apr", users: 5500 },
    { month: "May", users: 6150 }, // slower
    { month: "Jun", users: 6900 },
    { month: "Jul", users: 7600 }, // faster
    { month: "Aug", users: 8250 },
    { month: "Sep", users: 9050 }, // bigger
    { month: "Oct", users: 9700 },
    { month: "Nov", users: 10600 }, // steady
    { month: "Dec", users: 11400 }, // end strong
  ],
  2025: [
    { month: "Jan", users: 10100 },
    { month: "Feb", users: 12350 }, // smaller
    { month: "Mar", users: 14100 }, // bigger
    { month: "Apr", users: 13450 }, // steady
    { month: "May", users: 16000 }, // bigger
    { month: "Jun", users: 15300 }, // smaller
    { month: "Jul", users: 19550 }, // bigger
    { month: "Aug", users: 18600 }, // steady
    { month: "Sep", users: 20800 }, // faster
    { month: "Oct", users: 19100 }, // slower
    { month: "Nov", users: 22500 }, // faster
    { month: "Dec", users: 24000 }, // strong finish
  ],
};

const chartConfig = {
  users: {
    label: "Users",
    color: "#0062EB", // green tone for growth
  },
} satisfies ChartConfig;

export function UserGrowthChart() {
  const [selectedYear, setSelectedYear] = React.useState("2025");

  const filteredData = userGrowthData[selectedYear] || [];

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xl">
            Monthly User Growth - {selectedYear}
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
            {Object.keys(userGrowthData)
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
              <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-users)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-users)"
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
              width={70}
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
              dataKey="users"
              type="natural"
              fill="url(#fillUsers)"
              stroke="var(--color-users)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
