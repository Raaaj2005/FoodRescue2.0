import { UserVerificationQueue } from '@/components/admin/UserVerificationQueue';
import { motion } from 'framer-motion';

export default function AdminUsers() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Verify and manage user registrations</p>
      </motion.div>
      <UserVerificationQueue />
    </div>
  );
}
