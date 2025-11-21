import { DonationBrowser } from '@/components/ngo/DonationBrowser';
import { motion } from 'framer-motion';

export default function NGOBrowse() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Browse Donations</h1>
        <p className="text-muted-foreground">Find available food donations near you</p>
      </motion.div>
      <DonationBrowser />
    </div>
  );
}
