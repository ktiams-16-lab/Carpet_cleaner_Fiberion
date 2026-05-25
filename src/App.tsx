import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './store/auth';
import { ProtectedRoute } from './layouts/ProtectedRoute';
import { DashboardLayout } from './dashboard/DashboardLayout';
import {
  AnalyticsPage,
  CustomersPage,
  InvoicesPage,
  JobsPage,
  OverviewPage,
  PaymentPlansPage,
  QuotesPage,
  SchedulePage,
  SettingsPage,
  TeamPage
} from './pages/dashboard/DashboardPages';

const PublicWebsite = lazy(() => import('./pages/public/PublicWebsite'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));

function LoadingState() {
  return (
    <div className="grid min-h-screen place-items-center bg-black text-white">
      <div className="fiberion-panel p-6 text-sm text-sky">Loading Fiberion Surface Care...</div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingState />}>
        <Routes>
          <Route path="/" element={<PublicWebsite />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path="quotes" element={<QuotesPage />} />
              <Route path="schedule" element={<SchedulePage />} />
              <Route path="booked" element={<JobsPage mode="booked" />} />
              <Route path="in-progress" element={<JobsPage mode="in_progress" />} />
              <Route path="completed" element={<JobsPage mode="completed" />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="invoices" element={<InvoicesPage />} />
              <Route path="payment-plans" element={<PaymentPlansPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
