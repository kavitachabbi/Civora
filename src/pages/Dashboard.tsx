import { motion } from 'motion/react';
import { 
  Truck, 
  Trash2, 
  HeartPulse, 
  Gavel, 
  TrendingUp, 
  Bell, 
  Activity, 
  ShieldAlert,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import Layout from '../components/Layout';
import ServiceCard from '../components/ServiceCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
  {
    title: "Transportation",
    description: "Real-time traffic management, autonomous signal routing, pothole reporting, and rapid road damage intervention system.",
    icon: Truck,
    stats: "LIVE FLOW: 98%",
    gradient: "linear-gradient(to bottom right, #00E5FF, #2563EB)",
  },
  {
    title: "Waste Management",
    description: "Sensor-powered garbage tracking, automated collection scheduling, area cleanliness auditing, and recycling awareness hub.",
    icon: Trash2,
    stats: "CLEAN INDEX: 94",
    gradient: "linear-gradient(to bottom right, #10B981, #059669)",
  },
  {
    title: "Healthcare",
    description: "Unified portal for bed availability, ambulance GPS tracking, digital vaccination records, and emergency health support nodes.",
    icon: HeartPulse,
    stats: "READY: 100%",
    gradient: "linear-gradient(to bottom right, #EF4444, #B91C1C)",
  },
  {
    title: "Govt Services",
    description: "Instant digital certificates, e-grievance tracking, legislative updates, and automated public service verification portal.",
    icon: Gavel,
    stats: "UPTIME: 99.9%",
    gradient: "linear-gradient(to bottom right, #8B5CF6, #6D28D9)",
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Infrastructure <span className="neon-text">Holography</span>
            </h1>
            <p className="text-white/40 max-w-xl">
              Monitoring global public utility nodes and citizen service protocols in real-time. System status prioritised for smart mobility and healthcare.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4"
          >
            <div className="glass px-6 py-4 rounded-2xl flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Total Efficiency</span>
              <span className="text-2xl font-display font-bold text-cyan-400">96.8%</span>
            </div>
            <div className="glass px-6 py-4 rounded-2xl flex flex-col items-end border-purple-500/20">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Network Health</span>
              <span className="text-2xl font-display font-bold text-purple-400">Optimal</span>
            </div>
          </motion.div>
        </header>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="lg:col-span-2 glass-glow rounded-3xl p-8 min-h-[300px] relative overflow-hidden"
          >
             <div className="flex justify-between items-center mb-8">
                <h3 className="flex items-center gap-2 font-display font-bold text-lg">
                   <TrendingUp className="text-cyan-400" />
                   AI Demand Forecasting
                </h3>
                <div className="flex gap-2">
                   {['24H', '7D', '30D'].map(t => (
                      <button key={t} className="px-3 py-1 text-[10px] glass rounded-full hover:bg-white/10 transition-colors uppercase">{t}</button>
                   ))}
                </div>
             </div>
             
             {/* Mock Chart Visualization */}
             <div className="flex items-end gap-3 h-40">
                {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 50, 65].map((h, i) => (
                   <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 1 }}
                      className="flex-1 bg-gradient-to-t from-cyan-600/50 to-cyan-400 rounded-t-sm relative group"
                   >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-bold px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h}%
                      </div>
                   </motion.div>
                ))}
             </div>
             <div className="mt-4 flex justify-between px-2">
                <span className="text-[10px] text-white/30 font-mono italic">00:00:00</span>
                <span className="text-[10px] text-white/30 font-mono italic">DATASTREAM_ACTIVE</span>
                <span className="text-[10px] text-white/30 font-mono italic">23:59:59</span>
             </div>
          </motion.div>

          <div className="space-y-6">
             {[
                { icon: Bell, label: 'Push Notifications', color: 'text-cyan-400', count: 12 },
                { icon: Activity, label: 'Active Reports', color: 'text-purple-400', count: 5 },
                { icon: ShieldAlert, label: 'Sec Alert', color: 'text-red-400', count: 0 },
             ].map((item, i) => (
                <motion.div
                   key={i}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="glass p-5 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-white/20 transition-all"
                >
                   <div className="flex items-center gap-4">
                      <div className={cn("p-3 rounded-xl glass", item.color)}>
                         <item.icon size={20} />
                      </div>
                      <span className="text-sm font-medium opacity-70 group-hover:opacity-100">{item.label}</span>
                   </div>
                   <span className={cn("font-mono font-bold", item.count > 0 ? "text-white" : "opacity-20")}>{item.count}</span>
                </motion.div>
             ))}

             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="h-40 bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 rounded-3xl border border-cyan-500/20 p-6 flex flex-col justify-end relative overflow-hidden"
             >
                <div className="absolute top-4 left-4 font-display font-bold opacity-20 text-3xl">SMART CITY</div>
                <p className="text-xs text-white/60 mb-4">Connect dynamic infrastructure modules to your local grid.</p>
                <button className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all">
                   Manage Nodes
                   <ArrowRight size={14} />
                </button>
             </motion.div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} {...service} delay={i * 0.1} />
          ))}
        </div>

        {/* Pagination/Controls */}
        <div className="flex justify-between items-center py-8 border-t border-white/5">
           <button 
             onClick={() => navigate('/auth')}
             className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
           >
              <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-all">
                 <ArrowLeft size={16} />
              </div>
              <span className="text-xs uppercase tracking-widest font-mono">Previous Node</span>
           </button>

           <div className="flex gap-2">
              {[1, 2, 3].map(p => (
                 <motion.button
                    key={p}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => p === 2 && navigate('/services')}
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
             className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group text-right"
           >
              <span className="text-xs uppercase tracking-widest font-mono">Archive Sector</span>
              <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-all">
                 <ArrowRight size={16} />
              </div>
           </button>
        </div>
      </div>
    </Layout>
  );
}
