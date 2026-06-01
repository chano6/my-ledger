"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CHART_COLORS } from "@/lib/chart-colors";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";
import type { MonthlyStats } from "@/lib/types";
import { CardHeader } from "../common/card-header";

type MonthlyBarChartProps = {
  data: MonthlyStats[];
};

export function MonthlyBarChart({ data }: MonthlyBarChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-sm lg:p-6">
        <CardHeader title="월별 수입 vs 지출" description="최근 6개월 흐름" />
        <div className="py-16 text-center text-sm text-fg-soft">거래 내역이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-sm lg:p-6">
      <CardHeader
        title="월별 수입 vs 지출"
        description="최근 6개월 흐름"
        action={<ChartLegend />}
      />

      <div className="h-70 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.015 80)" vertical={false} />
            <XAxis
              dataKey="monthLabel"
              tick={{ fontSize: 12, fill: "oklch(0.68 0.014 75)" }}
              axisLine={false}
              tickLine={false}
              dy={6}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "oklch(0.68 0.014 75)" }}
              tickFormatter={formatCompactCurrency}
              axisLine={false}
              tickLine={false}
              width={45}
            />
            <Tooltip
              cursor={{ fill: "oklch(0.96 0.018 88)", opacity: 0.5 }}
              contentStyle={{
                border: "1px solid oklch(0.91 0.015 80)",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                fontSize: "12px",
                padding: "8px 12px",
              }}
              formatter={(value) => (typeof value === "number" ? formatCurrency(value) : value)}
              labelStyle={{
                fontWeight: 600,
                marginBottom: 4,
                color: "oklch(0.27 0.02 75)",
              }}
            />
            <Bar
              dataKey="income"
              name="수입"
              fill={CHART_COLORS.income}
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="expense"
              name="지출"
              fill={CHART_COLORS.expense}
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ChartLegend() {
  return (
    <div className="flex items-center gap-3 text-[12px] text-fg-soft">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CHART_COLORS.income }} />
        수입
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CHART_COLORS.expense }} />
        지출
      </div>
    </div>
  );
}
