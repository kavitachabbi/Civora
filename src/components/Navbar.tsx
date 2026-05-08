import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isTransportationPage = location.pathname === '/transportation';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-4',
        isScrolled ? 'glass-glow py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <Link to="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30 group-hover:neon-border transition-all">
            <ShieldCheck className="text-cyan-400 w-6 h-6" />
          </div>
          <motion.div className="flex flex-col -space-y-1">
            <span className="font-display font-bold text-xl tracking-tighter">CIVORA</span>
            <span className="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-cyan-400 transition-colors">Digital India</span>
          </motion.div>
        </Link>

        {/* Center - Links or Title */}
        {isTransportationPage ? (
          <div className="hidden md:flex items-center">
             <span className="text-sm font-mono uppercase tracking-[0.3em] text-cyan-400 glow-sm">CIVORA Smart Transportation</span>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-10">
            {[
              { name: 'Dashboard', path: '/dashboard' },
              { name: 'Services', path: '/services' },
              { name: 'Infrastructure', path: '#' },
              { name: 'AI Governance', path: '#' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium text-white/70 hover:text-cyan-400 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>
        )}

        {/* Right - Action */}
        <div className="hidden md:block">
          {isTransportationPage ? (
            <div className="flex items-center gap-4">
               <button className="p-2 glass rounded-xl hover:neon-border transition-all">
                  <User size={20} className="text-white/60 hover:text-white" />
               </button>
               <button 
                 onClick={() => navigate('/auth')}
                 className="p-2 glass rounded-xl hover:border-red-500/50 transition-all group/logout"
               >
                  <LogOut size={20} className="text-white/60 group-hover/logout:text-red-400" />
               </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/auth')}
              className="btn-primary flex items-center gap-2 group"
            >
              <span>Secure Access</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.div>
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white/70"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 glass-glow border-t-0 p-6 flex flex-col gap-6"
          >
            {[
              { name: 'Dashboard', path: '/dashboard' },
              { name: 'Services', path: '/services' },
              { name: 'Infrastructure', path: '#' },
              { name: 'AI Governance', path: '#' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-lg font-medium text-white/70 hover:text-cyan-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }}
              className="btn-primary w-full text-center"
            >
              Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
