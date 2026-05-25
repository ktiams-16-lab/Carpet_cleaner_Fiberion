import { ProtectedRoute } from '../../layouts/ProtectedRoute';
import { DashboardLayout } from '../../dashboard/DashboardLayout';

export default function DashboardRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
