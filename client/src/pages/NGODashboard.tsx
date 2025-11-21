import { Heart, Package, Users, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/shared/StatsCard';
import { DonationBrowser } from '@/components/ngo/DonationBrowser';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function NGODashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome">
          Welcome, {user?.ngoProfile?.organizationName || user?.fullName}!
        </h1>
        <p className="text-muted-foreground">
          Browse and accept food donations in your area
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={Package}
          label="Available Donations"
          value={0}
          delay={0}
        />
        <StatsCard
          icon={Heart}
          label="Accepted Donations"
          value={0}
          delay={0.1}
        />
        <StatsCard
          icon={TrendingUp}
          label="Total Meals Received"
          value={0}
          delay={0.2}
        />
        <StatsCard
          icon={Users}
          label="Active Volunteers"
          value={0}
          delay={0.3}
        />
      </div>

      <DonationBrowser />
    </div>
  );
}
