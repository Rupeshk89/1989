import React from 'react';
import { Building2, TrendingUp, Wallet, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', value: 15000 },
  { month: 'Feb', value: 15200 },
  { month: 'Mar', value: 15800 },
  { month: 'Apr', value: 16300 },
  { month: 'May', value: 16800 },
  { month: 'Jun', value: 17500 },
];

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Properties',
      value: '12',
      icon: Building2,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Monthly Revenue',
      value: '$45,200',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Value',
      value: '$2.4M',
      icon: Wallet,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Pending Issues',
      value: '3',
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#93C5FD" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;