'use client';

import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card } from '@/components/ui/card';
import {
  AlertTriangle,
  Bitcoin,
  Users,
  Activity,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Chart configuration
const chartConfig = {
  xAxis: {
    stroke: 'hsl(var(--muted-foreground))',
    fontSize: 12,
    tickLine: false,
    axisLine: false,
  },
  yAxis: {
    stroke: 'hsl(var(--muted-foreground))',
    fontSize: 12,
    tickLine: false,
    axisLine: false,
  },
  grid: {
    strokeDasharray: '3 3',
    stroke: 'hsl(var(--muted))',
  },
  tooltip: {
    contentStyle: {
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '6px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    itemStyle: {
      color: 'inherit', // Inherit color from segment
    },
  },
};

const threatData = [
  { name: 'Jan', threats: 65, resolved: 45 },
  { name: 'Feb', threats: 59, resolved: 40 },
  { name: 'Mar', threats: 80, resolved: 65 },
  { name: 'Apr', threats: 81, resolved: 70 },
  { name: 'May', threats: 56, resolved: 45 },
  { name: 'Jun', threats: 55, resolved: 48 },
];

const transactionData = [
  { name: 'Jan', low: 40, medium: 24, high: 10 },
  { name: 'Feb', low: 30, medium: 28, high: 15 },
  { name: 'Mar', low: 45, medium: 30, high: 12 },
  { name: 'Apr', low: 50, medium: 25, high: 18 },
  { name: 'May', low: 35, medium: 32, high: 20 },
  { name: 'Jun', low: 42, medium: 28, high: 16 },
];

const threatTypeData = [
  { name: 'Malware', value: 35 },
  { name: 'Phishing', value: 25 },
  { name: 'Data Breach', value: 20 },
  { name: 'DDoS', value: 15 },
  { name: 'Other', value: 5 },
];

const geographicData = [
  { name: 'North America', value: 450 },
  { name: 'Europe', value: 380 },
  { name: 'Asia', value: 320 },
  { name: 'South America', value: 180 },
  { name: 'Africa', value: 120 },
  { name: 'Oceania', value: 90 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const riskScoreHistory = [
  { date: 'Week 1', score: 75 },
  { date: 'Week 2', score: 82 },
  { date: 'Week 3', score: 78 },
  { date: 'Week 4', score: 85 },
  { date: 'Week 5', score: 80 },
  { date: 'Week 6', score: 88 },
];

const gradientOffset = () => {
  const dataMax = Math.max(...geographicData.map((i) => i.value));
  const dataMin = Math.min(...geographicData.map((i) => i.value));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();

const pieGradient = (
  <defs>
    <linearGradient id="colorPie" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
      <stop offset="100%" stopColor="hsl(var(--chart-5))" stopOpacity={0.8} />
    </linearGradient>
  </defs>
);

const barGradients = (
  <defs>
    <linearGradient id="colorLow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#4caf50" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#81c784" stopOpacity={0.8} />
    </linearGradient>
    <linearGradient id="colorMedium" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#ff9800" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#ffb74d" stopOpacity={0.8} />
    </linearGradient>
    <linearGradient id="colorHigh" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#f44336" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#e57373" stopOpacity={0.8} />
    </linearGradient>
  </defs>
);

export default function Home() {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, Admin</h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your threat intelligence today.
                </p>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Last Month</SelectItem>
                  <SelectItem value="3m">Last 3 Months</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Threats"
                value="1,234"
                description="High-risk alerts detected"
                icon={AlertTriangle}
                trend={{ value: 12, isPositive: false }}
              />
              <StatsCard
                title="Suspicious Transactions"
                value="850"
                description="Flagged transfers"
                icon={Bitcoin}
                trend={{ value: 8, isPositive: true }}
              />
              <StatsCard
                title="Active Suspects"
                value="145"
                description="Under investigation"
                icon={Users}
                trend={{ value: 4, isPositive: true }}
              />
              <StatsCard
                title="Risk Score"
                value="78"
                description="Overall system health"
                icon={Activity}
                trend={{ value: 2, isPositive: true }}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Threats vs Resolutions</h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={threatData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid {...chartConfig.grid} />
                      <XAxis {...chartConfig.xAxis} dataKey="name" />
                      <YAxis {...chartConfig.yAxis} />
                      <Tooltip {...chartConfig.tooltip} />
                      <Legend />
                      <Line type="monotone" dataKey="threats" stroke="#8884d8" />
                      <Line type="monotone" dataKey="resolved" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Risk Score Trend</h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={riskScoreHistory} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorRiskScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid {...chartConfig.grid} />
                      <XAxis {...chartConfig.xAxis} dataKey="date" />
                      <YAxis {...chartConfig.yAxis} domain={[0, 100]} />
                      <Tooltip {...chartConfig.tooltip} />
                      <Area
                        type="monotone"
                        dataKey="score"
                        name="Risk Score"
                        stroke="hsl(var(--chart-3))"
                        fillOpacity={1}
                        fill="url(#colorRiskScore)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Threat Types Distribution</h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      {pieGradient}
                      <Pie
                        data={threatTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="url(#colorPie)"
                        dataKey="value"
                      >
                        {threatTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        {...chartConfig.tooltip}
                        formatter={(value, name) => [`${value}`, `${name}`]}
                      />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Geographic Distribution</h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={geographicData} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorGeo" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="hsl(var(--chart-5))" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid {...chartConfig.grid} horizontal={true} />
                      <XAxis {...chartConfig.xAxis} type="number" />
                      <YAxis {...chartConfig.yAxis} dataKey="name" type="category" width={100} />
                      <Tooltip {...chartConfig.tooltip} />
                      <Bar
                        dataKey="value"
                        fill="url(#colorGeo)"
                        radius={[0, 4, 4, 0]}
                        label={{ position: 'right', fill: 'hsl(var(--foreground))' }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="grid gap-4">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Transaction Risk Distribution</h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={transactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      {barGradients}
                      <CartesianGrid {...chartConfig.grid} />
                      <XAxis {...chartConfig.xAxis} dataKey="name" />
                      <YAxis {...chartConfig.yAxis} />
                      <Tooltip
                        {...chartConfig.tooltip}
                        formatter={(value, name) => [`${value}`, `${name} Risk`]}
                      />
                      <Legend />
                      <Bar
                        dataKey="low"
                        name="Low Risk"
                        stackId="a"
                        fill="url(#colorLow)"
                        stroke="#4caf50"
                        strokeWidth={1}
                        radius={[10, 10, 10, 10]}
                      />
                      <Bar
                        dataKey="medium"
                        name="Medium Risk"
                        stackId="a"
                        fill="url(#colorMedium)"
                        stroke="#ff9800"
                        strokeWidth={1}
                        radius={[10, 10, 10, 10]}
                      />
                      <Bar
                        dataKey="high"
                        name="High Risk"
                        stackId="a"
                        fill="url(#colorHigh)"
                        stroke="#f44336"
                        strokeWidth={1}
                        radius={[10, 10, 10, 10]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}