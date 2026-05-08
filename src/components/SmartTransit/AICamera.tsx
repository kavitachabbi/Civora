import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ScanLine } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AICameraProps {
  isScanning: boolean;
  detections: any[];
}

export default function AICamera({ isScanning, detections }: AICameraProps) {
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment", // STRICTLY USE REAR/ROAD CAMERA
  };

  return (
    <div className="cyber-card relative overflow-hidden group h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-2 rounded-lg",
            isScanning ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-white/40"
          )}>
            <ScanLine size={16} />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm">Road Surface Scanner</h3>
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Rear-Cam-02</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 glass rounded-md border-cyan-500/30">
            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isScanning ? "bg-cyan-500" : "bg-red-500")} />
            <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">
              {isScanning ? "Road-AI Active" : "Standby"}
            </span>
          </div>
        </div>
      </div>

      {/* Camera Feed Container */}
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-black">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover grayscale-[0.2] brightness-90"
        />

        {/* AI Overlays */}
        <AnimatePresence>
          {isScanning && (
            <>
              {/* Scan Line Animation */}
              <motion.div 
                initial={{ top: 0 }}
                animate={{ top: '100%' }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20 shadow-[0_0_15px_rgba(0,229,255,0.8)]"
              />

              {/* HUD Elements */}
              <div className="absolute inset-0 pointer-events-none p-4 font-mono">
                {/* Corners */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50" />

                {/* Telemetry */}
                <div className="absolute top-8 left-8 space-y-1 text-[8px] text-cyan-400/60 uppercase tracking-tighter">
                  <div>SENSOR: REAR_ARRAY</div>
                  <div>FACING: ENVIRONMENT</div>
                  <div>FPS: 60.0</div>
                </div>

                {/* Detection Box Simulation */}
                {detections.map((det) => (
                  <motion.div 
                    key={det.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 border-2",
                      det.severity === 'Dangerous' || det.severity === 'High' ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]" : "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                    )}
                  >
                    <div className={cn(
                      "absolute -top-6 left-0 px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase",
                      det.severity === 'Dangerous' || det.severity === 'High' ? "bg-red-500 text-white" : "bg-yellow-400 text-black"
                    )}>
                      Surface {det.severity}: {det.confidence}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Status Text Overlay */}
        {!isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <Camera size={40} className="mx-auto text-white/20 animate-pulse" />
              <p className="text-[10px] uppercase tracking-widest text-white/40">Securing Road Feed...</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
             <span className="text-[10px] font-bold text-white/80">RoadAI Core</span>
           </div>
           <div className="flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
             <span className="text-[10px] text-white/30 uppercase tracking-tighter">ENVIRONMENT_SCAN_ONLY</span>
           </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-mono italic">
           PRIVACY_SHIELD_ACTIVE
        </div>
      </div>
    </div>
  );
}
