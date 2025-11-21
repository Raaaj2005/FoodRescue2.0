import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import DonorDashboard from "@/pages/DonorDashboard";
import DonorDonations from "@/pages/DonorDonations";
import NGODashboard from "@/pages/NGODashboard";
import NGOBrowse from "@/pages/NGOBrowse";
import VolunteerDashboard from "@/pages/VolunteerDashboard";
import VolunteerTasks from "@/pages/VolunteerTasks";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUsers from "@/pages/AdminUsers";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      <Route path="/donor">
        <ProtectedRoute requiredRole={['donor']}>
          <DashboardLayout>
            <DonorDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/donor/donations">
        <ProtectedRoute requiredRole={['donor']}>
          <DashboardLayout>
            <DonorDonations />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/ngo">
        <ProtectedRoute requiredRole={['ngo']}>
          <DashboardLayout>
            <NGODashboard />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/ngo/browse">
        <ProtectedRoute requiredRole={['ngo']}>
          <DashboardLayout>
            <NGOBrowse />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/volunteer">
        <ProtectedRoute requiredRole={['volunteer']}>
          <DashboardLayout>
            <VolunteerDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/volunteer/tasks">
        <ProtectedRoute requiredRole={['volunteer']}>
          <DashboardLayout>
            <VolunteerTasks />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/admin">
        <ProtectedRoute requiredRole={['admin']}>
          <DashboardLayout>
            <AdminDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/admin/users">
        <ProtectedRoute requiredRole={['admin']}>
          <DashboardLayout>
            <AdminUsers />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/settings">
        <ProtectedRoute>
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/help">
        <ProtectedRoute>
          <DashboardLayout>
            <Help />
          </DashboardLayout>
        </ProtectedRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <NotificationProvider>
            <Toaster />
            <Router />
          </NotificationProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
