import { Users, Package, Truck, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/shared/StatsCard';
import { UserVerificationQueue } from '@/components/admin/UserVerificationQueue';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage users, donations, and platform analytics
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={Users}
          label="Total Users"
          value={0}
          delay={0}
        />
        <StatsCard
          icon={Package}
          label="Total Donations"
          value={0}
          delay={0.1}
        />
        <StatsCard
          icon={Truck}
          label="Active Deliveries"
          value={0}
          delay={0.2}
        />
        <StatsCard
          icon={TrendingUp}
          label="Success Rate"
          value="0"
          suffix="%"
          delay={0.3}
        />
      </div>

      <UserVerificationQueue />
    </div>
  );
}
