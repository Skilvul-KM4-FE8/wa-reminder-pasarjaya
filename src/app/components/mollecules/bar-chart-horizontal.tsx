"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useGetRukos } from "@/app/utils/useGetRuko";

export const description = "A horizontal bar chart";

const chartConfig = {
  contracts: {
    label: "Contracts Due",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function ChartBarHorizontal() {
  const { data, isLoading, error } = useGetRukos();
  console.log(data);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  // Group contracts by month
  // First, define the Ruko type (adjust according to your actual data structure)
  type Ruko = {
    id: string;
    name: string;
    phone: string;
    contractDue?: string | Date; // Assuming contractDue can be string or Date
    createdAt: string | Date;
    updatedAt: string | Date;
    // ... other fields
  };

  // Then modify the data processing part with proper typing
  const groupContractsByMonth = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const;

    // Initialize monthly counts with 0 for each month
    const monthlyCounts: Record<(typeof monthNames)[number], number> = monthNames.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {} as Record<(typeof monthNames)[number], number>);

    data?.forEach((ruko: Ruko) => {
      if (ruko.contractDue) {
        try {
          // Handle both string and Date contractDue values
          const dueDate = ruko.contractDue instanceof Date ? ruko.contractDue : new Date(ruko.contractDue);

          // Only proceed if we got a valid date
          if (!isNaN(dueDate.getTime())) {
            const monthIndex = dueDate.getMonth();
            if (monthIndex >= 0 && monthIndex < monthNames.length) {
              const monthName = monthNames[monthIndex];
              monthlyCounts[monthName]++;
            }
          }
        } catch (e) {
          console.error("Error parsing contractDue date:", ruko.contractDue, e);
        }
      }
    });

    return monthNames.map((month) => ({
      month,
      contracts: monthlyCounts[month],
    }));
  };

  const chartData = groupContractsByMonth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Due Dates</CardTitle>
        <CardDescription>Contracts expiring by month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="contracts" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Show only first 3 letters of month
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="contracts" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total Contracts: {data?.length || 0} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">Showing contracts due by month</div>
      </CardFooter>
    </Card>
  );
}
