import { Link } from 'react-router-dom';
import { Shield, Lock, Zap, Bot, Eye, TrendingUp, ArrowRight, CheckCircle, Wallet, Layers, Cpu, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  const features = [
    {
      icon: Lock,
      title: 'Zero Knowledge Privacy',
      description: 'Complete anonymity using ZK-SNARKs and ZK-STARKs for all your DeFi transactions',
    },
    {
      icon: Bot,
      title: 'ERC-8004 AI Agents',
      description: 'Verified AI agents with reputation scoring for automated yield farming',
    },
    {
      icon: Eye,
      title: 'Privacy Pools',
      description: 'Transaction mixing and stealth addresses for enhanced anonymity',
    },
  ];

  const useCases = [
    {
      title: 'Privacy Lending',
      description: 'Lend and borrow with ZK proof of income without revealing identity',
      apy: '8-12%',
    },
    {
      title: 'Automated Farming',
      description: 'AI agents optimize yield farming strategies with privacy-preserving execution',
      apy: '25-45%',
    },
    {
      title: 'Anonymous Staking',
      description: 'Stake assets with complete anonymity and automated compounding',
      apy: '6-18%',
    },
  ];

  const stats = [
    { label: 'Total Value Locked', value: '$125M' },
    { label: 'Active Users', value: '12.5K' },
    { label: 'Average APY', value: '38.2%' },
    { label: 'AI Agents', value: '150+' },
  ];

  const howItWorksSteps = [
    {
      step: '01',
      icon: Wallet,
      title: 'Connect Wallet',
      description: 'Connect your MetaMask and start anonymous transactions using Zero Knowledge authentication',
      action: 'Click "Connect Wallet" and follow instructions',
      highlight: 'Private & Secure',
    },
    {
      step: '02',
      icon: Layers,
      title: 'Choose Strategy',
      description: 'Choose AI agents from marketplace or set custom DeFi strategies with privacy preservation',
      action: 'Browse AI agents or set custom strategy',
      highlight: 'ERC-8004 Compliant',
    },
    {
      step: '03',
      icon: Cpu,
      title: 'AI Execution',
      description: 'AI agents will execute strategies automatically with ZK proofs for every transaction',
      action: 'Monitor real-time performance dashboard',
      highlight: 'Automated Yield',
    },
    {
      step: '04',
      icon: Sparkles,
      title: 'Harvest Profits',
      description: 'Harvest yield farming results with complete anonymity using stealth addresses',
      action: 'Claim anonymous rewards and reinvest or withdraw',
      highlight: 'Anonymous Withdrawal',
    },
  ];

  return (
    <div className="min-h-screen text-text-primary">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neutral-50 rounded-full mb-6 border border-primary-500/20">
              <Shield className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-neutral-300">Privacy-Preserving DeFi with AI Agents</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
              <span className="text-gradient">Masquerade</span>
              <br />
              <span className="text-text-primary">Privacy DeFi</span>
            </h1>
            
            <p className="text-xl text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary DeFi platform that combines Zero Knowledge proofs with ERC-8004 AI agents 
              for automated yield farming with complete anonymity
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/auth"
                className="px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-fast shadow-glow hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Anonymous Trading</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/marketplace"
                className="px-8 py-4 bg-transparent border-2 border-primary-500 text-primary-500 rounded-xl font-semibold hover:bg-primary-500 hover:text-white transition-all duration-fast"
              >
                Explore AI Agents
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-neutral-50 rounded-xl p-6 border border-neutral-400/20 hover:border-primary-500/40 transition-all duration-normal">
                <div className="text-3xl font-bold text-primary-500 mb-2">{stat.value}</div>
                <div className="text-sm text-neutral-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 bg-neutral-50/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Platform Key Features</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Cutting-edge technology for maximum privacy and automation in DeFi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background-surface rounded-2xl p-8 border border-neutral-400/20 hover:border-primary-500/40 transition-all duration-normal hover:shadow-card-hover group"
              >
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-normal">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-neutral-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Various DeFi strategies with privacy preservation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-50 rounded-2xl p-8 border border-neutral-400/20 hover:shadow-card-hover transition-all duration-normal"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{useCase.title}</h3>
                  <div className="px-3 py-1 bg-semantic-success/20 text-semantic-success rounded-lg text-sm font-semibold">
                    {useCase.apy} APY
                  </div>
                </div>
                <p className="text-neutral-300 leading-relaxed">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 px-8 bg-neutral-50/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technology Stack</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Built with leading Web3 technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background-surface rounded-2xl p-8 border border-neutral-400/20">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Zap className="w-6 h-6 text-primary-500 mr-3" />
                Zero Knowledge Proofs
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-semantic-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">ZK-SNARKs & ZK-STARKs</p>
                    <p className="text-sm text-neutral-300">Completeness, Soundness, Zero-knowledge properties</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-semantic-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Privacy-Preserving Authentication</p>
                    <p className="text-sm text-neutral-300">Stealth addresses and anonymous user registration</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background-surface rounded-2xl p-8 border border-neutral-400/20">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 text-accent-500 mr-3" />
                ERC-8004 AI Agents
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-semantic-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Identity & Reputation Registry</p>
                    <p className="text-sm text-neutral-300">Verified agent capabilities with trust scoring</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-semantic-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Automated Strategy Execution</p>
                    <p className="text-sm text-neutral-300">AI-powered yield optimization with ZK proofs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How the Platform Works</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              From wallet connection to profit harvesting in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Connection Line (except last item) */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 z-0 group-hover:shadow-glow transition-all duration-normal"></div>
                )}
                
                <div className="bg-background-surface rounded-2xl p-6 border border-neutral-400/20 hover:border-primary-500/40 transition-all duration-normal hover:shadow-card-hover relative z-10">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold text-primary-500/20">
                      {step.step}
                    </div>
                    <div className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-xs font-semibold">
                      {step.highlight}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-normal">
                    <step.icon className="w-6 h-6 text-primary-500" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-neutral-300 leading-relaxed mb-4">{step.description}</p>
                  
                  {/* Action */}
                  <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-400/10">
                    <p className="text-sm text-primary-500 font-medium">💡 {step.action}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-background-surface to-neutral-50/30 rounded-2xl p-8 border border-primary-500/20"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-2">Visual Process Flow</h3>
              <p className="text-neutral-300">See how privacy and automation work together</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-primary-500" />
                </div>
                <h4 className="font-semibold">Privacy Layer</h4>
                <p className="text-sm text-neutral-300">ZK proofs, stealth addresses, mixing pools</p>
              </div>

              <div className="space-y-2">
                <div className="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Bot className="w-8 h-8 text-accent-500" />
                </div>
                <h4 className="font-semibold">AI Execution</h4>
                <p className="text-sm text-neutral-300">ERC-8004 agents, yield optimization, risk management</p>
              </div>

              <div className="space-y-2">
                <div className="w-16 h-16 bg-semantic-success/10 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-8 h-8 text-semantic-success" />
                </div>
                <h4 className="font-semibold">DeFi Integration</h4>
                <p className="text-sm text-neutral-300">Lending, staking, farming protocols</p>
              </div>
            </div>

            {/* Interactive CTA */}
            <div className="mt-8 text-center">
              <Link
                to="/auth"
                className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-fast shadow-glow hover:scale-105"
              >
                <span>Try Now - Free</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <p className="text-sm text-neutral-400 mt-2">No minimum investment required to start</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-background-page/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Start Trading with Privacy</h2>
              <p className="text-lg mb-8 opacity-90">
                Join thousands of traders who prioritize privacy and automation
              </p>
              <Link
                to="/auth"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-500 rounded-xl font-semibold hover:scale-105 transition-all duration-fast shadow-lg"
              >
                <span>Connect Wallet Now</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
