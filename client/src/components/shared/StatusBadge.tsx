import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import type { donationStatuses, urgencyLevels } from '@shared/schema';

type Status = typeof donationStatuses[number];
type Urgency = typeof urgencyLevels[number];

interface StatusBadgeProps {
  status: Status;
  urgency?: Urgency;
  className?: string;
}

const statusConfig = {
  pending: { label: 'Pending', variant: 'secondary' as const, color: 'bg-gray-500' },
  matched: { label: 'Matched', variant: 'default' as const, color: 'bg-blue-500' },
  accepted: { label: 'Accepted', variant: 'default' as const, color: 'bg-orange-500' },
  in_transit: { label: 'In Transit', variant: 'default' as const, color: 'bg-purple-500' },
  delivered: { label: 'Delivered', variant: 'default' as const, color: 'bg-green-500' },
  cancelled: { label: 'Cancelled', variant: 'destructive' as const, color: 'bg-red-500' },
};

const urgencyConfig = {
  high: { color: 'bg-red-500', pulse: true },
  medium: { color: 'bg-orange-500', pulse: false },
  low: { color: 'bg-green-500', pulse: false },
};

export function StatusBadge({ status, urgency, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <Badge variant={config.variant} data-testid={`badge-status-${status}`}>
        {config.label}
      </Badge>
      {urgency && (
        <div className="flex items-center gap-1.5">
          <motion.div
            className={`w-2 h-2 rounded-full ${urgencyConfig[urgency].color}`}
            animate={urgencyConfig[urgency].pulse ? {
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            data-testid={`indicator-urgency-${urgency}`}
          />
          <span className="text-xs capitalize text-muted-foreground">{urgency}</span>
        </div>
      )}
    </div>
  );
}
