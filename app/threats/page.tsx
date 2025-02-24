'use client';

import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Card } from '@/components/ui/card';
import { threatData } from '@/data/threatData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { RefreshCw, Download, Trash2, Plus, Edit } from 'lucide-react';

export default function ThreatsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold mb-2">Dark Web Threats</h1>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Threats vs Resolutions</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={threatData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="threats" stroke="#8884d8" fillOpacity={1} fill="url(#colorThreats)" />
                    <Area type="monotone" dataKey="resolved" stroke="#82ca9d" fillOpacity={1} fill="url(#colorResolved)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Actions</h2>
              <div className="space-x-4 flex">
                <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded flex items-center">
                  <RefreshCw className="mr-2 h-4 w-4" /> Refresh Data
                </button>
                <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Export Data
                </button>
                <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded flex items-center">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete All
                </button>
                <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded flex items-center">
                  <Plus className="mr-2 h-4 w-4" /> Add New
                </button>
                <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded flex items-center">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
