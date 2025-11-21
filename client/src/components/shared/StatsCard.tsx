import { Card, CardContent } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  change?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export function StatsCard({ icon: Icon, label, value, change, prefix = '', suffix = '', delay = 0 }: StatsCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  const numValue = typeof value === 'number' ? value : parseFloat(value) || 0;

  useEffect(() => {
    if (isInView && typeof value === 'number') {
      let start = 0;
      const duration = 1000;
      const increment = numValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numValue) {
          setDisplayValue(numValue);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, numValue, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="hover-elevate transition-all duration-300" data-testid="card-stats">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-2" data-testid="text-stats-label">
                {label}
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold" data-testid="text-stats-value">
                  {prefix}{typeof value === 'number' ? displayValue.toLocaleString() : value}{suffix}
                </h3>
                {change !== undefined && (
                  <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {change >= 0 ? '+' : ''}{change}%
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
