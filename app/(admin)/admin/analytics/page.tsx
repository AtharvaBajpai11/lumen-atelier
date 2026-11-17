'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { BarChart3, TrendingUp, Users, ShoppingBag } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  const revenueData = [
    { name: 'Week 1', revenue: 4200, orders: 18 },
    { name: 'Week 2', revenue: 6800, orders: 29 },
    { name: 'Week 3', revenue: 5400, orders: 24 },
    { name: 'Week 4', revenue: 8900, orders: 36 },
  ];

  const categoryShareData = [
    { name: 'Living Objects', value: 45, color: '#1A1A1A' },
    { name: 'Sensory & Scent', value: 25, color: '#2563EB' },
    { name: 'Apparel & Knitwear', value: 18, color: '#6B6B6B' },
    { name: 'Tuscan Leather', value: 12, color: '#B45309' },
  ];

  const customerAcquisition = [
    { month: 'Jul', collectors: 45 },
    { month: 'Aug', collectors: 62 },
    { month: 'Sep', collectors: 80 },
    { month: 'Oct', collectors: 110 },
    { month: 'Nov', collectors: 148 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <h1 className="font-serif text-3xl font-normal text-primary-text">
            Commercial Analytics & Performance
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Aggregated conversion rates, category revenue shares, and collector lifetime growth.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white p-1 border border-black/10 text-xs">
          {(['month', 'quarter', 'year'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                period === p
                  ? 'bg-black text-white shadow-sm'
                  : 'text-secondary-text hover:text-black'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gross Consignments & Orders (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-black/[0.08] p-6 shadow-subtle space-y-6">
          <div>
            <h2 className="font-serif text-xl font-normal text-primary-text">
              Revenue Volume & Order Velocity
            </h2>
            <p className="text-xs text-secondary-text">Weekly aggregation of captured payments</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#6B6B6B" />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="#6B6B6B"
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  formatter={(val: any) => [`$${val}`, 'Gross Revenue']}
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    color: '#FFF',
                    borderRadius: '0px',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#1A1A1A" fill="#E5E7EB" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-black/[0.08] p-6 shadow-subtle space-y-6">
          <div>
            <h2 className="font-serif text-xl font-normal text-primary-text">
              Material Share by Volume
            </h2>
            <p className="text-xs text-secondary-text">Distribution across mediums</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryShareData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                >
                  {categoryShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {categoryShareData.map((c) => (
              <div key={c.name} className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-secondary-text">{c.name}</span>
                </span>
                <span className="font-bold text-primary-text">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collector Acquisition Growth */}
      <div className="bg-white border border-black/[0.08] p-6 shadow-subtle space-y-6">
        <div>
          <h2 className="font-serif text-xl font-normal text-primary-text">
            Collector Membership Growth
          </h2>
          <p className="text-xs text-secondary-text">Total registered collectors over 2024</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={customerAcquisition}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#6B6B6B" />
              <YAxis tick={{ fontSize: 11 }} stroke="#6B6B6B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1A1A',
                  color: '#FFF',
                  borderRadius: '0px',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="collectors" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
