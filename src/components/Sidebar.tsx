import React from 'react';
import { Home, Building2, Wallet, PieChart, Settings, Users, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Building2, label: 'Properties' },
    { icon: Wallet, label: 'Finances' },
    { icon: PieChart, label: 'Analytics' },
    { icon: Users, label: 'Tenants' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center space-x-2 mb-8">
        <Building2 className="w-8 h-8 text-blue-400" />
        <span className="text-xl font-bold">PropFolio</span>
      </div>
      
      <nav>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 w-full p-3 rounded-lg transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <button className="flex items-center space-x-3 text-gray-300 hover:text-white mt-auto absolute bottom-4 p-3">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;