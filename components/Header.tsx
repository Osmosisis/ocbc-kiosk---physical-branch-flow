
import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Clock } from 'lucide-react';

export const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="py-4 px-10 flex items-center justify-between z-50">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-ocbc-red rounded-xl flex items-center justify-center text-white font-extrabold text-xl italic kiosk-shadow">O</div>
        <div>
          <span className="font-black text-xl tracking-tighter text-white">OCBC</span>
          <div className="text-[8px] font-bold text-red-400 tracking-[0.2em] uppercase leading-none">Digital Branch</div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-1.5"><Wifi size={14} /> System Online</div>
          <div className="flex items-center gap-1.5"><Battery size={14} /> DC Power</div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-lg text-white font-black text-xs font-mono kiosk-shadow border border-white/5">
          <Clock size={14} className="text-ocbc-red" />
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </header>
  );
};
