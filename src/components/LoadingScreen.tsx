import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#06142E]"
    >
      <div className="relative">
        {/* Outer Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20"
        />
        
        {/* Glowing Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative text-6xl md:text-8xl font-display font-bold tracking-tighter"
        >
          <span className="text-white">CI</span>
          <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,229,255,1)]">VORA</span>
        </motion.div>
      </div>

      <div className="mt-12 w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_10px_rgba(0,229,255,0.5)]"
        />
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-cyan-300"
      >
        Initializing Smart Infrastructure... {percent}%
      </motion.p>
    </motion.div>
  );
}
