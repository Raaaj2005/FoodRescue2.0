import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Heart, Truck, TrendingUp, Users, Clock, MapPin, Award } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Landing() {
  const [, navigate] = useLocation();

  const stats = [
    { value: '50K+', label: 'Meals Donated', icon: Package },
    { value: '200+', label: 'Active NGOs', icon: Heart },
    { value: '500+', label: 'Volunteers', icon: Truck },
    { value: '95%', label: 'Success Rate', icon: TrendingUp },
  ];

  const features = [
    {
      icon: Clock,
      title: 'Real-Time Matching',
      description: 'Instantly connect with nearby NGOs based on food type and urgency',
    },
    {
      icon: MapPin,
      title: 'Location Tracking',
      description: 'Track donations from pickup to delivery with live updates',
    },
    {
      icon: Users,
      title: 'Volunteer Network',
      description: 'Dedicated volunteers ensure timely food distribution',
    },
    {
      icon: Award,
      title: 'Impact Reports',
      description: 'Visualize your contribution to reducing food waste',
    },
  ];

  const steps = [
    { step: '1', title: 'Sign Up', description: 'Choose your role: Donor, NGO, or Volunteer' },
    { step: '2', title: 'Upload Details', description: 'Donors list food, NGOs set preferences' },
    { step: '3', title: 'Get Matched', description: 'Our system connects donors with NGOs' },
    { step: '4', title: 'Deliver & Track', description: 'Volunteers pickup and deliver food safely' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
              Rescue Food.<br />Feed Hope.
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90" data-testid="text-hero-subtitle">
              Connecting food donors with NGOs and volunteers to eliminate waste and fight hunger
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
                onClick={() => navigate('/register')}
                data-testid="button-donate-food"
              >
                Donate Food
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
                onClick={() => navigate('/register')}
                data-testid="button-receive-donations"
              >
                Receive Donations
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
                data-testid={`stats-${index}`}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why FoodRescue?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make food donation seamless and impactful
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate transition-all duration-300" data-testid={`card-feature-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              From donation to delivery in four simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
                data-testid={`step-${index}`}
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-primary/20 -translate-x-1/2" />
                )}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                  <p className="text-muted-foreground text-center">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-primary text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of donors, NGOs, and volunteers working together to end food waste
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
            onClick={() => navigate('/register')}
            data-testid="button-get-started"
          >
            Get Started Today
          </Button>
        </motion.div>
      </section>

      <footer className="py-12 px-6 bg-card border-t">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 FoodRescue. All rights reserved.</p>
          <p className="mt-2">Making every meal count, reducing waste together.</p>
        </div>
      </footer>
    </div>
  );
}
