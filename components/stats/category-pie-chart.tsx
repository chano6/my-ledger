"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/format";
import type { CategoryStats } from "@/lib/types";

type CategoryPieChartProps = {
  stats: CategoryStats[];
};

export function CategoryPieChart({ stats }: CategoryPieChartProps) {
  const total = stats.reduce((sum, item) => sum + item.total, 0);

  if (stats.length === 0) {
    return (
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">이번 달 카테고리별 지출</h3>
        <div className="py-12 text-center text-muted-foreground">이번 달 지출 내역이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">이번 달 카테고리별 지출</h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-70 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats}
                dataKey="total"
                nameKey="category_name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
              >
                {stats.map((entry) => (
                  <Cell key={entry.category_id} fill={entry.category_color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => (typeof value === "number" ? formatCurrency(value) : value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center gap-2">
          {stats.map((item) => {
            const percentage = total > 0 ? (item.total / total) * 100 : 0;
            return (
              <div key={item.category_id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.category_color }}
                  />
                  <span className="text-sm font-medium">{item.category_name}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold">{formatCurrency(item.total)}</span>
                  <span className="ml-2 text-muted-foreground">{percentage.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
