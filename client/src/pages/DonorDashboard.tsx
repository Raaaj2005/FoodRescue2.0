import { useAuth } from '@/contexts/AuthContext';
import { Package, TrendingUp, Scale, Award, Plus } from 'lucide-react';
import { StatsCard } from '@/components/shared/StatsCard';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DonationUploadModal } from '@/components/donor/DonationUploadModal';
import { DonationList } from '@/components/donor/DonationList';
import { motion } from 'framer-motion';

export default function DonorDashboard() {
  const { user } = useAuth();
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome">
              Welcome back, {user?.donorProfile?.businessName || user?.fullName}!
            </h1>
            <p className="text-muted-foreground">
              Track your donations and see your impact
            </p>
          </div>
          <Button onClick={() => setShowUploadModal(true)} size="lg" data-testid="button-upload-donation">
            <Plus className="w-5 h-5 mr-2" />
            Upload Donation
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={Package}
          label="Total Donations"
          value={0}
          change={0}
          delay={0}
        />
        <StatsCard
          icon={TrendingUp}
          label="Meals Provided"
          value={0}
          delay={0.1}
        />
        <StatsCard
          icon={Scale}
          label="Food Saved (kg)"
          value={0}
          suffix=" kg"
          delay={0.2}
        />
        <StatsCard
          icon={Award}
          label="Impact Score"
          value={0}
          delay={0.3}
        />
      </div>

      <DonationList />

      <DonationUploadModal
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
      />
    </div>
  );
}
