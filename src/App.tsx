import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { useEffect, Suspense, lazy } from 'react';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardSkeleton } from './components/ui/Skeleton';
import LoginPage from "./pages/LoginPage";

const LandingPage = lazy(() => import('./pages/LandingPage'));
const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout'));
const Overview = lazy(() => import('./pages/dashboard/Overview'));
const Inbox = lazy(() => import('./pages/dashboard/Inbox'));
const Training = lazy(() => import('./pages/dashboard/Training'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const Deploy = lazy(() => import('./pages/dashboard/Deploy'));
const CreativeStudio = lazy(() => import('./pages/dashboard/CreativeStudio'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <NotificationProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-bg-dark text-white selection:bg-brand-primary selection:text-bg-dark">
            <ScrollToTop />
            <Suspense fallback={<DashboardSkeleton />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/dashboard/overview" replace />} />
                  <Route path="overview" element={<Overview />} />
                  <Route path="inbox" element={<Inbox />} />
                  <Route path="training" element={<Training />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="deploy" element={<Deploy />} />
                  <Route path="creative" element={<CreativeStudio />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </AuthProvider>
      </Router>
    </NotificationProvider>
  );
}
