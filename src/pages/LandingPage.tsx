import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Box, Cpu, Globe, Zap } from 'lucide-react';
import Layout from '../components/Layout';
import { cn } from '../lib/utils';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          SYSTEM STATUS: OPTIMIZED
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl font-display font-bold max-w-5xl leading-tight mb-8"
        >
          Building the Future of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500">
            Smart Public Infrastructure
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 text-base md:text-lg max-w-3xl mb-12 leading-relaxed"
        >
          Empowering citizens through innovation, digital governance, transportation intelligence, healthcare systems, waste management, and public service transformation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <button
            onClick={() => navigate('/auth')}
            className="btn-primary flex items-center gap-3 px-10"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/services')}
            className="px-10 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white/80 font-medium"
          >
            Explore Services
          </button>
        </motion.div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          {[Cpu, Globe, Zap, Box].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 10, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 5 + i, 
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute text-cyan-400"
              style={{
                top: `${20 + i * 15}%`,
                left: `${15 + i * 20}%`,
              }}
            >
              <Icon size={40 + i * 20} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 md:px-12 bg-white/5 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Citizens Served', value: '1.4B+' },
            { label: 'Smart Nodes', value: '45k+' },
            { label: 'Network Latency', value: '1.2ms' },
            { label: 'Govt Services', value: '800+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h4 className="text-2xl md:text-4xl font-display font-bold text-cyan-400 mb-2">{stat.value}</h4>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-mono">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pagination/Controls */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
         <button className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group order-2 md:order-1">
            <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-all">
               <ArrowLeft size={16} />
            </div>
            <span className="text-xs uppercase tracking-widest font-mono">Overview</span>
         </button>

         <div className="flex gap-2 order-1 md:order-2">
            {[1, 2, 3].map(p => (
               <motion.button
                  key={p}
                  whileHover={{ scale: 1.2 }}
                  className={cn(
                     "w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs transition-all",
                     p === 1 ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "glass text-white/40 hover:text-white"
                  )}
               >
                  0{p}
               </motion.button>
            ))}
         </div>

         <button 
            onClick={() => navigate('/services')}
            className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group text-right order-3"
         >
            <span className="text-xs uppercase tracking-widest font-mono">Service Nodes</span>
            <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-all">
               <ArrowRight size={16} />
            </div>
         </button>
      </div>
    </Layout>
  );
}
