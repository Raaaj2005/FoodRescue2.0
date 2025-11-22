import { TaskList } from '@/components/volunteer/TaskList';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { queryClient } from '@/lib/queryClient';
import io from 'socket.io-client';

export default function VolunteerTasks() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const socket = io();

    socket.on('connect', () => {
      socket.emit('join_room', user.id);
    });

    socket.on('task_assigned', () => {
      // Refetch tasks when a new task is assigned
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

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
