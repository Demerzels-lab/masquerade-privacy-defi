import { useEffect, useState } from 'react';
import { Bot, Star, TrendingUp, Shield, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

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
}

export default function Marketplace() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    loadAgents();
  }, []);

  useEffect(() => {
    filterAgents();
  }, [selectedType, searchQuery, agents]);

  const loadAgents = async () => {
    const { data } = await supabase
      .from('ai_agents')
      .select('*')
      .eq('active', true)
      .order('reputation_score', { ascending: false });
    
    if (data) {
      setAgents(data);
      setFilteredAgents(data);
    }
  };

  const filterAgents = () => {
    let filtered = agents;

    if (selectedType !== 'all') {
      filtered = filtered.filter(agent => agent.agent_type === selectedType);
    }

    if (searchQuery) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredAgents(filtered);
  };

  const agentTypes = [
    { value: 'all', label: 'All Agents' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'risk_management', label: 'Risk Management' },
    { value: 'arbitrage', label: 'Arbitrage' },
    { value: 'liquidity', label: 'Liquidity' },
    { value: 'privacy', label: 'Privacy' },
  ];

  return (
    <div className="min-h-screen bg-background-page text-text-primary pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">AI Agent Marketplace</h1>
            <p className="text-neutral-300">Browse dan pilih ERC-8004 verified AI agents untuk automated DeFi strategies</p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-300" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-400/20 rounded-lg text-text-primary placeholder-neutral-300 focus:outline-none focus:border-primary-500"
              />
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Filter className="w-5 h-5 text-neutral-300 flex-shrink-0" />
              {agentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-fast ${
                    selectedType === type.value
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-50 text-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Agent Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedAgent(agent)}
                className="bg-neutral-50 rounded-2xl p-6 border border-neutral-400/20 hover:border-accent-500/40 transition-all duration-normal hover:shadow-card-hover cursor-pointer"
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

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-400/20">
                  <div>
                    <p className="text-xs text-neutral-300 mb-1">Success Rate</p>
                    <p className="text-sm font-semibold text-semantic-success">
                      {agent.performance_metrics.successRate.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-300 mb-1">Avg APY</p>
                    <p className="text-sm font-semibold text-primary-500">
                      {agent.performance_metrics.averageApy.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-300 mb-1">Executions</p>
                    <p className="text-sm font-semibold">{agent.performance_metrics.totalExecutions}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-300">No agents found matching your criteria</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div
          className="fixed inset-0 bg-background-page/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedAgent(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-100 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-neutral-400/20 shadow-modal"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedAgent.name}</h2>
                <p className="text-neutral-300">{selectedAgent.description}</p>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-neutral-300 hover:text-text-primary"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Shield className="w-5 h-5 text-primary-500 mr-2" />
                  ZK Verification
                </h3>
                <div className="p-4 bg-neutral-50 rounded-lg border border-primary-500/20">
                  <p className="text-sm font-mono text-primary-500 break-all">{selectedAgent.zk_proof_commitment}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 text-accent-500 mr-2" />
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-300 mb-1">Success Rate</p>
                    <p className="text-2xl font-bold text-semantic-success">
                      {selectedAgent.performance_metrics.successRate.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-300 mb-1">Avg APY</p>
                    <p className="text-2xl font-bold text-primary-500">
                      {selectedAgent.performance_metrics.averageApy.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-300 mb-1">Executions</p>
                    <p className="text-2xl font-bold">{selectedAgent.performance_metrics.totalExecutions}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Capabilities</h3>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <pre className="text-sm text-neutral-300 overflow-x-auto">
                    {JSON.stringify(selectedAgent.capabilities, null, 2)}
                  </pre>
                </div>
              </div>

              <button className="w-full px-6 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-fast shadow-glow">
                Activate Agent
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
