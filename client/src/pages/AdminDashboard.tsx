import { Users, Package, Truck, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/shared/StatsCard';
import { UserVerificationQueue } from '@/components/admin/UserVerificationQueue';
import { DonorNGOMap } from '@/components/admin/DonorNGOMap';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { User, Donation, VolunteerTask } from '@shared/schema';

export default function AdminDashboard() {
  const { data: allUsers = [] } = useQuery<User[]>({
    queryKey: ['/api/admin/pending-users'],
  });

  const { data: donations = [] } = useQuery<Donation[]>({
    queryKey: ['/api/donations'],
  });

  const { data: tasks = [] } = useQuery<VolunteerTask[]>({
    queryKey: ['/api/tasks'],
  });

  const totalUsers = allUsers.length;
  const totalDonations = donations.length;
  const activeTasks = tasks.filter(t => t.status === 'accepted' || t.status === 'picked_up' || t.status === 'in_transit').length;
  const successRate = totalDonations > 0 ? Math.round((donations.filter(d => d.status === 'delivered').length / totalDonations) * 100) : 0;

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
          value={totalUsers}
          delay={0}
        />
        <StatsCard
          icon={Package}
          label="Total Donations"
          value={totalDonations}
          delay={0.1}
        />
        <StatsCard
          icon={Truck}
          label="Active Deliveries"
          value={activeTasks}
          delay={0.2}
        />
        <StatsCard
          icon={TrendingUp}
          label="Success Rate"
          value={successRate}
          suffix="%"
          delay={0.3}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <DonorNGOMap />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {donations.slice(0, 5).map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-semibold text-sm">{d.foodDetails.category}</p>
                      <p className="text-xs text-muted-foreground">{d.donationId}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Active Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.filter(t => t.status === 'accepted' || t.status === 'picked_up').slice(0, 5).map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-semibold text-sm">{t.taskId}</p>
                      <p className="text-xs text-muted-foreground">{t.estimatedTime} min delivery</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <UserVerificationQueue />
    </div>
  );
}
