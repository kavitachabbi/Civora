import { motion } from 'motion/react';
import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background World/Grid */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[#06142E]" />
        <div className="absolute inset-0 digital-grid opacity-30" />
        
        {/* Animated Glows */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 blur-[100px] rounded-full"
        />
      </div>

      <Navbar />
      <main className="relative z-10 pt-24">
        {children}
      </main>

      {/* Subtle Footer-like overlay */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-display font-bold text-xl tracking-tighter opacity-50">CIVORA</span>
            <p className="text-white/30 text-xs">© 2026 Ministry of Smart Public Infrastructure & Digital Advancement. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            {['Privacy', 'Compliances', 'Cyber Security', 'Terms'].map(link => (
              <a key={link} href="#" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-cyan-400 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
