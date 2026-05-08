import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Navigation, 
  MapPin, 
  AlertTriangle, 
  Camera, 
  ShieldAlert, 
  Zap, 
  ArrowLeft,
  Settings,
  Cpu,
  Volume2,
  Download,
  Clock,
  History,
  Truck,
  Database,
  Map as MapIcon,
  ShieldCheck,
  ChevronRight,
  Route
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ResponsiveContainer, BarChart, Bar } from 'recharts';
import Layout from '../components/Layout';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

// Sub-components
import AICamera from '../components/SmartTransit/AICamera';
import EmergencySystem from '../components/SmartTransit/EmergencySystem';
import AnalysisPanel from '../components/SmartTransit/AnalysisPanel';
import RouteEngine from '../components/SmartTransit/RouteEngine';
import WeatherPanel from '../components/SmartTransit/WeatherPanel';

// Leaflet Icons
const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const potholeIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/595/595067.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

// Mock Data
const TREND_DATA = [
  { day: 'Mon', count: 12 }, { day: 'Tue', count: 19 }, { day: 'Wed', count: 15 },
  { day: 'Thu', count: 22 }, { day: 'Fri', count: 30 }, { day: 'Sat', count: 10 },
  { day: 'Sun', count: 8 },
];

export default function SmartTransitPage() {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [startLocation, setStartLocation] = useState('Smart City Hub');
  const [destination, setDestination] = useState('Green Tech District');
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [detectedPotholes, setDetectedPotholes] = useState<any[]>([]);
  const [emergencyAlert, setEmergencyAlert] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] = useState<[number, number]>([12.9716, 77.5946]);
  const [logs, setLogs] = useState<any[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showAlternate, setShowAlternate] = useState(false);

  // Simulation Logic
  useEffect(() => {
    let interval: any;
    if (isNavigating) {
      interval = setInterval(() => {
        setCurrentSpeed(prev => Math.max(40, Math.min(80, prev + (Math.random() * 10 - 5))));
        setCurrentCoords(prev => [prev[0] + 0.0001, prev[1] + 0.0001]);
        if (Math.random() > 0.95) triggerDetection();
      }, 2000);
    } else {
      setCurrentSpeed(0);
    }
    return () => clearInterval(interval);
  }, [isNavigating]);

  const triggerDetection = () => {
    const severities = ['Low', 'Medium', 'High', 'Dangerous'];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    
    const newPothole = {
      id: Date.now(),
      coords: [currentCoords[0] + 0.0002, currentCoords[1] + 0.0002],
      severity,
      confidence: (92 + Math.random() * 8).toFixed(1),
      time: new Date().toLocaleTimeString(),
      road: "Innovation Boulevard",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400" // ROAD ONLY IMAGE
    };

    setDetectedPotholes(prev => [newPothole, ...prev]);
    setLogs(prev => [{ 
      id: Date.now(), 
      type: 'detection', 
      message: `${severity} Hazard Detected on Road`, 
      time: new Date().toLocaleTimeString(),
      severity 
    }, ...prev]);

    if (severity === 'Dangerous' || severity === 'High') {
      setEmergencyAlert(`DANGER AHEAD: ${severity} level pothole detected on current route.`);
      if (severity === 'Dangerous') setShowAlternate(true);
    }
  };

  const generatePDFReport = (pothole: any) => {
    const doc = new jsPDF();
    doc.text("ROAD DAMAGE REPORT", 20, 20);
    doc.text(`Severity: ${pothole.severity}`, 20, 30);
    doc.text(`Location: ${pothole.coords}`, 20, 40);
    doc.save(`RoadReport_${pothole.id}.pdf`);
  };

  // Route Path Generation (Simplified)
  const mainRoute = useMemo(() => {
    const points: [number, number][] = [];
    for (let i = 0; i < 20; i++) {
      points.push([12.9716 + i * 0.0005, 77.5946 + i * 0.0005]);
    }
    return points;
  }, []);

  const alternateRoute = useMemo(() => {
    const points: [number, number][] = [];
    for (let i = 0; i < 20; i++) {
      points.push([12.9716 + i * 0.0005, 77.5946 + (i * 0.0005) - 0.001]);
    }
    return points;
  }, []);

  // Split route into colored segments
  const routeSegments = useMemo(() => {
    const dangerPointIndex = 10;
    const safePart = mainRoute.slice(0, dangerPointIndex + 1);
    const dangerPart = mainRoute.slice(dangerPointIndex);
    return { safePart, dangerPart };
  }, [mainRoute]);

  return (
    <Layout>
      <div className="min-h-screen bg-[#06142E] pt-24 pb-12 px-6 overflow-hidden">
        <EmergencySystem 
          alert={emergencyAlert} 
          onClose={() => setEmergencyAlert(null)} 
          voiceEnabled={voiceEnabled}
        />

        {/* Top Header */}
        <div className="max-w-[1600px] mx-auto mb-8 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div className="flex items-center gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
              <button onClick={() => navigate('/transportation')} className="p-2 glass rounded-xl hover:neon-border transition-all">
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-3xl font-display font-black tracking-tighter uppercase">
                  SmartTransit<span className="neon-text">X</span> <span className="text-white/20 text-lg ml-2 font-light">Road AI v5.0</span>
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 glass rounded-md border-cyan-500/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-cyan-400 font-bold uppercase tracking-widest">Environment Scan: On</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="flex items-center gap-4">
             <div className="glass p-3 rounded-2xl flex items-center gap-6">
                <div className="flex flex-col items-end">
                   <span className="text-[10px] uppercase tracking-tighter text-white/30">Privacy Shield</span>
                   <span className="text-xs font-mono font-bold text-green-400">PERSONAL_DATA_EXCLUDED</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10" />
                <button onClick={() => setVoiceEnabled(!voiceEnabled)} className={cn("p-3 rounded-xl transition-all", voiceEnabled ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-white/30")}>
                   <Volume2 size={20} />
                </button>
             </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
          {/* LEFT: NAV & WEATHER */}
          <div className="lg:col-span-3 space-y-6">
            <RouteEngine 
              isNavigating={isNavigating}
              start={startLocation} setStart={setStartLocation}
              dest={destination} setDest={setDestination}
              speed={currentSpeed} eta="12:45 PM" distance="3.2 KM"
              onToggleNavigation={() => setIsNavigating(!isNavigating)}
            />
            <WeatherPanel />
            
            {/* Alternate Route Suggestion */}
            <AnimatePresence>
              {showAlternate && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="cyber-card bg-green-500/10 border-green-500/30 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-2">
                    <ShieldCheck size={14} className="text-green-400" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-green-400 mb-2">Safe Route Suggestion</h3>
                  <p className="text-[10px] text-white/60 mb-4">Dangerous potholes detected on main route. Switching to Alternate Green Path.</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-[8px] uppercase tracking-widest text-white/30">Safety Bonus</div>
                      <div className="text-lg font-mono font-bold text-green-400">+45%</div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase tracking-widest text-white/30">Time Diff</div>
                      <div className="text-lg font-mono font-bold text-yellow-400">+2m</div>
                    </div>
                  </div>
                  <button onClick={() => setShowAlternate(false)} className="w-full py-2 bg-green-500/20 text-green-400 border border-green-500/40 rounded-xl text-[10px] font-bold uppercase tracking-widest">
                    Apply Reroute
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MIDDLE: AI FEED & MAP */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <AICamera isScanning={isNavigating} detections={detectedPotholes.slice(0, 1)} />
              <div className="cyber-card relative flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Database size={80} />
                </div>
                <div>
                   <h3 className="font-display font-bold text-sm mb-4">Detection History</h3>
                   <div className="space-y-3">
                      {detectedPotholes.slice(0, 2).map(p => (
                        <div key={p.id} className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
                           <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={p.image} className="w-full h-full object-cover" alt="road" />
                           </div>
                           <div className="flex-grow">
                              <div className="text-[9px] font-bold text-white/80">{p.road}</div>
                              <div className={cn("text-[8px] font-mono", p.severity === 'Dangerous' ? 'text-red-500' : 'text-cyan-400')}>
                                 {p.severity} PRIORITY
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="pt-4 flex justify-between items-end">
                   <div>
                      <div className="text-[8px] uppercase tracking-widest text-white/30">Total Detected</div>
                      <div className="text-2xl font-mono font-black">{detectedPotholes.length}</div>
                   </div>
                   <BarChart3 className="text-cyan-400" size={24} />
                </div>
              </div>
            </div>

            <div className="h-[500px] relative rounded-[2.5rem] overflow-hidden border border-white/10 dark-map shadow-2xl">
              <MapContainer center={currentCoords} zoom={16} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {/* Main Route Rendering */}
                <Polyline positions={routeSegments.safePart} pathOptions={{ color: '#00E5FF', weight: 8, opacity: 0.6 }} />
                
                {/* Danger Route Section (RED) */}
                <Polyline 
                  positions={routeSegments.dangerPart} 
                  pathOptions={{ color: '#FF3B3B', weight: 8, opacity: 0.8, dashArray: '10, 15' }} 
                  className="animate-pulse"
                />

                {/* Alternate Route (GREEN) */}
                {showAlternate && (
                   <Polyline positions={alternateRoute} pathOptions={{ color: '#4ADE80', weight: 8, opacity: 0.5, dashArray: '5, 10' }} />
                )}

                <Marker position={currentCoords} icon={userIcon}>
                  <Popup>Current Vehicle Node</Popup>
                </Marker>

                {detectedPotholes.map(p => (
                   <React.Fragment key={p.id}>
                      <Circle center={p.coords as any} radius={30} pathOptions={{ fillColor: p.severity === 'Dangerous' ? '#FF3B3B' : '#EAB308', color: 'transparent', fillOpacity: 0.4 }} />
                      <Marker position={p.coords as any} icon={potholeIcon}>
                        <Popup>
                           <div className="p-2 space-y-2">
                              <img src={p.image} className="w-full h-24 object-cover rounded-lg" alt="hazard" />
                              <div className="font-bold text-xs uppercase">{p.severity} Hazard</div>
                              <button onClick={() => generatePDFReport(p)} className="w-full py-1 glass text-[8px] font-bold">PDF LOG</button>
                           </div>
                        </Popup>
                      </Marker>
                   </React.Fragment>
                ))}
                
                <MapUpdater center={currentCoords} />
              </MapContainer>

              {/* Map Floating Alert */}
              <AnimatePresence>
                {emergencyAlert && (
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
                    className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] px-6 py-3 bg-red-600/90 backdrop-blur-md rounded-2xl border border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] flex items-center gap-4"
                  >
                    <div className="p-2 bg-white rounded-full animate-pulse">
                       <AlertTriangle size={20} className="text-red-600" />
                    </div>
                    <div>
                       <div className="text-xs font-black text-white uppercase tracking-tighter">Danger Ahead</div>
                       <div className="text-[10px] text-white/80">Hazard Detected on Active Path</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: ANALYSIS & LOGS */}
          <div className="lg:col-span-3 space-y-6">
            <AnalysisPanel lastDetection={detectedPotholes[0]} />
            <div className="cyber-card flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <History size={18} className="text-cyan-400" />
                  <h3 className="font-display font-bold text-sm">Real-time Feed</h3>
                </div>
                <div className="px-2 py-0.5 bg-cyan-500/10 rounded-md text-[8px] font-bold text-cyan-400 border border-cyan-500/20">ROAD_DATA_ONLY</div>
              </div>
              <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {logs.map(log => (
                  <motion.div key={log.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className={cn("w-2 h-2 rounded-full mt-1.5 shadow-[0_0_8px_currentColor]", log.severity === 'Dangerous' ? 'text-red-500' : 'text-cyan-400')} />
                      <div className="w-[1px] h-full bg-white/10 group-last:hidden" />
                    </div>
                    <div className="pb-6">
                      <div className="text-[8px] font-mono text-white/30 mb-1">{log.time}</div>
                      <div className="text-xs font-medium text-white/80">{log.message}</div>
                      <div className="text-[9px] text-white/40 mt-1 uppercase">Cloud Log: Lat {currentCoords[0].toFixed(3)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.setView(center, map.getZoom()); }, [center, map]);
  return null;
}
