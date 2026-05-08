import React from 'react';
import { CloudRain, Moon, Sun, Wind, Eye } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function WeatherPanel() {
  return (
    <div className="cyber-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display font-bold text-sm">Environmental Risk</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-[10px] font-mono text-cyan-400">REALTIME</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl">
              <CloudRain size={20} className="text-blue-400" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/30">Condition</div>
              <div className="text-sm font-bold">Light Rain</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl">
              <Eye size={20} className="text-purple-400" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/30">Visibility</div>
              <div className="text-sm font-bold">850 Meters</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-right">
          <div>
            <div className="text-[8px] uppercase tracking-widest text-white/30 mb-1">Road Friction</div>
            <div className="text-lg font-mono font-bold text-yellow-400">0.65 μ</div>
          </div>
          <div>
            <div className="text-[8px] uppercase tracking-widest text-white/30 mb-1">Risk Multiplier</div>
            <div className="text-lg font-mono font-bold text-red-400">1.4x</div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 glass rounded-2xl border-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] uppercase tracking-widest text-white/40">Night Vision Analysis</span>
          <span className="text-[9px] font-bold text-cyan-400">OPTIMAL</span>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-4/5 bg-gradient-to-r from-cyan-500 to-purple-500" />
        </div>
      </div>
    </div>
  );
}
