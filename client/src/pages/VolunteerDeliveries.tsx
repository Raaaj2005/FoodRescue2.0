import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { motion } from 'framer-motion';
import { Package, MapPin, CheckCircle, Clock } from 'lucide-react';
import type { Task } from '@shared/schema';

export default function VolunteerDeliveries() {
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ['/api/tasks'],
  });

  const completedTasks = tasks?.filter(t => t.status === 'completed' || t.status === 'delivered') || [];

  if (isLoading) {
    return <LoadingSpinner message="Loading your deliveries..." />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">My Deliveries</h1>
        <p className="text-muted-foreground">Track all your completed deliveries</p>
      </motion.div>

      {!completedTasks || completedTasks.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <EmptyState
              icon={Package}
              title="No completed deliveries"
              description="Complete delivery tasks to see them here"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover-elevate transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        Delivery #{task.id?.slice(0, 8)}
                      </h3>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Completed</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    {task.pickupLocation && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Pickup From</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{task.pickupLocation?.address?.city || 'Location'}</span>
                        </div>
                      </div>
                    )}
                    {task.deliveryLocation && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Delivered To</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{task.deliveryLocation?.address?.city || 'Location'}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>
                        {task.completedAt
                          ? new Date(task.completedAt).toLocaleDateString()
                          : 'Recent'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
