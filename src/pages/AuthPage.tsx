import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Loader2, Eye, EyeOff, Lock, Mail, Key, ArrowLeft, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import { cn } from '../lib/utils';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'citizen' | 'admin'>('citizen');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/services');
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl"
        >
          {/* Tab Switcher */}
          <div className="flex p-1 bg-white/5 rounded-2xl glass mb-10 border-white/5">
            <button
              onClick={() => setActiveTab('citizen')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 font-medium text-sm",
                activeTab === 'citizen' ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-white/40 hover:text-white"
              )}
            >
              <User size={18} />
              Citizen Login
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 font-medium text-sm",
                activeTab === 'admin' ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" : "text-white/40 hover:text-white"
              )}
            >
              <Shield size={18} />
              Admin Portal
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'citizen' ? (
              <motion.div
                key="citizen"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-glow rounded-3xl p-10 border border-white/5 shadow-2xl relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                   <User size={100} />
                 </div>
                 
                 <h2 className="text-3xl font-display font-bold mb-2">Citizen <span className="neon-text">Access</span></h2>
                 <p className="text-white/40 text-sm mb-8">Access public utilities, health services, and reporting systems.</p>

                 <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Digital Mail</label>
                       <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-cyan-400 transition-colors" />
                          <input 
                            type="email" 
                            required
                            placeholder="user@civora.in"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all placeholder:text-white/20"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Access Key</label>
                       <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-cyan-400 transition-colors" />
                          <input 
                            type={showPassword ? "text" : "password"} 
                            required
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all placeholder:text-white/20"
                          />
                          <button 
                             type="button"
                             onClick={() => setShowPassword(!showPassword)}
                             className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                          >
                             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                       </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                       <label className="flex items-center gap-2 text-white/40 cursor-pointer hover:text-white transition-colors">
                          <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-cyan-500/50" />
                          Remember Node
                       </label>
                       <a href="#" className="text-cyan-400 hover:underline">Forgot Key?</a>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="btn-primary w-full py-4 flex items-center justify-center gap-3"
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : 'Enter Platform'}
                    </button>
                    
                    <p className="text-center text-white/30 text-xs">
                      Don't have a Digital ID? <a href="#" className="text-white hover:text-cyan-400">Register with Aadhaar Smart Link</a>
                    </p>
                 </form>
              </motion.div>
            ) : (
              <motion.div
                key="admin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-glow rounded-3xl p-10 border border-white/5 shadow-2xl relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Shield size={100} className="text-purple-400" />
                 </div>
                 
                 <h2 className="text-3xl font-display font-bold mb-2">Admin <span className="text-purple-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]">CommandCenter</span></h2>
                 <p className="text-white/40 text-sm mb-8">Authorised personnel only. Level 4 clearance required.</p>

                 <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-purple-400 uppercase tracking-widest">Admin Signature</label>
                       <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                          <input 
                            type="email" 
                            required
                            placeholder="admin.alpha@gov.in"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all placeholder:text-white/20"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-mono text-purple-400 uppercase tracking-widest">Security Code</label>
                       <div className="relative group">
                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                          <input 
                            type="password" 
                            required
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all placeholder:text-white/20"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-mono text-purple-400 uppercase tracking-widest">2FA Node Verification</label>
                       <input 
                          type="text" 
                          required
                          placeholder="CIV-XXXX-XXXX"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 font-mono text-center tracking-widest focus:ring-2 focus:ring-purple-400/50 outline-none transition-all placeholder:text-white/20"
                       />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-600/30 shadow-lg py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95"
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : 'Initialise Overlink'}
                    </button>
                    
                    <div className="text-center">
                       <a href="#" className="text-white/20 hover:text-white text-xs uppercase tracking-tighter">Emergency Infrastructure Override</a>
                    </div>
                 </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination/Controls */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 mt-12">
           <button 
             onClick={() => navigate('/')}
             className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group order-2 md:order-1"
           >
              <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-all">
                 <ArrowLeft size={16} />
              </div>
              <span className="text-xs uppercase tracking-widest font-mono">Return to Home</span>
           </button>

           <div className="flex gap-2 order-1 md:order-2">
              {[1, 2, 3].map(p => (
                 <motion.button
                    key={p}
                    whileHover={{ scale: 1.2 }}
                    className={cn(
                       "w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs transition-all",
                       p === 2 ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "glass text-white/40 hover:text-white"
                    )}
                 >
                    0{p}
                 </motion.button>
              ))}
           </div>

           <button className="flex items-center gap-3 text-white/30 cursor-not-allowed group text-right order-3">
              <span className="text-xs uppercase tracking-widest font-mono italic">Secure Link</span>
              <div className="p-2 rounded-full border border-white/10 opacity-30">
                 <ArrowRight size={16} />
              </div>
           </button>
        </div>
      </div>
    </Layout>
  );
}
