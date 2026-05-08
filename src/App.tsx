import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ServicesPage from './pages/ServicesPage';
import TransportationPage from './pages/TransportationPage';
import SmartTransitPage from './pages/SmartTransitPage';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/transportation" element={<TransportationPage />} />
        <Route path="/pothole-detection" element={<SmartTransitPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to show high-end loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <AnimatedRoutes key="routes" />
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
