"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { useGetRukos } from "@/app/utils/useGetRuko";

export function ChartBarActive() {
  const { data, isLoading, error } = useGetRukos();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Grouping berdasarkan pasarName
  const grouped = data.reduce((acc: Record<string, number>, item: any) => {
    acc[item.pasarName] = (acc[item.pasarName] || 0) + 1;
    return acc;
  }, {});

  // Konversi jadi array untuk recharts
  const chartData = Object.entries(grouped).map(([pasar, count]) => ({
    pasar,
    penyewa: count,
    fill: "#4f46e5", // Indigo
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jumlah Penyewa per Pasar</CardTitle>
        <CardDescription>Data Pasar - 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="pasar" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="penyewa" strokeWidth={2} radius={8} activeIndex={0} activeBar={(props: any) => <Rectangle {...props} fillOpacity={0.8} stroke={props.payload.fill} strokeDasharray={4} strokeDashoffset={4} />} fill="#4f46e5" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Data diperbarui <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">Menampilkan jumlah penyewa berdasarkan nama pasar</div>
      </CardFooter>
    </Card>
  );
}
