import { useState } from 'react';
import { Shield, Droplet, ArrowRight, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pools() {
  const [depositAmount, setDepositAmount] = useState('');
  const [privacyLevel, setPrivacyLevel] = useState('standard');
  const [generatedAddress, setGeneratedAddress] = useState('');
  const [copied, setCopied] = useState(false);

  const privacyLevels = [
    {
      value: 'standard',
      label: 'Standard',
      description: 'Basic transaction mixing',
      anonymitySet: '100+ users',
    },
    {
      value: 'advanced',
      label: 'Advanced',
      description: 'Enhanced mixing with timing randomization',
      anonymitySet: '500+ users',
    },
    {
      value: 'maximum',
      label: 'Maximum',
      description: 'Maximum anonymity dengan multiple hops',
      anonymitySet: '1000+ users',
    },
  ];

  const generateStealthAddress = () => {
    const address = `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setGeneratedAddress(address);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(generatedAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const poolStats = [
    { label: 'Total Pool Size', value: '$52M' },
    { label: 'Active Mixers', value: '2,345' },
    { label: 'Anonymity Set', value: '10,000+' },
    { label: 'Privacy Score', value: '98.5%' },
  ];

  return (
    <div className="min-h-screen bg-background-page text-text-primary pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">Privacy Pools</h1>
            <p className="text-neutral-300">Transaction mixing dan stealth addresses untuk enhanced anonymity</p>
          </div>

          {/* Pool Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {poolStats.map((stat, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-xl p-4 border border-neutral-400/20"
              >
                <p className="text-sm text-neutral-300 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-primary-500">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Deposit Interface */}
            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-400/20">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Droplet className="w-6 h-6 text-primary-500 mr-3" />
                Deposit to Privacy Pool
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Deposit Amount (ETH)</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-neutral-100 border border-neutral-400/20 rounded-lg text-text-primary placeholder-neutral-300 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Privacy Level</label>
                  <div className="space-y-3">
                    {privacyLevels.map((level) => (
                      <div
                        key={level.value}
                        onClick={() => setPrivacyLevel(level.value)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-fast ${
                          privacyLevel === level.value
                            ? 'border-primary-500 bg-primary-500/5'
                            : 'border-neutral-400/20 hover:border-neutral-400/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{level.label}</span>
                          <span className="text-xs text-neutral-300">{level.anonymitySet}</span>
                        </div>
                        <p className="text-sm text-neutral-300">{level.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full px-6 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-fast shadow-glow flex items-center justify-center space-x-2">
                  <span>Deposit to Pool</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stealth Address Generator */}
            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-400/20">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Shield className="w-6 h-6 text-accent-500 mr-3" />
                Stealth Address Generator
              </h2>

              <div className="space-y-6">
                <div className="p-4 bg-neutral-100 rounded-lg border border-accent-500/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <EyeOff className="w-5 h-5 text-accent-500" />
                    <h3 className="font-semibold">Privacy Features</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-neutral-300">
                    <li className="flex items-start">
                      <span className="text-semantic-success mr-2">✓</span>
                      <span>Unique address untuk setiap transaksi</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-semantic-success mr-2">✓</span>
                      <span>Tidak terlacak ke identity asli</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-semantic-success mr-2">✓</span>
                      <span>ZK proof untuk ownership verification</span>
                    </li>
                  </ul>
                </div>

                {generatedAddress ? (
                  <div className="p-4 bg-neutral-100 rounded-lg border border-semantic-success/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-semantic-success">Generated Address</span>
                      <button
                        onClick={copyAddress}
                        className="p-2 hover:bg-neutral-50 rounded transition-colors duration-fast"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-semantic-success" />
                        ) : (
                          <Copy className="w-4 h-4 text-neutral-300" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm font-mono text-text-primary break-all">{generatedAddress}</p>
                  </div>
                ) : (
                  <div className="p-8 bg-neutral-100 rounded-lg border border-neutral-400/20 text-center">
                    <Eye className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                    <p className="text-sm text-neutral-300">Generate stealth address untuk private transactions</p>
                  </div>
                )}

                <button
                  onClick={generateStealthAddress}
                  className="w-full px-6 py-4 bg-accent-500 text-white rounded-xl font-semibold hover:bg-accent-600 transition-all duration-fast shadow-glow"
                >
                  Generate Stealth Address
                </button>

                <div className="p-4 bg-semantic-warning/10 rounded-lg border border-semantic-warning/20">
                  <p className="text-sm text-semantic-warning">
                    <strong>Note:</strong> Simpan private key dengan aman. Address ini hanya bisa diakses oleh Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Metrics */}
          <div className="mt-12 bg-neutral-50 rounded-2xl p-8 border border-neutral-400/20">
            <h2 className="text-2xl font-bold mb-6">Privacy Status</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-semantic-success/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-semantic-success animate-pulse-glow" />
                </div>
                <div>
                  <p className="text-sm text-neutral-300">Current Privacy Level</p>
                  <p className="text-xl font-bold text-semantic-success">Maximum</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-300">Pool Participation</p>
                  <p className="text-xl font-bold">Active</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-accent-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-300">Anonymity Score</p>
                  <p className="text-xl font-bold text-accent-500">98.5%</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
