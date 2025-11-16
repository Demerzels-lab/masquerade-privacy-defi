import { CheckCircle2, Zap, TrendingUp, Shield, Activity } from 'lucide-react';

interface CapabilitiesDisplayProps {
  capabilities: any;
  agentType: string;
}

export default function CapabilitiesDisplay({ capabilities, agentType }: CapabilitiesDisplayProps) {
  // Parse capabilities into user-friendly format
  const parseCapabilities = () => {
    if (!capabilities) return [];

    const items: { icon: React.ReactNode; label: string; value: string }[] = [];

    // Strategy agents
    if (agentType === 'strategy') {
      if (capabilities.strategies) {
        items.push({
          icon: <TrendingUp className="w-4 h-4" />,
          label: 'Trading Strategies',
          value: capabilities.strategies.join(', '),
        });
      }
      if (capabilities.riskTolerance) {
        items.push({
          icon: <Shield className="w-4 h-4" />,
          label: 'Risk Tolerance',
          value: capabilities.riskTolerance,
        });
      }
      if (capabilities.targetApy) {
        items.push({
          icon: <Zap className="w-4 h-4" />,
          label: 'Target APY Range',
          value: `${capabilities.targetApy.min}% - ${capabilities.targetApy.max}%`,
        });
      }
    }

    // Privacy agents
    if (agentType === 'privacy') {
      if (capabilities.privacyFeatures) {
        items.push({
          icon: <Shield className="w-4 h-4" />,
          label: 'Privacy Features',
          value: capabilities.privacyFeatures.join(', '),
        });
      }
      if (capabilities.zkProofTypes) {
        items.push({
          icon: <CheckCircle2 className="w-4 h-4" />,
          label: 'ZK Proof Types',
          value: capabilities.zkProofTypes.join(', '),
        });
      }
    }

    // Risk Management agents
    if (agentType === 'risk_management') {
      if (capabilities.monitoringFeatures) {
        items.push({
          icon: <Activity className="w-4 h-4" />,
          label: 'Monitoring Features',
          value: capabilities.monitoringFeatures.join(', '),
        });
      }
      if (capabilities.alertThresholds) {
        items.push({
          icon: <Shield className="w-4 h-4" />,
          label: 'Alert Thresholds',
          value: `Loss: ${capabilities.alertThresholds.maxLoss}%, Volatility: ${capabilities.alertThresholds.volatilityLimit}%`,
        });
      }
    }

    // Arbitrage agents
    if (agentType === 'arbitrage') {
      if (capabilities.exchanges) {
        items.push({
          icon: <TrendingUp className="w-4 h-4" />,
          label: 'Supported Exchanges',
          value: capabilities.exchanges.join(', '),
        });
      }
      if (capabilities.minProfitThreshold) {
        items.push({
          icon: <Zap className="w-4 h-4" />,
          label: 'Min Profit Threshold',
          value: `${capabilities.minProfitThreshold}%`,
        });
      }
    }

    // Liquidity agents
    if (agentType === 'liquidity') {
      if (capabilities.protocols) {
        items.push({
          icon: <Activity className="w-4 h-4" />,
          label: 'Supported Protocols',
          value: capabilities.protocols.join(', '),
        });
      }
      if (capabilities.rebalancingFrequency) {
        items.push({
          icon: <Zap className="w-4 h-4" />,
          label: 'Rebalancing Frequency',
          value: capabilities.rebalancingFrequency,
        });
      }
    }

    return items;
  };

  const capabilityItems = parseCapabilities();

  if (capabilityItems.length === 0) {
    return (
      <div className="p-4 bg-neutral-50 rounded-lg text-center text-neutral-300">
        No capability information available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {capabilityItems.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-neutral-50 rounded-lg flex items-start space-x-3 hover:bg-neutral-100 transition-colors duration-fast"
        >
          <div className="w-8 h-8 bg-primary-500/10 rounded-lg flex items-center justify-center text-primary-500 flex-shrink-0">
            {item.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-text-primary mb-1">{item.label}</p>
            <p className="text-sm text-neutral-300 capitalize">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
