import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import type { User } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { formatDistanceToNow } from 'date-fns';

export function UserVerificationQueue() {
  const { toast } = useToast();
  
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['/api/admin/pending-users'],
  });

  const handleApprove = async (userId: string) => {
    try {
      await apiRequest('POST', `/api/admin/users/${userId}/verify`, {});
      
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pending-users'] });
      
      toast({
        title: 'User approved!',
        description: 'The user has been verified and can now access the platform.',
      });
    } catch (error) {
      toast({
        title: 'Failed to approve user',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await apiRequest('DELETE', `/api/admin/users/${userId}`, {});
      
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pending-users'] });
      
      toast({
        title: 'User rejected',
        description: 'The user has been removed from the verification queue.',
      });
    } catch (error) {
      toast({
        title: 'Failed to reject user',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading pending users..." />;
  }

  if (!users || users.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <EmptyState
            icon={Users}
            title="No pending verifications"
            description="All user registrations have been processed"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Verification Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              data-testid={`user-card-${user.id}`}
            >
              <Card className="hover-elevate transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg" data-testid="text-user-name">
                          {user.fullName}
                        </h3>
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Email:</span> {user.email}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {user.phone}
                        </div>
                        <div>
                          <span className="font-medium">Registered:</span>{' '}
                          {formatDistanceToNow(new Date(user.createdAt || Date.now()), {
                            addSuffix: true,
                          })}
                        </div>
                        {user.role === 'donor' && user.donorProfile && (
                          <div>
                            <span className="font-medium">Business:</span>{' '}
                            {user.donorProfile.businessName}
                          </div>
                        )}
                        {user.role === 'ngo' && user.ngoProfile && (
                          <div>
                            <span className="font-medium">Organization:</span>{' '}
                            {user.ngoProfile.organizationName}
                          </div>
                        )}
                        {user.role === 'volunteer' && user.volunteerProfile && (
                          <div>
                            <span className="font-medium">Vehicle:</span>{' '}
                            {user.volunteerProfile.vehicleType}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        onClick={() => handleApprove(user.id)}
                        size="sm"
                        data-testid="button-approve"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(user.id)}
                        variant="destructive"
                        size="sm"
                        data-testid="button-reject"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
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
