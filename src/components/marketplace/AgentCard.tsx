import { Bot, Star, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import PricingBadge from './PricingBadge';

interface Agent {
  id: string;
  name: string;
  description: string;
  agent_type: string;
  capabilities: any;
  reputation_score: number;
  performance_metrics: {
    totalExecutions: number;
    successRate: number;
    averageApy: number;
  };
  zk_proof_commitment: string;
  trust_model: string;
  pricing_model?: 'free' | 'subscription' | 'performance' | 'one_time';
  cost_per_execution?: number;
  subscription_fee?: number;
  performance_fee_percentage?: number;
}

// Default pricing based on agent type
const getDefaultPricing = (agentType: string) => {
  switch (agentType) {
    case 'strategy':
      return { 
        pricing_model: 'performance' as const, 
        performance_fee_percentage: 15,
        subscription_fee: undefined,
        cost_per_execution: undefined,
      };
    case 'risk_management':
      return { 
        pricing_model: 'subscription' as const, 
        subscription_fee: 29,
        performance_fee_percentage: undefined,
        cost_per_execution: undefined,
      };
    case 'arbitrage':
      return { 
        pricing_model: 'performance' as const, 
        performance_fee_percentage: 20,
        subscription_fee: undefined,
        cost_per_execution: undefined,
      };
    case 'liquidity':
      return { 
        pricing_model: 'free' as const,
        subscription_fee: undefined,
        performance_fee_percentage: undefined,
        cost_per_execution: undefined,
      };
    case 'privacy':
      return { 
        pricing_model: 'free' as const,
        subscription_fee: undefined,
        performance_fee_percentage: undefined,
        cost_per_execution: undefined,
      };
    default:
      return { 
        pricing_model: 'free' as const,
        subscription_fee: undefined,
        performance_fee_percentage: undefined,
        cost_per_execution: undefined,
      };
  }
}

interface AgentCardProps {
  agent: Agent;
  onViewDetails: (agent: Agent) => void;
  onSelectAgent: (agent: Agent) => void;
}

export default function AgentCard({ agent, onViewDetails, onSelectAgent }: AgentCardProps) {
  // Determine if this agent generates yield
  const isYieldAgent = !['privacy', 'risk_management'].includes(agent.agent_type);
  
  // Get pricing info with defaults
  const defaultPricing = getDefaultPricing(agent.agent_type);
  const pricingModel = agent.pricing_model || defaultPricing.pricing_model;
  const costPerExecution = agent.cost_per_execution || defaultPricing.cost_per_execution;
  const subscriptionFee = agent.subscription_fee || defaultPricing.subscription_fee;
  const performanceFeePercentage = agent.performance_fee_percentage || defaultPricing.performance_fee_percentage;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-neutral-50 rounded-2xl p-6 border border-neutral-400/20 hover:border-accent-500/40 transition-all duration-normal hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center">
          <Bot className="w-6 h-6 text-accent-500" />
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-semantic-warning fill-current" />
          <span className="text-sm font-semibold">{agent.reputation_score}</span>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
      <p className="text-sm text-neutral-300 mb-4 line-clamp-2">{agent.description}</p>

      <div className="flex items-center space-x-2 mb-4">
        <span className="px-2 py-1 bg-primary-500/10 text-primary-500 rounded text-xs font-medium capitalize">
          {agent.agent_type.replace('_', ' ')}
        </span>
        <span className="px-2 py-1 bg-neutral-100 text-neutral-300 rounded text-xs font-medium capitalize">
          {agent.trust_model}
        </span>
      </div>

      {/* Pricing Information */}
      <div className="mb-4">
        <PricingBadge
          pricingModel={pricingModel}
          costPerExecution={costPerExecution}
          subscriptionFee={subscriptionFee}
          performanceFeePercentage={performanceFeePercentage}
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-3 pt-4 mb-4 border-t border-neutral-400/20">
        <div>
          <p className="text-xs text-neutral-300 mb-1">Success Rate</p>
          <p className="text-sm font-semibold text-semantic-success">
            {agent.performance_metrics.successRate.toFixed(1)}%
          </p>
        </div>
        <div className="group relative">
          <p className="text-xs text-neutral-300 mb-1">Avg APY</p>
          {isYieldAgent ? (
            <p className="text-sm font-semibold text-primary-500">
              {agent.performance_metrics.averageApy.toFixed(1)}%
            </p>
          ) : (
            <>
              <p className="text-sm font-semibold text-neutral-300">N/A</p>
              <div className="invisible group-hover:visible absolute bottom-full left-0 mb-2 px-2 py-1 bg-neutral-100 text-xs text-neutral-300 rounded whitespace-nowrap shadow-lg z-10">
                This agent focuses on {agent.agent_type === 'privacy' ? 'privacy protection' : 'risk management'}, not yield generation
              </div>
            </>
          )}
        </div>
        <div>
          <p className="text-xs text-neutral-300 mb-1">Executions</p>
          <p className="text-sm font-semibold">{agent.performance_metrics.totalExecutions}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => onViewDetails(agent)}
          className="flex-1 px-4 py-2.5 bg-neutral-100 text-neutral-300 rounded-lg font-medium hover:bg-neutral-200 hover:text-text-primary transition-all duration-fast flex items-center justify-center space-x-2"
          aria-label={`View details for ${agent.name}`}
        >
          <Info className="w-4 h-4" />
          <span>View Details</span>
        </button>
        <button
          onClick={() => onSelectAgent(agent)}
          className="flex-1 px-4 py-2.5 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-fast shadow-glow"
          aria-label={`Select ${agent.name} agent`}
        >
          Select Agent
        </button>
      </div>
    </motion.div>
  );
}
