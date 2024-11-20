import React from 'react';
import { Home, DollarSign, Users } from 'lucide-react';

interface PropertyCardProps {
  image: string;
  address: string;
  price: number;
  roi: number;
  occupancy: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ image, address, price, roi, occupancy }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-48">
        <img src={image} alt={address} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
          Active
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{address}</h3>
            <div className="flex items-center mt-2 text-gray-600">
              <Home className="w-4 h-4 mr-1" />
              <span className="text-sm">Single Family</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center text-blue-500 mb-1">
              <DollarSign className="w-4 h-4" />
            </div>
            <p className="text-sm font-medium">${price.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Value</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center text-green-500 mb-1">
              <span className="text-sm font-bold">{roi}%</span>
            </div>
            <p className="text-xs text-gray-500">ROI</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center text-purple-500 mb-1">
              <Users className="w-4 h-4" />
            </div>
            <p className="text-sm font-medium">{occupancy}%</p>
            <p className="text-xs text-gray-500">Occupied</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;