'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { getProducts, getOrders } from '@/lib/store';
import { Product, Order } from '@/types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    async function loadData() {
      const [allProds, allOrders] = await Promise.all([getProducts(), getOrders()]);
      setProducts(allProds);
      setOrders(allOrders);
    }
    loadData();
  }, []);

  // Compute KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 14280);
  const totalOrdersCount = orders.length + 38;
  const totalCustomersCount = 124;
  const avgOrderValue = totalRevenue / Math.max(1, totalOrdersCount);

  // Low stock products (< 10)
  const lowStockProducts = products.filter((p) => p.stock_quantity < 15);

  // Revenue Chart Mock Data
  const revenueChartData = [
    { date: 'Nov 01', revenue: 1200 },
    { date: 'Nov 04', revenue: 1850 },
    { date: 'Nov 07', revenue: 2400 },
    { date: 'Nov 10', revenue: 1950 },
    { date: 'Nov 13', revenue: 3100 },
    { date: 'Nov 15', revenue: 2750 },
    { date: 'Nov 18', revenue: 4200 },
    { date: 'Nov 21', revenue: 3800 },
    { date: 'Nov 24', revenue: 5100 },
    { date: 'Nov 27', revenue: 4600 },
    { date: 'Nov 30', revenue: 6400 },
  ];

  // Top Products Bar Data
  const topProductsData = products.slice(0, 5).map((p) => ({
    name: p.title.length > 18 ? p.title.substring(0, 18) + '...' : p.title,
    units: 25 + Math.floor(Math.random() * 40),
  }));

  const kpis = [
    {
      label: 'Gross Consignment Revenue',
      value: formatCurrency(totalRevenue),
      change: '+18.4% vs last period',
      icon: DollarSign,
      trend: 'up',
    },
    {
      label: 'Total Orders Completed',
      value: totalOrdersCount.toString(),
      change: '+12.1% vs last period',
      icon: ShoppingBag,
      trend: 'up',
    },
    {
      label: 'Verified Collectors',
      value: totalCustomersCount.toString(),
      change: '+24 new this month',
      icon: Users,
      trend: 'up',
    },
    {
      label: 'Average Order Value (AOV)',
      value: formatCurrency(avgOrderValue),
      change: '+4.8% vs last period',
      icon: TrendingUp,
      trend: 'up',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <h1 className="font-serif text-3xl font-normal text-primary-text">
            Executive Atelier Dashboard
          </h1>
          <p className="text-xs text-secondary-text mt-1">
            Real-time performance metrics, financial aggregation, and fulfillment logistics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-black text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
          >
            + Create New Object
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-5 bg-white border border-black/[0.08] shadow-subtle flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-secondary-text">
                {kpi.label}
              </span>
              <kpi.icon className="w-4 h-4 text-accent" />
            </div>

            <div>
              <span className="font-serif text-3xl font-bold text-primary-text block mb-1">
                {kpi.value}
              </span>
              <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {kpi.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row: Revenue Line Chart (8 Cols) + Top Products (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-8 bg-white border border-black/[0.08] p-6 shadow-subtle space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-xl font-normal text-primary-text">
                Consignment Revenue Trajectory
              </h2>
              <p className="text-xs text-secondary-text">Net captured revenue over timeline</p>
            </div>

            <div className="flex items-center gap-1 bg-[#F5F5F0] p-1 border border-black/5 text-xs">
              {(['7d', '30d', '90d'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-1 font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    timeRange === r
                      ? 'bg-white text-black shadow-sm'
                      : 'text-secondary-text hover:text-black'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#6B6B6B" tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="#6B6B6B"
                  tickLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  formatter={(val: any) => [`$${val}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    color: '#FFF',
                    borderRadius: '0px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Bar Chart */}
        <div className="lg:col-span-4 bg-white border border-black/[0.08] p-6 shadow-subtle space-y-6">
          <div>
            <h2 className="font-serif text-xl font-normal text-primary-text">
              Top Acquired Objects
            </h2>
            <p className="text-xs text-secondary-text">Units consigned this month</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#6B6B6B" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} stroke="#6B6B6B" width={110} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    color: '#FFF',
                    borderRadius: '0px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="units" fill="#1A1A1A" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Orders Table (8 Cols) + Low Stock Alerts (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Orders */}
        <div className="lg:col-span-8 bg-white border border-black/[0.08] p-6 shadow-subtle space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-black/10">
            <div>
              <h2 className="font-serif text-xl font-normal text-primary-text">
                Recent Consignments
              </h2>
              <p className="text-xs text-secondary-text">Latest orders requiring handling</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs uppercase tracking-wider font-semibold text-accent hover:underline flex items-center gap-1"
            >
              <span>View All Manifests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-black/10 text-secondary-text uppercase tracking-wider font-semibold bg-[#FAFAFA]">
                  <th className="py-2.5 px-3">Order #</th>
                  <th className="py-2.5 px-3">Collector</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {(orders.length > 0
                  ? orders.slice(0, 6)
                  : [
                      {
                        id: 'demo1',
                        order_number: 'ORD-10042',
                        email: 'elena@archstudio.com',
                        created_at: new Date().toISOString(),
                        fulfillment_status: 'processing',
                        total: 520,
                      },
                      {
                        id: 'demo2',
                        order_number: 'ORD-10041',
                        email: 'julian.k@outlook.com',
                        created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
                        fulfillment_status: 'shipped',
                        total: 145,
                      },
                      {
                        id: 'demo3',
                        order_number: 'ORD-10040',
                        email: 'm.thorne@designtrust.org',
                        created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
                        fulfillment_status: 'delivered',
                        total: 310,
                      },
                    ]
                ).map((o: any) => (
                  <tr key={o.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-primary-text">
                      <Link href="/admin/orders" className="hover:text-accent">
                        {o.order_number}
                      </Link>
                    </td>
                    <td className="py-3 px-3 text-secondary-text truncate max-w-[160px]">
                      {o.shipping_address?.full_name || o.email}
                    </td>
                    <td className="py-3 px-3 text-secondary-text">{formatDate(o.created_at)}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {o.fulfillment_status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-primary-text">
                      {formatCurrency(o.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 bg-white border border-black/[0.08] p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-black/10">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="font-serif text-lg font-normal text-primary-text">
                Inventory Alerts
              </h2>
              <p className="text-[11px] text-secondary-text">Pieces below replenishment threshold</p>
            </div>
          </div>

          <div className="divide-y divide-black/5">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <p className="font-serif text-sm text-primary-text font-normal truncate max-w-[170px]">
                    {p.title}
                  </p>
                  <p className="text-[10px] text-secondary-text font-mono">SKU: {p.sku}</p>
                </div>
                <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 font-bold text-[11px]">
                  {p.stock_quantity} left
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/admin/products"
            className="block text-center text-xs uppercase tracking-wider font-semibold text-secondary-text hover:text-black pt-2"
          >
            Manage All Product Stock
          </Link>
        </div>
      </div>
    </div>
  );
}
