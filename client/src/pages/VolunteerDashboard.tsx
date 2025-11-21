import { Truck, CheckCircle, MapPin, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/shared/StatsCard';
import { TaskList } from '@/components/volunteer/TaskList';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function VolunteerDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome">
          Welcome, {user?.fullName}!
        </h1>
        <p className="text-muted-foreground">
          View and accept delivery tasks
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={Truck}
          label="Available Tasks"
          value={0}
          delay={0}
        />
        <StatsCard
          icon={MapPin}
          label="Active Deliveries"
          value={0}
          delay={0.1}
        />
        <StatsCard
          icon={CheckCircle}
          label="Completed Tasks"
          value={user?.volunteerProfile?.completedTasks || 0}
          delay={0.2}
        />
        <StatsCard
          icon={TrendingUp}
          label="Total Distance"
          value={0}
          suffix=" km"
          delay={0.3}
        />
      </div>

      <TaskList />
    </div>
  );
}
