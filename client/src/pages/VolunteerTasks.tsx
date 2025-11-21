import { TaskList } from '@/components/volunteer/TaskList';
import { motion } from 'framer-motion';

export default function VolunteerTasks() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Available Tasks</h1>
        <p className="text-muted-foreground">Accept delivery tasks and help rescue food</p>
      </motion.div>
      <TaskList />
    </div>
  );
}
