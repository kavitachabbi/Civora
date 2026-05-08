import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, Clock, Gauge, Compass, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RouteEngineProps {
  isNavigating: boolean;
  start: string;
  setStart: (val: string) => void;
  dest: string;
  setDest: (val: string) => void;
  speed: number;
  eta: string;
  distance: string;
  onToggleNavigation: () => void;
}

export default function RouteEngine({ 
  isNavigating, 
  start, 
  setStart, 
  dest, 
  setDest, 
  speed, 
  eta, 
  distance,
  onToggleNavigation 
}: RouteEngineProps) {
  return (
    <div className="cyber-card space-y-6">
      <div className="flex items-center gap-2">
        <Navigation size={18} className="text-cyan-400" />
        <h3 className="font-display font-bold">Navigation Core</h3>
      </div>

      {/* Speedometer */}
      <div className="relative flex justify-center py-4">
        <div className="w-40 h-40 rounded-full border-4 border-white/5 flex flex-col items-center justify-center relative">
          <motion.div 
            className="absolute inset-0 rounded-full border-t-4 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            animate={{ rotate: (speed / 120) * 360 }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
          <div className="text-4xl font-mono font-black text-white">{speed.toFixed(0)}</div>
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">KM/H</div>
        </div>
      </div>

      {/* Route Info */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-1 mt-1">
            <div className="w-3 h-3 rounded-full border-2 border-cyan-400" />
            <div className="w-[1px] h-8 bg-gradient-to-b from-cyan-400 to-purple-500" />
            <div className="w-3 h-3 bg-purple-500 rounded-sm" />
          </div>
          <div className="flex-grow space-y-3">
            <div className="relative">
              <input 
                type="text"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                disabled={isNavigating}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white/80 focus:outline-none focus:neon-border transition-all disabled:opacity-50"
                placeholder="Origin"
              />
              <div className="absolute -top-2 left-3 bg-[#06142E] px-1 text-[8px] uppercase tracking-widest text-white/30">Origin</div>
            </div>
            <div className="relative">
              <input 
                type="text"
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                disabled={isNavigating}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold text-white/80 focus:outline-none focus:neon-border transition-all disabled:opacity-50"
                placeholder="Destination"
              />
              <div className="absolute -top-2 left-3 bg-[#06142E] px-1 text-[8px] uppercase tracking-widest text-white/30">Destination</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 glass rounded-2xl border-white/5 flex items-center gap-3">
          <Clock size={16} className="text-cyan-400" />
          <div>
            <div className="text-[8px] uppercase tracking-widest text-white/30">ETA</div>
            <div className="text-sm font-mono font-bold">{eta}</div>
          </div>
        </div>
        <div className="p-4 glass rounded-2xl border-white/5 flex items-center gap-3">
          <Gauge size={16} className="text-cyan-400" />
          <div>
            <div className="text-[8px] uppercase tracking-widest text-white/30">Distance</div>
            <div className="text-sm font-mono font-bold">{distance}</div>
          </div>
        </div>
      </div>

      {/* Safety Score */}
      <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck size={18} className="text-green-400" />
          <div>
             <div className="text-[10px] font-bold uppercase tracking-widest text-green-400">Route Safety</div>
             <div className="text-[8px] text-white/30">LATEST AI ANALYSIS COMPLETE</div>
          </div>
        </div>
        <div className="text-2xl font-mono font-black text-green-400">98</div>
      </div>

      <button 
        onClick={onToggleNavigation}
        className={cn(
          "w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all",
          isNavigating ? "bg-red-500/20 text-red-400 border border-red-500/30" : "btn-primary"
        )}
      >
        {isNavigating ? "Terminate Navigation" : "Initiate Smart Route"}
      </button>
    </div>
  );
}
