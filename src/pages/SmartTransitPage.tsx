import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Navigation, 
  MapPin, 
  AlertTriangle, 
  Camera, 
  ShieldAlert, 
  Zap, 
  Activity,
  ArrowLeft,
  Search,
  Settings,
  Bell,
  Radio,
  Cpu,
  Volume2,
  Download,
  Clock,
  History,
  LayoutGrid,
  Thermometer,
  CloudRain,
  Eye,
  Hammer,
  Truck,
  Database,
  BarChart3,
  TrendingUp,
  Map as MapIcon
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
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

const repairIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3256/3256334.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Mock Data
const TREND_DATA = [
  { day: 'Mon', count: 12, repairs: 8 },
  { day: 'Tue', count: 19, repairs: 15 },
  { day: 'Wed', count: 15, repairs: 12 },
  { day: 'Thu', count: 22, repairs: 18 },
  { day: 'Fri', count: 30, repairs: 25 },
  { day: 'Sat', count: 10, repairs: 14 },
  { day: 'Sun', count: 8, repairs: 10 },
];

export default function SmartTransitPage() {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [detectedPotholes, setDetectedPotholes] = useState<any[]>([]);
  const [emergencyAlert, setEmergencyAlert] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] = useState<[number, number]>([12.9716, 77.5946]);
  const [logs, setLogs] = useState<any[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<'map' | 'analytics' | 'reports'>('map');

  // Simulation
  useEffect(() => {
    let interval: any;
    if (isNavigating) {
      interval = setInterval(() => {
        setCurrentSpeed(prev => Math.max(40, Math.min(80, prev + (Math.random() * 10 - 5))));
        setCurrentCoords(prev => [prev[0] + 0.0001, prev[1] + 0.0001]);
        if (Math.random() > 0.96) triggerDetection();
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isNavigating]);

  const triggerDetection = () => {
    const severity = Math.random() > 0.7 ? 'High' : 'Medium';
    const newPothole = {
      id: Date.now(),
      coords: [currentCoords[0] + 0.0002, currentCoords[1] + 0.0002],
      severity,
      confidence: (92 + Math.random() * 8).toFixed(1),
      time: new Date().toLocaleTimeString(),
      road: "Innovation Boulevard"
    };

    setDetectedPotholes(prev => [newPothole, ...prev]);
    setLogs(prev => [{ 
      id: Date.now(), 
      type: 'detection', 
      message: `${severity} Risk Hazard Identified`, 
      time: new Date().toLocaleTimeString(),
      severity 
    }, ...prev]);

    if (severity === 'High') {
      setEmergencyAlert("WARNING: Dangerous pothole detected ahead. Reduce speed immediately.");
    }
  };

  const generatePDFReport = (pothole: any) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("SmartTransitX - AI Road Damage Report", 20, 30);
    doc.setFontSize(12);
    doc.text(`Timestamp: ${pothole.time}`, 20, 50);
    doc.text(`Location: ${pothole.coords[0].toFixed(6)}, ${pothole.coords[1].toFixed(6)}`, 20, 60);
    doc.text(`Road Name: ${pothole.road}`, 20, 70);
    doc.text(`Severity Level: ${pothole.severity}`, 20, 80);
    doc.text(`AI Confidence: ${pothole.confidence}%`, 20, 90);
    doc.text(`Status: Emergency Alert Dispatched`, 20, 100);
    doc.save(`RoadReport_${Date.now()}.pdf`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#06142E] pt-24 pb-12 px-6">
        <EmergencySystem 
          alert={emergencyAlert} 
          onClose={() => setEmergencyAlert(null)} 
          voiceEnabled={voiceEnabled}
        />

        {/* Top Header - Smart City Branding */}
        <div className="max-w-[1600px] mx-auto mb-8 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div className="flex items-center gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <button onClick={() => navigate('/transportation')} className="p-2 glass rounded-xl hover:neon-border transition-all">
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-3xl font-display font-black tracking-tighter uppercase">
                  SmartTransit<span className="neon-text">X</span> <span className="text-white/20 text-lg ml-2 font-light">v4.0 Enterprise</span>
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 glass rounded-md border-cyan-500/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-cyan-400 font-bold uppercase tracking-widest">Global Node: Active</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 glass rounded-md border-green-500/30">
                    <Database size={10} className="text-green-400" />
                    <span className="text-[8px] font-mono text-green-400 font-bold uppercase tracking-widest">Cloud Sync: OK</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex items-center gap-4 w-full xl:w-auto">
            <div className="flex-grow md:flex-none glass p-3 rounded-2xl flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-tighter text-white/30">GPS Coordinates</span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {currentCoords[0].toFixed(4)}°N, {currentCoords[1].toFixed(4)}°E
                </span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <button 
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  voiceEnabled ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-white/30"
                )}
              >
                <Volume2 size={20} />
              </button>
              <button className="p-3 bg-white/5 text-white/30 rounded-xl hover:text-white transition-all">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: NAVIGATION & WEATHER */}
          <div className="lg:col-span-3 space-y-6 overflow-y-auto max-h-[85vh] custom-scrollbar pr-2">
            <RouteEngine 
              isNavigating={isNavigating}
              start="Smart City Hub"
              dest="Green Tech District"
              speed={currentSpeed}
              eta="12:45 PM"
              distance="3.2 KM"
            />
            <WeatherPanel />
            <div className="cyber-card">
               <h3 className="font-display font-bold text-sm mb-4">Traffic Density</h3>
               <div className="h-40 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={TREND_DATA}>
                     <Bar dataKey="count" fill="#00E5FF" radius={[4, 4, 0, 0]} opacity={0.6} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: CAMERA & MAP */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <AICamera isScanning={isNavigating} detections={detectedPotholes.slice(0, 1)} />
              <div className="cyber-card flex flex-col justify-between">
                <div className="flex justify-between items-center">
                   <h3 className="font-display font-bold text-sm">System Health</h3>
                   <span className="text-[10px] text-green-400 font-bold font-mono">99.9%</span>
                </div>
                <div className="space-y-4 py-4">
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>AI Engine Load</span>
                    <span>42%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[42%] bg-cyan-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-xl text-center">
                    <div className="text-[8px] text-white/30 uppercase">Uptime</div>
                    <div className="text-xs font-mono font-bold">142H</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl text-center">
                    <div className="text-[8px] text-white/30 uppercase">Latency</div>
                    <div className="text-xs font-mono font-bold">12ms</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[500px] relative rounded-[2.5rem] overflow-hidden border border-white/10 glass dark-map shadow-2xl">
               <MapContainer center={currentCoords} zoom={16} className="h-full w-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={currentCoords} icon={userIcon}>
                    <Popup>Live Vehicle Node</Popup>
                  </Marker>
                  
                  {/* Heatmap Simulation via Circles */}
                  {detectedPotholes.map(p => (
                    <React.Fragment key={p.id}>
                      <Circle 
                        center={p.coords as any} 
                        radius={50} 
                        pathOptions={{ 
                          fillColor: p.severity === 'High' ? 'red' : 'yellow', 
                          color: 'transparent',
                          fillOpacity: 0.3
                        }} 
                      />
                      <Marker position={p.coords as any} icon={potholeIcon}>
                        <Popup>
                          <div className="p-2 min-w-[150px]">
                            <div className={cn("font-bold text-xs mb-2", p.severity === 'High' ? 'text-red-500' : 'text-yellow-500')}>
                              {p.severity} Priority Hazard
                            </div>
                            <button 
                              onClick={() => generatePDFReport(p)}
                              className="w-full py-2 glass rounded-lg text-[10px] uppercase font-bold flex items-center justify-center gap-2"
                            >
                              <Download size={12} />
                              Generate Report
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    </React.Fragment>
                  ))}

                  <MapUpdater center={currentCoords} />
               </MapContainer>
               
               {/* Map Overlays */}
               <div className="absolute top-6 left-6 z-[1000] space-y-3">
                  <div className="glass px-4 py-2 rounded-2xl flex items-center gap-3">
                    <MapIcon size={16} className="text-cyan-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Layer: AI Infrastructure</span>
                  </div>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ANALYSIS & TIMELINE */}
          <div className="lg:col-span-3 space-y-6 overflow-y-auto max-h-[85vh] custom-scrollbar pl-2">
            <AnalysisPanel lastDetection={detectedPotholes[0]} />
            
            <div className="cyber-card flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <History size={18} className="text-cyan-400" />
                  <h3 className="font-display font-bold text-sm">Event Timeline</h3>
                </div>
                <span className="text-[8px] font-mono text-white/30 uppercase">Live Feed</span>
              </div>
              
              <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/5 text-center px-4">
                     <Clock size={40} className="mb-4 opacity-10" />
                     <p className="text-[10px] uppercase tracking-widest font-mono">Waiting for node events...</p>
                  </div>
                ) : (
                  logs.map(log => (
                    <motion.div 
                      key={log.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-4 group"
                    >
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-1.5",
                          log.severity === 'High' ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-cyan-500 shadow-[0_0_8px_cyan]'
                        )} />
                        <div className="w-[1px] h-full bg-white/10 group-last:hidden" />
                      </div>
                      <div className="pb-6">
                        <div className="text-[8px] font-mono text-white/30 mb-1">{log.time}</div>
                        <div className="text-xs font-medium text-white/80">{log.message}</div>
                        <div className="text-[9px] text-white/40 mt-1 uppercase tracking-tight">Status: Logged to Cloud</div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Repair Team Card */}
            <div className="cyber-card bg-green-500/5 border-green-500/20">
               <div className="flex items-center gap-3 mb-4">
                 <Truck size={20} className="text-green-400" />
                 <h3 className="font-display font-bold text-sm text-green-400">Repair Ops</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-3 glass rounded-xl border-white/5">
                    <div className="flex justify-between text-[9px] mb-2">
                       <span className="text-white/40 uppercase">Active Units</span>
                       <span className="text-green-400 font-bold">12 Vehicles</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full w-2/3 bg-green-400" />
                    </div>
                  </div>
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
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}
