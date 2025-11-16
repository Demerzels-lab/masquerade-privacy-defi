import { useState, useEffect } from 'react';
import { Bot, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Agent {
  id: string;
  name: string;
  agent_type: string;
  pricing_model?: string;
  subscription_fee?: number;
  performance_fee_percentage?: number;
}

interface AgentActivationModalProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
  onActivate: (agentId: string) => Promise<void>;
}

export default function AgentActivationModal({
  agent,
  isOpen,
  onClose,
  onActivate,
}: AgentActivationModalProps) {
  const [isActivating, setIsActivating] = useState(false);
  const [activationStatus, setActivationStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setActivationStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!agent || !isOpen) return null;

  const handleActivate = async () => {
    setIsActivating(true);
    setActivationStatus('processing');
    setErrorMessage('');

    try {
      // Call parent's onActivate function
      await onActivate(agent.id);
      
      setActivationStatus('success');
      
      // Auto-close after 2 seconds on success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setActivationStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to activate agent');
    } finally {
      setIsActivating(false);
    }
  };

  const getPricingText = () => {
    if (!agent.pricing_model || agent.pricing_model === 'free') {
      return 'This agent is free to use';
    }
    if (agent.pricing_model === 'subscription') {
      return `Monthly subscription: $${agent.subscription_fee}`;
    }
    if (agent.pricing_model === 'performance') {
      return `Performance fee: ${agent.performance_fee_percentage}% of profits`;
    }
    return 'Pricing information not available';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background-page/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-100 rounded-2xl p-8 max-w-md w-full border border-neutral-400/20 shadow-modal"
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-primary-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              {activationStatus === 'success' ? (
                <CheckCircle2 className="w-8 h-8 text-semantic-success" />
              ) : activationStatus === 'error' ? (
                <AlertCircle className="w-8 h-8 text-semantic-error" />
              ) : (
                <Bot className="w-8 h-8 text-primary-500" />
              )}
            </div>

            {/* Content based on status */}
            {activationStatus === 'idle' && (
              <>
                <h2 className="text-2xl font-bold text-center mb-3">Activate Agent</h2>
                <p className="text-neutral-300 text-center mb-6">
                  Are you sure you want to activate <span className="font-semibold text-text-primary">{agent.name}</span>?
                </p>

                {/* Pricing Info */}
                <div className="p-4 bg-neutral-50 rounded-lg mb-6">
                  <p className="text-sm font-semibold text-text-primary mb-2">Pricing</p>
                  <p className="text-sm text-neutral-300">{getPricingText()}</p>
                </div>

                {/* Terms */}
                <div className="p-4 bg-primary-500/5 border border-primary-500/20 rounded-lg mb-6">
                  <p className="text-xs text-neutral-300">
                    By activating this agent, you agree to the terms and conditions. 
                    The agent will start executing automated strategies on your behalf.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    disabled={isActivating}
                    className="flex-1 px-6 py-3 bg-neutral-50 text-neutral-300 rounded-xl font-semibold hover:bg-neutral-200 hover:text-text-primary transition-all duration-fast disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleActivate}
                    disabled={isActivating}
                    className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-fast shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isActivating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Activating...</span>
                      </>
                    ) : (
                      <span>Activate</span>
                    )}
                  </button>
                </div>
              </>
            )}

            {activationStatus === 'processing' && (
              <>
                <h2 className="text-2xl font-bold text-center mb-3">Activating Agent</h2>
                <p className="text-neutral-300 text-center mb-6">
                  Please wait while we activate {agent.name}...
                </p>
                <div className="flex justify-center">
                  <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
                </div>
              </>
            )}

            {activationStatus === 'success' && (
              <>
                <h2 className="text-2xl font-bold text-center mb-3 text-semantic-success">
                  Agent Activated!
                </h2>
                <p className="text-neutral-300 text-center mb-6">
                  {agent.name} has been successfully activated and will start working shortly.
                </p>
              </>
            )}

            {activationStatus === 'error' && (
              <>
                <h2 className="text-2xl font-bold text-center mb-3 text-semantic-error">
                  Activation Failed
                </h2>
                <p className="text-neutral-300 text-center mb-6">{errorMessage}</p>
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-neutral-50 text-neutral-300 rounded-xl font-semibold hover:bg-neutral-200 hover:text-text-primary transition-all duration-fast"
                >
                  Close
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
