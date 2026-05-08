import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ShieldAlert, Cpu, Radio, Maximize2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AICameraProps {
  isScanning: boolean;
  detections: any[];
}

export default function AICamera({ isScanning, detections }: AICameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    if (isScanning) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(err => console.error("Camera access denied:", err));
    } else {
      stream?.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    return () => stream?.getTracks().forEach(track => track.stop());
  }, [isScanning]);

  return (
    <div className="cyber-card group !p-0">
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <Camera size={18} className="text-cyan-400" />
        <h3 className="font-display font-bold text-xs uppercase tracking-widest">AI Vision Feed</h3>
        {isScanning && (
          <div className="flex items-center gap-2 px-2 py-0.5 glass rounded-full border-red-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[8px] font-mono font-bold text-red-400">REC 4K</span>
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="glass px-2 py-0.5 rounded-md text-[8px] font-mono text-cyan-400">FPS: {fps}</div>
        <button className="p-1 glass rounded-md hover:neon-border transition-all">
          <Maximize2 size={12} />
        </button>
      </div>

      <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border border-white/5">
        {isScanning ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover opacity-80 scale-105 transition-transform duration-500"
            />
            {/* AI HUD Overlays */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="scanner-line" />
              
              {/* Corner Brackets */}
              <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50" />
              <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50" />
              <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50" />
              <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50" />

              {/* Detections Overlay */}
              <AnimatePresence>
                {detections.map((d, i) => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute border-2 border-red-500 bg-red-500/10 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                    style={{
                      top: '30%',
                      left: '40%',
                      width: '120px',
                      height: '80px',
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest flex items-center gap-1">
                      <ShieldAlert size={8} />
                      Pothole Detected: {d.severity}
                    </div>
                    <div className="absolute -bottom-5 right-0 text-[8px] font-mono text-red-400 font-bold">
                      CONF: {d.confidence}%
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Radar Animation */}
              <div className="absolute bottom-4 left-4 w-12 h-12 glass rounded-full border-cyan-500/30 overflow-hidden">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#00E5FF_0deg,transparent_90deg)] animate-[spin_4s_linear_infinite] opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Radio size={12} className="text-cyan-400/50" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#06142E]/80">
            <div className="p-4 glass rounded-3xl border-white/5 animate-float">
              <Cpu size={40} className="text-white/10" />
            </div>
            <div className="text-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">Camera Status</div>
              <div className="text-xs font-bold text-white/50">STANDBY MODE</div>
            </div>
          </div>
        )}

        {/* Global HUD Text */}
        <div className="absolute bottom-4 left-20 z-20 flex flex-col gap-1">
          <div className="text-[8px] font-mono text-cyan-400/50 uppercase tracking-tighter">LAT: 12.9716° N</div>
          <div className="text-[8px] font-mono text-cyan-400/50 uppercase tracking-tighter">LON: 77.5946° E</div>
        </div>
      </div>
    </div>
  );
}
