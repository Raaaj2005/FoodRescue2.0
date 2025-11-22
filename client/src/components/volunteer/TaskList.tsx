import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Package, MapPin, Clock, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { queryClient, apiRequest } from '@/lib/queryClient';
import type { VolunteerTask } from '@shared/schema';

export function TaskList() {
  const { toast } = useToast();
  
  const { data: tasks, isLoading } = useQuery<VolunteerTask[]>({
    queryKey: ['/api/tasks'],
  });

  const availableTasks = tasks?.filter(t => t.status === 'assigned') || [];

  const handleAcceptTask = async (taskId: string) => {
    try {
      await apiRequest('POST', `/api/tasks/${taskId}/accept`, {});
      
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      
      toast({
        title: 'Task Accepted!',
        description: 'You have accepted the delivery task. Please proceed with pickup.',
      });
    } catch (error) {
      toast({
        title: 'Failed to accept task',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const handleRejectTask = async (taskId: string) => {
    try {
      await apiRequest('POST', `/api/tasks/${taskId}/reject`, {});
      
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      
      toast({
        title: 'Task Rejected',
        description: 'The task has been reassigned.',
      });
    } catch (error) {
      toast({
        title: 'Failed to reject task',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading available tasks..." />;
  }

  if (!availableTasks || availableTasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <EmptyState
            icon={Truck}
            title="No tasks available"
            description="Check back soon for delivery tasks. New tasks appear when NGOs accept donations."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Delivery Tasks ({availableTasks.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {availableTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover-elevate transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        Delivery Task #{task.id?.slice(0, 8)}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Assigned
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">PICKUP FROM</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">
                          {typeof task.pickupLocation === 'object' && task.pickupLocation?.address ? task.pickupLocation.address : 'Location'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">DELIVER TO</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">
                          {typeof task.deliveryLocation === 'object' && task.deliveryLocation?.address ? task.deliveryLocation.address : 'NGO Location'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Distance</p>
                        <p className="font-semibold">{task.distance || 'N/A'} km</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Estimated Time</p>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <p className="font-semibold">{task.estimatedTime || 0} min</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAcceptTask(task.id)}
                      className="flex-1"
                      data-testid="button-accept-task"
                    >
                      Accept Task
                    </Button>
                    <Button
                      onClick={() => handleRejectTask(task.id)}
                      variant="outline"
                      className="flex-1"
                      data-testid="button-reject-task"
                    >
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
