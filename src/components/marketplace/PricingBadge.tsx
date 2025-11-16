import { DollarSign } from 'lucide-react';

interface PricingBadgeProps {
  pricingModel: 'free' | 'subscription' | 'performance' | 'one_time';
  costPerExecution?: number;
  subscriptionFee?: number;
  performanceFeePercentage?: number;
}

export default function PricingBadge({
  pricingModel,
  costPerExecution,
  subscriptionFee,
  performanceFeePercentage,
}: PricingBadgeProps) {
  const getPricingDisplay = () => {
    switch (pricingModel) {
      case 'free':
        return {
          label: 'FREE',
          detail: 'No cost',
          bgColor: 'bg-semantic-success/10',
          textColor: 'text-semantic-success',
        };
      case 'subscription':
        return {
          label: 'SUBSCRIPTION',
          detail: `$${subscriptionFee}/month`,
          bgColor: 'bg-primary-500/10',
          textColor: 'text-primary-500',
        };
      case 'performance':
        return {
          label: 'PERFORMANCE FEE',
          detail: `${performanceFeePercentage}% of profit`,
          bgColor: 'bg-accent-500/10',
          textColor: 'text-accent-500',
        };
      case 'one_time':
        return {
          label: 'PAY PER USE',
          detail: `$${costPerExecution}/execution`,
          bgColor: 'bg-semantic-warning/10',
          textColor: 'text-semantic-warning',
        };
      default:
        return {
          label: 'FREE',
          detail: 'No cost',
          bgColor: 'bg-neutral-100',
          textColor: 'text-neutral-300',
        };
    }
  };

  const pricing = getPricingDisplay();

  return (
    <div className={`${pricing.bgColor} ${pricing.textColor} rounded-lg p-3 flex items-start space-x-2`}>
      <DollarSign className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide">{pricing.label}</p>
        <p className="text-sm font-medium mt-0.5">{pricing.detail}</p>
      </div>
    </div>
  );
}
