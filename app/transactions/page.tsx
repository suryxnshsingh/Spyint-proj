'use client';

import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card } from '@/components/ui/card';
import { transactionData } from '@/data/transactionData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

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

const tooltipStyles = {
  contentStyle: {
    backgroundColor: 'hsl(var(--background))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  itemStyle: {
    color: 'inherit',
  },
};

export default function TransactionsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold mb-2">Crypto Transactions</h1>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Transaction Risk Distribution</h2>
              <div className="h-[65vh]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    {barGradients}
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip {...tooltipStyles} formatter={(value, name) => [`${value}`, `${name} Risk`]} />
                    <Legend />
                    <Bar
                      dataKey="low"
                      name="Low Risk"
                      stackId="a"
                      fill="url(#colorLow)"
                      stroke="#4caf50"
                      strokeWidth={1}
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="medium"
                      name="Medium Risk"
                      stackId="a"
                      fill="url(#colorMedium)"
                      stroke="#ff9800"
                      strokeWidth={1}
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="high"
                      name="High Risk"
                      stackId="a"
                      fill="url(#colorHigh)"
                      stroke="#f44336"
                      strokeWidth={1}
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
