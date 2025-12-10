import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ComposedChart,
} from 'recharts';
import { SlowComponent } from '@/components/slow-component';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const analyticsConfig = {
  visitors: {
    label: '訪客',
    color: 'var(--chart-2)',
  },
  active: {
    label: '活躍',
    color: 'var(--chart-5)',
  },
};

export function HeavyCharts({ data }) {
  return (
    <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <SlowComponent ms={100}>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">折線圖</h3>
          </CardHeader>
          <CardContent>
            <ChartContainer config={analyticsConfig}>
              <LineChart data={data}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="var(--chart-5)"
                  strokeWidth={2}
                  dot={false}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </SlowComponent>

      <SlowComponent ms={100}>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">柱狀圖</h3>
          </CardHeader>
          <CardContent>
            <ChartContainer config={analyticsConfig}>
              <BarChart data={data}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Bar dataKey="visitors" fill="var(--chart-2)" />
                <Bar dataKey="active" fill="var(--chart-5)" />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </SlowComponent>

      <SlowComponent ms={100}>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">區域圖</h3>
          </CardHeader>
          <CardContent>
            <ChartContainer config={analyticsConfig}>
              <AreaChart data={data}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Area
                  type="monotone"
                  dataKey="active"
                  strokeWidth={2}
                  stroke="var(--chart-5)"
                  fill="var(--chart-5)"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  strokeWidth={2}
                  stroke="var(--chart-2)"
                  fill="var(--chart-2)"
                  fillOpacity={0.2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </SlowComponent>

      <SlowComponent ms={100}>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">組合圖</h3>
          </CardHeader>
          <CardContent>
            <ChartContainer config={analyticsConfig}>
              <ComposedChart data={data}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Bar
                  dataKey="visitors"
                  fill="var(--chart-2)"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="var(--chart-5)"
                  strokeWidth={2}
                  dot={false}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </SlowComponent>
    </div>
  );
}
