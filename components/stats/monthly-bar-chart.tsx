"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/format";
import type { MonthlyStats } from "@/lib/types";

type MonthlyBarChartProps = {
  data: MonthlyStats[];
};

export function MonthlyBarChart({ data }: MonthlyBarChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">최근 6개월 추이</h3>
        <div className="py-12 text-center text-muted-foreground">거래 내역이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">최근 6개월 추이</h3>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis dataKey="monthLabel" tick={{ fontSize: 12 }} />

            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                if (value >= 1000000) return `${value / 1000000}백만`;
                if (value >= 10000) return `${value / 10000}만`;
                return String(value);
              }}
            />

            <Tooltip
              formatter={(value) => (typeof value === "number" ? formatCurrency(value) : value)}
              labelStyle={{ fontWeight: 600 }}
            />

            <Legend />

            <Bar dataKey="income" name="수입" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" name="지출" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
