import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Zap, Bot, Eye, TrendingUp, ArrowRight, CheckCircle, Wallet, Layers, Cpu, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function Landing() {
  const [stats, setStats] = useState({
    agents: 0,
    users: 0,
    apy: 0,
    tvl: 0
  });

  const fetchPlatformStats = async () => {
    try {
      const { count: agentsCount } = await supabase
        .from('ai_agents')
        .select('*', { count: 'exact', head: true })
        .eq('active', true);

      const { count: usersCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      const { data: apyData } = await supabase
        .from('ai_agents')
        .select('avg_yield')
        .eq('active', true);

      const avgApy = apyData && apyData.length > 0 
        ? (apyData.reduce((sum, agent) => sum + agent.avg_yield, 0) / apyData.length).toFixed(1)
        : '26.8';

      setStats({
        agents: agentsCount || 6,
        users: usersCount || 1,
        apy: parseFloat(avgApy),
        tvl: 125 // Static fallback as per requirements
      });
    } catch (error) {
      console.error('Error fetching platform stats:', error);
      setStats({ agents: 6, users: 1, apy: 26.8, tvl: 125 });
    }
  };

  useEffect(() => {
    fetchPlatformStats();
  }, []);

  const visionFeatures = [
    {
      icon: Lock,
      title: 'Privacy-First DeFi',
      description: 'Complete transaction anonymity with zero-knowledge proofs'
    },
    {
      icon: Bot,
      title: 'AI-Powered Agents',
      description: 'ERC-8004 compliant agents for automated yield optimization'
    },
    {
      icon: Shield,
      title: 'zkMechanism',
      description: 'Advanced cryptography for secure privacy preservation'
    }
  ];

  const coreFeatures = [
    {
      icon: Zap,
      title: 'Instant Privacy',
      description: 'Deploy privacy-preserving transactions in seconds'
    },
    {
      icon: Layers,
      title: 'Smart Routing',
      description: 'AI agents optimize across multiple protocols'
    },
    {
      icon: TrendingUp,
      title: 'Yield Maximization',
      description: 'Automated strategies for maximum returns'
    }
  ];

  const capabilities = [
    {
      title: 'Privacy Lending',
      description: 'Lend and borrow with ZK proof of income without revealing identity or transaction history'
    },
    {
      title: 'Anonymous Staking',  
      description: 'Stake assets with complete anonymity, automated compounding, and privacy-preserving rewards'
    },
    {
      title: 'Stealth Yield Farming',
      description: 'AI agents optimize yield farming strategies with full transaction privacy protection'
    },
    {
      title: 'Cross-Chain Privacy',
      description: 'Seamlessly operate across multiple chains while maintaining complete privacy'
    }
  ];

  const roadmap = [
    {
      quarter: 'Q1',
      year: '2025',
      title: 'Foundation & Core Privacy',
      milestones: [
        'ZK-ERC8004 Token Standard Launch',
        'Privacy Pool Beta Testing',
        'AI Agent Marketplace MVP',
        'Mobile Privacy Wallet'
      ]
    },
    {
      quarter: 'Q2', 
      year: '2025',
      title: 'Advanced AI Integration',
      milestones: [
        'Multi-Chain AI Agent Orchestration',
        'Advanced Yield Optimization Algorithms',
        'Privacy Cross-Chain Bridges',
        'DeFi Protocol Integrations'
      ]
    },
    {
      quarter: 'Q3',
      year: '2025', 
      title: 'Ecosystem Expansion',
      milestones: [
        'DAO Governance Implementation',
        'Privacy NFT Marketplace',
        'Advanced Analytics Dashboard',
        'Institutional Privacy Solutions'
      ]
    },
    {
      quarter: 'Q4',
      year: '2025',
      title: 'Global Scale & Compliance',
      milestones: [
        'Regulatory Framework Compliance',
        'Enterprise Privacy Solutions',
        'Global Privacy Regulations Support',
        'Web3 Privacy Infrastructure'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Scroll Snap Container */}
      <div className="scroll-snap-container">
        {/* Section 1: THE VISION */}
        <section className="min-h-screen flex items-center justify-center px-8 py-24 scroll-snap-start">
          {/* Coordinate Label */}
          <div className="coordinate-label absolute top-24 left-8 text-white/50 text-sm">X:0 Y:0</div>
          
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left Column - THE VISION */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="content-overlay max-w-md"
                >
                  <h1 className="section-title text-4xl lg:text-5xl font-bold mb-4">
                    THE VISION
                  </h1>
                  <p className="text-lg text-white/80 mb-8">
                    Privacy-first DeFi powered by AI agents
                  </p>
                  <div className="coordinate-label text-white/30 text-xs">X:1 Y:1</div>
                </motion.div>
              </div>

              {/* Right Column - Overlapping Feature Cards */}
              <div className="lg:col-span-2 relative">
                {/* Desktop: Overlapping layout */}
                <div className="hidden lg:block relative h-[500px]">
                  {visionFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className={`overlay-block absolute ${
                        index === 0 ? 'top-0 left-0' :
                        index === 1 ? 'top-20 left-20 z-10' :
                        'top-40 left-40 z-20'
                      }`}
                    >
                      <div className="coordinate-label text-white/30 text-xs">
                        X:{index + 2} Y:1
                      </div>
                      <div className="flex items-center space-x-3 mb-3">
                        <feature.icon className="w-6 h-6 text-purple-400" />
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                      </div>
                      <p className="text-white/70">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Mobile: Stacked layout */}
                <div className="lg:hidden space-y-4">
                  {visionFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="overlay-block p-4"
                    >
                      <div className="coordinate-label text-white/30 text-xs">
                        X:{index + 2} Y:1
                      </div>
                      <div className="flex items-center space-x-3 mb-3">
                        <feature.icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: THE CORE */}
        <section className="min-h-screen flex items-center justify-center px-8 py-24 scroll-snap-start">
          {/* Coordinate Label */}
          <div className="coordinate-label absolute top-24 left-8 text-white/50 text-sm">X:0 Y:1</div>
          
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="coordinate-label text-white/30 text-xs">X:1 Y:2</div>
              <h2 className="section-title text-4xl lg:text-5xl font-bold mb-4">
                THE CORE
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Core infrastructure powering privacy-preserving DeFi with AI intelligence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="overlay-block p-6"
                >
                  <div className="coordinate-label text-white/30 text-xs">X:{index + 2} Y:2</div>
                  <div className="flex items-center space-x-3 mb-4">
                    <feature.icon className="w-8 h-8 text-purple-400" />
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Dynamic Stats Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="stats-overlay max-w-4xl mx-auto"
            >
              <div className="coordinate-label text-white/30 text-xs">X:1 Y:3</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{stats.agents}+</div>
                  <div className="text-white/70 text-sm">AI Agents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{stats.users}</div>
                  <div className="text-white/70 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{stats.apy}%</div>
                  <div className="text-white/70 text-sm">Avg APY</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">${stats.tvl}M</div>
                  <div className="text-white/70 text-sm">TVL</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: CAPABILITIES */}
        <section className="min-h-screen flex items-center justify-center px-8 py-24 scroll-snap-start">
          {/* Coordinate Label */}
          <div className="coordinate-label absolute top-24 left-8 text-white/50 text-sm">X:0 Y:2</div>
          
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="coordinate-label text-white/30 text-xs">X:1 Y:4</div>
              <h2 className="section-title text-4xl lg:text-5xl font-bold mb-4">
                CAPABILITIES
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Advanced privacy solutions for the future of decentralized finance
              </p>
            </motion.div>

            <div className="space-y-8">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="overlay-block p-8"
                >
                  <div className="coordinate-label text-white/30 text-xs">X:2 Y:{index + 4}</div>
                  <div className="flex items-start space-x-4">
                    <div className="capability-number">0{index + 1}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">{capability.title}</h3>
                      <p className="text-white/70 leading-relaxed">{capability.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: ROADMAP & FUTURE */}
        <section className="min-h-screen flex items-center justify-center px-8 py-24 scroll-snap-start">
          {/* Coordinate Label */}
          <div className="coordinate-label absolute top-24 left-8 text-white/50 text-sm">X:0 Y:3</div>
          
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="coordinate-label text-white/30 text-xs">X:1 Y:8</div>
              <h2 className="section-title text-4xl lg:text-5xl font-bold mb-4">
                ROADMAP & FUTURE
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Strategic development timeline for privacy-preserving DeFi ecosystem
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {roadmap.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="overlay-block p-6"
                >
                  <div className="coordinate-label text-white/30 text-xs">X:{index + 2} Y:8</div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-purple-400 mb-1">
                      {phase.quarter} {phase.year}
                    </h3>
                    <h4 className="text-xl font-bold mb-4">{phase.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {phase.milestones.map((milestone, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-white/70">
                        <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span className="text-sm">{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}