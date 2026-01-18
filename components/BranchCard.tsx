
import React from 'react';
import { Branch } from '../types';
import { MapPin, ArrowRight } from 'lucide-react';

interface BranchCardProps {
  branch: Branch;
  onSelect: (branch: Branch) => void;
}

export const BranchCard: React.FC<BranchCardProps> = ({ branch, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(branch)}
      className="bg-white p-5 rounded-[24px] border-2 border-transparent hover:border-ocbc-red hover:shadow-[0_0_30px_rgba(238,46,36,0.35)] hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer group kiosk-shadow flex flex-col h-full active:scale-[0.98]"
    >
      <div className="flex gap-4 items-start mb-4 flex-1">
        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-ocbc-red group-hover:bg-ocbc-red group-hover:text-white transition-all duration-300 flex-shrink-0">
          <MapPin size={24} />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-black text-ocbc-red mb-1 leading-tight uppercase tracking-tight">{branch.name}</h3>
          <p className="text-[13px] text-black font-extrabold leading-snug line-clamp-2">{branch.address}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
        <div className="flex gap-1.5">
          <span className="text-[10px] font-black text-black bg-gray-100 px-2.5 py-1 rounded-md">{branch.postalCode}</span>
          {branch.isPremier && (
            <span className="text-[10px] font-black text-white bg-ocbc-red px-2.5 py-1 rounded-md shadow-sm">PREMIER</span>
          )}
        </div>
        <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-black group-hover:bg-ocbc-red group-hover:text-white transition-all duration-300">
          <ArrowRight size={18} />
        </div>
      </div>
    </div>
  );
};
