import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Truck, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { VolunteerTask } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { queryClient, apiRequest } from '@/lib/queryClient';

export function TaskList() {
  const { toast } = useToast();
  
  const { data: tasks, isLoading } = useQuery<VolunteerTask[]>({
    queryKey: ['/api/tasks'],
  });

  const handleAccept = async (taskId: string) => {
    try {
      await apiRequest('POST', `/api/tasks/${taskId}/accept`, {});
      
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      
      toast({
        title: 'Task accepted!',
        description: 'You can now start the delivery.',
      });
    } catch (error) {
      toast({
        title: 'Failed to accept task',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading tasks..." />;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <EmptyState
            icon={Truck}
            title="No available tasks"
            description="Check back soon for delivery opportunities"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              data-testid={`task-card-${task.id}`}
            >
              <Card className="hover-elevate transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3" data-testid="text-task-id">
                        Task #{task.taskId}
                      </h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-destructive mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Pickup</p>
                            <p className="text-sm text-muted-foreground">
                              {task.pickupLocation.address}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Delivery</p>
                            <p className="text-sm text-muted-foreground">
                              {task.deliveryLocation.address}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Distance: {task.distance} km</span>
                        <span>Est. Time: {task.estimatedTime} min</span>
                      </div>
                    </div>

                    {task.status === 'assigned' && (
                      <Button
                        onClick={() => handleAccept(task.id)}
                        className="ml-4"
                        data-testid="button-accept-task"
                      >
                        Accept Task
                      </Button>
                    )}
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
