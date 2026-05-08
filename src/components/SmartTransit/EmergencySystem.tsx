import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldAlert, Zap, Volume2, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EmergencySystemProps {
  alert: string | null;
  onClose: () => void;
  voiceEnabled: boolean;
}

export default function EmergencySystem({ alert, onClose, voiceEnabled }: EmergencySystemProps) {
  useEffect(() => {
    if (alert && voiceEnabled) {
      const speech = new SpeechSynthesisUtterance(alert);
      speech.rate = 0.9;
      speech.pitch = 0.8;
      window.speechSynthesis.speak(speech);
    }
  }, [alert, voiceEnabled]);

  return (
    <AnimatePresence>
      {alert && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-red-950/40 backdrop-blur-md"
        >
          {/* Pulsing Background Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.2)_0%,transparent_70%)] animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-[pulse_1s_infinite]" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 animate-[pulse_1s_infinite]" />
          </div>

          <motion.div 
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="w-full max-w-2xl danger-glow danger-pulse relative bg-red-950/80 p-8 md:p-12 rounded-[2.5rem] border-red-500/50 shadow-[0_0_100px_rgba(239,68,68,0.4)] text-center"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 glass rounded-full hover:bg-white/10 transition-all text-red-400"
            >
              <X size={20} />
            </button>

            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="mx-auto w-24 h-24 bg-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(239,68,68,0.6)]"
            >
              <AlertTriangle size={48} className="text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4 uppercase tracking-tighter">
              Critical <span className="text-red-400">Danger</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-red-200/80 mb-10 font-medium leading-tight">
              {alert}
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={onClose}
                className="px-10 py-5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-[0_10px_30px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95"
              >
                Acknowledge Alert
              </button>
              <button className="px-10 py-5 glass border-white/20 text-white rounded-2xl font-bold uppercase tracking-widest text-sm transition-all hover:bg-white/10 flex items-center justify-center gap-3">
                <Zap size={18} />
                Emergency Reroute
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                 <span className="text-[10px] uppercase font-mono tracking-widest text-red-400/60 font-bold">Vibration Active</span>
               </div>
               <div className="flex items-center gap-2">
                 <Volume2 size={14} className="text-red-400/60" />
                 <span className="text-[10px] uppercase font-mono tracking-widest text-red-400/60 font-bold">Audio Warning Enabled</span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
