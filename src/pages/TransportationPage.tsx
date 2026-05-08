import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  MapPin, 
  Bus, 
  Navigation, 
  ShieldAlert, 
  ArrowLeft, 
  ArrowRight, 
  User, 
  LogOut,
  Map,
  Clock,
  Wifi,
  AlertCircle,
  Truck
} from 'lucide-react';
import Layout from '../components/Layout';
import { cn } from '../lib/utils';

const FEATURES = [
  {
    title: "Smart Traffic Monitoring",
    description: "Monitor real-time city traffic using intelligent AI-powered systems that help reduce congestion, optimize signal timings, and improve road efficiency.",
    features: ["Live traffic updates", "Congestion detection", "Smart traffic signal management", "Traffic heatmaps", "Accident alerts"],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    icon: Activity,
  },
  {
    title: "Pothole & Road Damage Reporting",
    description: "Enable citizens to instantly report potholes and damaged roads, helping authorities improve road safety and maintenance efficiency.",
    features: ["Upload damaged road photos", "GPS location tagging", "Complaint tracking system", "Priority issue management", "Road repair request monitoring"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    icon: AlertCircle,
  },
  {
    title: "Public Transport Tracking",
    description: "Track public transportation in real time and improve travel planning with smart route monitoring and live transit updates.",
    features: ["Live bus and metro tracking", "Estimated arrival times", "Route navigation system", "Delay notifications", "Nearby station finder"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    icon: Bus,
  },
  {
    title: "Smart Parking Management",
    description: "Reduce urban traffic congestion with intelligent parking systems that help users locate and reserve available parking spaces efficiently.",
    features: ["Real-time parking availability", "Parking reservation system", "Digital payment support", "Smart parking maps", "Parking occupancy analytics"],
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800",
    icon: Navigation,
  },
  {
    title: "Emergency Road Assistance",
    description: "Improve public road safety through rapid emergency support systems and faster response coordination during transportation emergencies.",
    features: ["Emergency SOS button", "Accident reporting system", "Ambulance contact integration", "Nearby police station support", "Live emergency response tracking"],
    image: "https://images.unsplash.com/photo-1582719202047-76d3432ee323?auto=format&fit=crop&q=80&w=800",
    icon: ShieldAlert,
  }
];

export default function TransportationPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
        {/* Header */}
        <div className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Mobility <span className="neon-text">Intelligence</span> Network
          </motion.h1>
          <p className="text-white/40 max-w-2xl">
            Integrating AI-driven traffic analytics with citizen-first infrastructure modules for a secondary-level smart city mobility experience.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative glass-glow rounded-3xl overflow-hidden border border-white/5 h-full flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06142E] to-transparent" />
                <div className="absolute top-4 right-4 p-3 glass rounded-2xl border-white/10 group-hover:neon-border transition-all">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-display font-bold mb-4 group-hover:neon-text transition-all">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50 mb-6 flex-grow leading-relaxed">
                  {feature.description}
                </p>

                <div className="space-y-3 mb-8">
                  {feature.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-white/30 group-hover:text-white/70 transition-colors">
                      <div className="w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_5px_rgba(0,229,255,0.8)]" />
                      {f}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => feature.title === "Pothole & Road Damage Reporting" ? navigate('/pothole-detection') : null}
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2 group/btn"
                >
                  Explore Module
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 mt-20 border-t border-white/5">
           <button 
             onClick={() => navigate('/services')}
             className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
           >
              <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-all">
                 <ArrowLeft size={16} />
              </div>
              <span className="text-xs uppercase tracking-widest font-mono">Back to Services</span>
           </button>

           <div className="flex gap-2">
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
             onClick={() => navigate('/dashboard')}
             className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group text-right"
           >
              <span className="text-xs uppercase tracking-widest font-mono">Operations Hub</span>
              <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-all">
                 <ArrowRight size={16} />
              </div>
           </button>
        </div>
      </div>
    </Layout>
  );
}
