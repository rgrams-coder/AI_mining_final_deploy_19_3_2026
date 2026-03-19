
import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import Library from './views/Library';
import Notes from './views/Notes';
import RoyaltyCalc from './views/RoyaltyCalc';
import Consultancy from './views/Consultancy';
import Profile from './views/Profile';
import MonthlyReturns from './views/MonthlyReturns';
import AdminDashboard from './views/AdminDashboard';
import MineralsManagement from './views/MineralsManagement';
import Login from './views/Login';
import StarRatingCalculator from './views/StarRatingCalculator';
import RatingCalculator from './views/RatingCalculator';
import DailyProduction from './views/DailyProduction';
import StatutoryCompliance from './views/StatutoryCompliance';
import LandingPage from './components/LandingPage';
import { authService } from './authService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await authService.verifySession();
      setIsAuthenticated(valid);
      if (valid) {
        setShowLanding(false);
        setShowLogin(false);
      }
      setLoading(false);
    };
    checkAuth();

    // Session check every 5 minutes
    const interval = setInterval(async () => {
      const valid = await authService.verifySession();
      if (!valid) {
        setIsAuthenticated(false);
        authService.logout();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLanding(false);
    setShowLogin(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    setShowLogin(true);
  };

  const handleLoginClick = () => {
    setShowLanding(false);
    setShowLogin(true);
  };

  const handleContactSubmit = async (formData: { name: string; email: string; message: string }) => {
    console.log('Contact form submitted:', formData);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'library': return <Library />;
      case 'notes': return <Notes />;
      case 'royalty': return <RoyaltyCalc />;
      case 'ratings': return <RatingCalculator />;
      case 'consultancy': return <Consultancy />;
      case 'profile': return <Profile />;
      case 'returns': return <MonthlyReturns />;
      case 'admin': return <AdminDashboard />;
      case 'minerals': return <MineralsManagement />;
      case 'star' : return <StarRatingCalculator />;
      case 'production': return <DailyProduction />;
      case 'compliance': return <StatutoryCompliance />;
      default: return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (showLanding) {
      return (
        <div className="min-h-screen bg-gray-50 p-4">
          <LandingPage 
            onGetStarted={handleGetStarted}
            onLoginClick={handleLoginClick}
            onContactSubmit={handleContactSubmit}
          />
        </div>
      );
    }
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Layout activeView={currentView} onViewChange={setCurrentView}>
      <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
