/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/layout/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Inbox from './pages/dashboard/Inbox';
import Training from './pages/dashboard/Training';
import Profile from './pages/dashboard/Profile';
import Deploy from './pages/dashboard/Deploy';
import CreativeStudio from './pages/dashboard/CreativeStudio';

import { NotificationProvider } from './context/NotificationContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="min-h-screen bg-bg-dark text-white selection:bg-brand-primary selection:text-bg-dark">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/dashboard/overview" replace />} />
              <Route path="overview" element={<Overview />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="training" element={<Training />} />
              <Route path="profile" element={<Profile />} />
              <Route path="deploy" element={<Deploy />} />
              <Route path="creative" element={<CreativeStudio />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </NotificationProvider>
  );
}
