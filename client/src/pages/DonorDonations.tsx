import { DonationList } from '@/components/donor/DonationList';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DonorDonations() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">My Donations</h1>
        <p className="text-muted-foreground">Track and manage all your food donations</p>
      </motion.div>
      <DonationList />
    </div>
  );
}
