import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Package, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import type { Donation } from '@shared/schema';
import { useAuth } from '@/contexts/AuthContext';

export default function NGODonations() {
  const { user } = useAuth();
  const { data: allDonations, isLoading } = useQuery<Donation[]>({
    queryKey: ['/api/donations'],
  });

  const donations = allDonations?.filter(
    d => d.matchedNGOId === user?.id && (d.status === 'accepted' || d.status === 'matched' || d.status === 'delivered')
  ) || [];

  if (isLoading) {
    return <LoadingSpinner message="Loading your donations..." />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">My Accepted Donations</h1>
        <p className="text-muted-foreground">Track all the donations you've accepted</p>
      </motion.div>

      {!donations || donations.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <EmptyState
              icon={Package}
              title="No accepted donations yet"
              description="Start accepting donations to help more people"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {donations.map((donation, index) => (
            <motion.div
              key={donation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover-elevate transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {donation.foodDetails?.name || 'Food Item'}
                      </h3>
                      <StatusBadge status={donation.status} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span>
                        <span className="font-medium">{donation.foodDetails?.quantity}</span> {donation.foodDetails?.unit}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium capitalize">{donation.foodDetails?.category}</span>
                    </div>
                    {donation.location?.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {donation.location.address.city}, {donation.location.address.state}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      Accepted {formatDistanceToNow(new Date(donation.updatedAt || donation.createdAt || new Date()), { addSuffix: true })}
                    </p>
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
