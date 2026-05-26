"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/format";
import type { CategoryStats } from "@/lib/types";
import { CardHeader } from "../common/card-header";

type CategoryPieChartProps = {
  data: CategoryStats[];
  dateRange: string;
};

export function CategoryPieChart({ data, dateRange }: CategoryPieChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 md:p-6">
        <CardHeader title="카테고리별 지출" description={dateRange} />
        <div className="py-16 text-center text-sm text-fg-soft">이번 달 지출이 없습니다.</div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 md:p-6">
      <CardHeader title="카테고리별 지출" description={dateRange} />

      <div className="flex flex-1 flex-col items-center justify-center gap-4 md:flex-row md:gap-5">
        <div className="relative h-45 w-45 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="category_name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                strokeWidth={0}
                isAnimationActive={false}
              >
                {data.map((entry) => (
                  <Cell key={entry.category_id} fill={entry.category_color} />
                ))}
              </Pie>
              <Tooltip
                wrapperStyle={{ zIndex: 10 }}
                contentStyle={{
                  border: "1px solid oklch(0.91 0.015 80)",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  fontSize: "12px",
                  padding: "8px 12px",
                }}
                formatter={(value) => (typeof value === "number" ? formatCurrency(value) : value)}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[11px] text-fg-soft">이번 달 지출</p>
            <p className="num text-[16px] font-bold tracking-tight">{formatCurrency(total)}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2.5">
          {data.map((item) => (
            <div key={item.category_id} className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.category_color }}
                />
                <span className="truncate text-[13px] text-fg">{item.category_name}</span>
              </div>
              <span className="num shrink-0 text-[13px] font-semibold">
                {formatCurrency(item.total)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
