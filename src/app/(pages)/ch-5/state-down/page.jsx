import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

function HeavyAnalyticsComponent() {
  return (
    <div className="mb-2 rounded bg-blue-50 p-4">
      <b>Analytics</b>：流量與活躍用戶
      <ChartContainer
        config={analyticsConfig}
        className="mt-2"
      >
        <LineChart data={analyticsData} height={220}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="active"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default HeavyAnalyticsComponent;
