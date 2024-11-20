import React from 'react';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import PropertyCard from './components/PropertyCard';
import { Search, Bell } from 'lucide-react';

function App() {
  const properties = [
    {
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
      address: '123 Park Avenue',
      price: 450000,
      roi: 8.5,
      occupancy: 100
    },
    {
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
      address: '456 Madison Street',
      price: 380000,
      roi: 7.2,
      occupancy: 100
    },
    {
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      address: '789 Lexington Ave',
      price: 525000,
      roi: 9.1,
      occupancy: 0
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties, tenants..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
          </div>
        </header>

        <DashboardStats />
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Properties</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Add Property
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;