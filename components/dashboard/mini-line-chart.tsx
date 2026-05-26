"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";

type MiniLineChartProps = {
  data: number[];
  color: string;
  chartId: string;
};

export function MiniLineChart({ data, color, chartId }: MiniLineChartProps) {
  const chartData = data.map((value, index) => ({ index, value }));
  const gradientId = `mini-chart-gradient-${chartId}`;

  return (
    <div className="h-10 w-20">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
            activeDot={false}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
