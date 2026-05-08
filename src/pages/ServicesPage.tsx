import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bus, 
  Train, 
  Navigation, 
  Activity, 
  HeartPulse, 
  Hospital, 
  Recycle, 
  Trash2, 
  Leaf, 
  Building, 
  FileText, 
  Landmark,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import Layout from '../components/Layout';
import { cn } from '../lib/utils';

interface ServiceDetail {
  title: string;
  description: string;
  image: string;
  icons: any[];
  color: string;
  hoverEffect: string;
  path?: string;
}

function ParallaxServiceCard({ service, index }: { service: ServiceDetail; index: number }) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative h-[500px] rounded-3xl overflow-hidden glass-glow border-white/5"
    >
      {/* Image with Parallax and Gradient Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          style={{ y, scale: 1.2 }}
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-opacity duration-700 opacity-40 group-hover:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06142E] via-[#06142E]/80 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="mb-6 flex gap-4">
          {service.icons.map((Icon, idx) => (
            <div key={idx} className="p-2 rounded-lg glass border-white/10 group-hover:neon-border transition-all">
              <Icon className="w-5 h-5 text-cyan-400" />
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-cyan-400 transition-colors">
          {service.title}
        </h3>
        
        <p className="text-white/60 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-32">
          {service.description}
        </p>

        <button 
          onClick={() => service.path && navigate(service.path)}
          className="btn-primary w-full py-3 flex items-center justify-center gap-2 group/btn"
        >
          Explore More
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Special Animated Background Accents */}
      <div className="absolute top-0 right-0 p-6 pointer-events-none overflow-hidden h-full w-full">
         {service.hoverEffect === 'traffic-line' && (
            <motion.div 
              animate={{ x: [-200, 400], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-0.5 w-40 bg-cyan-400 blur-[2px] absolute top-10 left-0"
            />
         )}
         {service.hoverEffect === 'heartbeat' && (
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0, 0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-20 h-20 bg-rose-500 rounded-full blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
         )}
      </div>
    </motion.div>
  );
}

const SERVICES_DETAIL: ServiceDetail[] = [
  {
    title: "Smart Transportation",
    description: "AI-powered traffic management, intelligent public transit systems, smart mobility solutions, and connected transportation infrastructure designed for faster, safer, and more efficient urban travel.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    icons: [Bus, Train, Navigation],
    color: "cyan",
    hoverEffect: "traffic-line",
    path: "/transportation",
  },
  {
    title: "Digital Healthcare",
    description: "Advanced healthcare infrastructure powered by AI diagnostics, digital patient systems, telemedicine, and connected medical services ensuring accessible and efficient healthcare for every citizen.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    icons: [HeartPulse, Hospital, Activity],
    color: "rose",
    hoverEffect: "heartbeat",
  },
  {
    title: "Smart Waste Management",
    description: "Intelligent waste collection systems, AI-powered monitoring, recycling infrastructure, and sustainable urban sanitation technologies promoting cleaner and greener smart cities.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
    icons: [Recycle, Trash2, Leaf],
    color: "emerald",
    hoverEffect: "eco-ring",
  },
  {
    title: "Government Services",
    description: "Digitally connected government offices providing transparent governance, online citizen services, AI-driven administration, and smart public infrastructure management.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    icons: [Building, FileText, Landmark],
    color: "purple",
    hoverEffect: "data-flow",
  }
];

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative">
        
        {/* Page Header */}
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass border-cyan-500/20 text-cyan-400 text-[10px] uppercase tracking-widest mb-6"
          >
            Digital India 2.0
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Smart Public <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Infrastructure Services</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Transforming cities through intelligent transportation, digital healthcare, sustainable waste systems, and modern governance.
          </motion.p>
          
          {/* Animated Glow Line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-8 blur-[1px]"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES_DETAIL.map((service, i) => (
            <ParallaxServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Stats Summary Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 glass-glow p-10 rounded-[3rem] border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          <div className="flex-1">
            <h2 className="text-3xl font-display font-bold mb-4">Infrastructure <span className="neon-text">Hologram</span></h2>
            <p className="text-white/40 max-w-md">Aggregated real-time data from over 45,000 smart nodes across the nation's digital corridors.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 flex-[2]">
            {[
              { icon: Zap, label: "Energy Efficiency", val: "94%" },
              { icon: Globe, label: "Network Coverage", val: "99.8%" },
              { icon: ShieldCheck, label: "Data Integrity", val: "Safe" },
              { icon: Activity, label: "Live Nodes", val: "1.2M" },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-cyan-500 group-hover:scale-125 transition-transform" />
                <div className="text-xl font-bold font-display">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/30">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pagination/Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 mt-20 border-t border-white/5">
           <button 
             onClick={() => navigate('/dashboard')}
             className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group order-2 md:order-1"
           >
              <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-all">
                 <ArrowLeft size={16} />
              </div>
              <span className="text-xs uppercase tracking-widest font-mono">Operations Overview</span>
           </button>

           <div className="flex gap-2 order-1 md:order-2">
              {[1, 2, 3].map(p => (
                 <motion.button
                    key={p}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => p === 1 && navigate('/dashboard')}
                    className={cn(
                       "w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs transition-all",
                       p === 2 ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "glass text-white/40 hover:text-white"
                    )}
                 >
                    0{p}
                 </motion.button>
              ))}
           </div>

           <button 
             onClick={() => navigate('/dashboard')}
             className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group text-right order-3"
           >
              <span className="text-xs uppercase tracking-widest font-mono">Infrastructure Nodes</span>
              <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-all">
                 <ArrowRight size={16} />
              </div>
           </button>
        </div>
      </div>
    </Layout>
  );
}
