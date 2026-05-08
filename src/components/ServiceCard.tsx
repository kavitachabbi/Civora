import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  stats: string;
  gradient: string;
  className?: string;
  delay?: number;
}

export default function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  stats, 
  gradient,
  className,
  delay = 0 
}: ServiceCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={cn(
        "group relative perspective-1000",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl blur-xl" style={{ backgroundImage: gradient }} />
      
      <div className="relative glass-glow p-8 rounded-2xl h-full flex flex-col border border-white/5 hover:border-cyan-500/50 overflow-hidden transform-gpu transition-transform duration-500">
        {/* Background Grid Accent */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all" />
        
        <div className="flex justify-between items-start mb-6">
          <div className={cn("p-4 rounded-xl glass border border-white/10 group-hover:neon-border transition-all")}>
            <Icon className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="text-right">
            <span className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-1">Live Status</span>
            <span className="text-sm font-bold neon-text">{stats}</span>
          </div>
        </div>

        <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed flex-grow">
          {description}
        </p>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs font-mono text-cyan-500/70">GOVT_PROTOCOL_ENCRYPTED</span>
          <button 
            onClick={() => navigate('/services')}
            className="text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
          >
            Access Portal
          </button>
        </div>

        {/* Hover Shine Effect */}
        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[45deg] group-hover:left-[200%] transition-all duration-[1000ms]" />
      </div>
    </motion.div>
  );
}
