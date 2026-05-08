import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, AlertTriangle, ShieldCheck, Gauge, Zap, Hammer } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AnalysisPanelProps {
  lastDetection: any;
}

export default function AnalysisPanel({ lastDetection }: AnalysisPanelProps) {
  if (!lastDetection) {
    return (
      <div className="cyber-card h-full flex flex-col items-center justify-center text-white/10 gap-4">
        <Cpu size={48} className="opacity-20 animate-pulse" />
        <p className="text-[10px] uppercase tracking-widest text-center font-mono">Standby for AI<br/>Road Surface Analysis</p>
      </div>
    );
  }

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'Dangerous': return { color: 'text-red-500', bg: 'bg-red-500/20' };
      case 'High': return { color: 'text-orange-500', bg: 'bg-orange-500/20' };
      case 'Medium': return { color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
      default: return { color: 'text-cyan-400', bg: 'bg-cyan-400/20' };
    }
  };

  const { color, bg } = getSeverityStyles(lastDetection.severity);

  return (
    <div className="cyber-card h-full space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Cpu size={18} className="text-cyan-400" />
          <h3 className="font-display font-bold text-sm">Road Damage AI</h3>
        </div>
        <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest", bg, color)}>
          {lastDetection.severity} RISK
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1">
          <div className="text-[8px] uppercase tracking-widest text-white/30">Crack Depth</div>
          <div className="text-xl font-mono font-bold text-cyan-400">12.5 <span className="text-[10px] text-white/20">CM</span></div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1">
          <div className="text-[8px] uppercase tracking-widest text-white/30">Width Est.</div>
          <div className="text-xl font-mono font-bold text-cyan-400">45.0 <span className="text-[10px] text-white/20">CM</span></div>
        </div>
      </div>

      {/* Risk Meters */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-white/40">
            <span>Vehicle Damage Risk</span>
            <span className="text-red-400 font-bold">85%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              className="h-full bg-red-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-white/40">
            <span>Accident Probability</span>
            <span className="text-orange-500 font-bold">92%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              className="h-full bg-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={14} className="text-cyan-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">AI Recommendations</span>
        </div>
        <ul className="space-y-2">
          {[
            "Reduce speed to below 30 KM/H",
            "Emergency maintenance requested",
            "Avoid rapid lane changes"
          ].map((rec, i) => (
            <li key={i} className="text-[10px] text-white/60 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-cyan-500/50" />
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Repair Team Info */}
      <div className="pt-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-xl">
             <Hammer size={16} className="text-green-400" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-green-400">Team Alpha-9</div>
            <div className="text-[8px] text-white/30">ETA: 14 MINS | DIST: 2.4 KM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
