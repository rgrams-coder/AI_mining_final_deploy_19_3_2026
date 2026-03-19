
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ReturnData } from '../types';
import { authService } from '../authService';

const data: ReturnData[] = [
  { month: 'Jan', revenue: 4000, expenses: 2400, royalty: 1600 },
  { month: 'Feb', revenue: 3000, expenses: 1398, royalty: 1602 },
  { month: 'Mar', revenue: 9800, expenses: 2000, royalty: 7800 },
  { month: 'Apr', revenue: 3908, expenses: 2780, royalty: 1128 },
  { month: 'May', revenue: 4800, expenses: 1890, royalty: 2910 },
  { month: 'Jun', revenue: 6300, expenses: 2390, royalty: 3910 },
];

const Dashboard: React.FC = () => {
  const user = authService.getUser();
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h2>
        <p className="text-gray-500 mt-2">Here's what's happening with your revenue and royalty.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Royalty" value="$18,450" change="+12.5%" trend="up" />
        <StatCard title="Library Items" value="124" change="+3 new" trend="up" />
        <StatCard title="Active Notes" value="1,204" change="+15 today" trend="up" />
        <StatCard title="Average Rating" value="4.8/5" change="Stable" trend="neutral" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6">Revenue Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-6">Royalty Streams</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="royalty" fill="#10B981" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <ActionButton label="Upload Asset" color="bg-indigo-600" />
          <ActionButton label="New Note" color="bg-emerald-600" />
          <ActionButton label="Schedule Consult" color="bg-amber-500" />
          <ActionButton label="Generate Report" color="bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <div className="flex items-baseline gap-2 mt-2">
      <h4 className="text-2xl font-bold">{value}</h4>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
      }`}>
        {change}
      </span>
    </div>
  </div>
);

const ActionButton = ({ label, color }: any) => (
  <button className={`${color} text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm`}>
    {label}
  </button>
);

export default Dashboard;
