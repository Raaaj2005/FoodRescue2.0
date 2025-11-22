import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Building2, Heart, Truck, ArrowLeft } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  if (!user) {
    navigate('/login');
    return null;
  }

  const getRoleIcon = () => {
    switch (user.role) {
      case 'donor':
        return <Building2 className="w-6 h-6" />;
      case 'ngo':
        return <Heart className="w-6 h-6" />;
      case 'volunteer':
        return <Truck className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
        data-testid="button-back"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl">{user.fullName}</CardTitle>
                <CardDescription className="mt-2">Account Profile</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {getRoleIcon()}
                </div>
                <Badge variant="outline" className="capitalize">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Donor Information */}
              {user.role === 'donor' && user.donorProfile && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Business Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Business Name</p>
                      <p className="font-medium">{user.donorProfile.businessName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Business Type</p>
                      <p className="font-medium">{user.donorProfile.businessType}</p>
                    </div>
                  </div>
                  {user.donorProfile.address && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Location
                      </p>
                      <p className="font-medium">
                        {user.donorProfile.address.street}, {user.donorProfile.address.city}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.donorProfile.address.state} {user.donorProfile.address.pincode}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* NGO Information */}
              {user.role === 'ngo' && user.ngoProfile && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Organization Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Organization Name</p>
                      <p className="font-medium">{user.ngoProfile.organizationName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Registration Number</p>
                      <p className="font-medium">{user.ngoProfile.registrationNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Daily Capacity</p>
                      <p className="font-medium">{user.ngoProfile.capacity} meals</p>
                    </div>
                  </div>
                  {user.ngoProfile.address && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Location
                      </p>
                      <p className="font-medium">
                        {user.ngoProfile.address.street}, {user.ngoProfile.address.city}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.ngoProfile.address.state} {user.ngoProfile.address.pincode}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Volunteer Information */}
              {user.role === 'volunteer' && user.volunteerProfile && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    Vehicle Information
                  </h3>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Vehicle Type</p>
                    <p className="font-medium">{user.volunteerProfile.vehicleType}</p>
                  </div>
                </div>
              )}

              {/* Account Status */}
              <div className="border-t pt-6">
                <p className="text-sm text-muted-foreground mb-2">Account Status</p>
                <Badge variant={user.isVerified ? 'default' : 'secondary'}>
                  {user.isVerified ? 'Verified' : 'Pending Verification'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
