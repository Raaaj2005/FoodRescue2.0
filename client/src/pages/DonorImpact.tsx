import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Heart, Package } from 'lucide-react';
import { StatsCard } from '@/components/shared/StatsCard';
import type { Donation } from '@shared/schema';
import { useAuth } from '@/contexts/AuthContext';
import { useMemo } from 'react';

export default function DonorImpact() {
  const { user } = useAuth();
  const { data: donations = [] } = useQuery<Donation[]>({
    queryKey: ['/api/donations'],
  });

  const stats = useMemo(() => {
    const totalDonations = donations.length;
    const acceptedDonations = donations.filter(d => d.status === 'accepted' || d.status === 'matched' || d.status === 'delivered').length;
    const totalQuantity = donations.reduce((sum, d) => sum + (d.foodDetails?.quantity || 0), 0);
    const impactScore = acceptedDonations * 10 + totalDonations * 5;

    return {
      totalDonations,
      acceptedDonations,
      totalQuantity,
      impactScore,
    };
  }, [donations]);

  const donationsByCategory = useMemo(() => {
    const categories: Record<string, number> = {};
    donations.forEach(d => {
      const cat = d.foodDetails?.category || 'Other';
      categories[cat] = (categories[cat] || 0) + (d.foodDetails?.quantity || 0);
    });
    return categories;
  }, [donations]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Your Impact Report</h1>
        <p className="text-muted-foreground">See the difference your donations are making</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={Package}
          label="Total Donations"
          value={stats.totalDonations}
          delay={0}
        />
        <StatsCard
          icon={Heart}
          label="Accepted Donations"
          value={stats.acceptedDonations}
          delay={0.1}
        />
        <StatsCard
          icon={TrendingUp}
          label="Food Saved (kg)"
          value={stats.totalQuantity}
          suffix=" kg"
          delay={0.2}
        />
        <StatsCard
          icon={Award}
          label="Impact Score"
          value={stats.impactScore}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Food by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(donationsByCategory).map(([category, quantity]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="capitalize">{category}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{
                            width: `${(quantity / stats.totalQuantity) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{quantity} kg</span>
                    </div>
                  </div>
                ))}
                {Object.keys(donationsByCategory).length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No donations yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Impact Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Donations Created</span>
                  <span className="font-semibold">{stats.totalDonations}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Donations Accepted</span>
                  <span className="font-semibold text-green-600">{stats.acceptedDonations}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Acceptance Rate</span>
                  <span className="font-semibold">
                    {stats.totalDonations === 0 ? '0' : Math.round((stats.acceptedDonations / stats.totalDonations) * 100)}%
                  </span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Impact Score</span>
                    <span className="text-2xl font-bold text-primary">{stats.impactScore}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4 mt-4">
                <p className="text-sm">
                  Your donations have helped rescue <span className="font-bold">{stats.totalQuantity} kg</span> of food
                  that would have been wasted. Great work making a difference!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
