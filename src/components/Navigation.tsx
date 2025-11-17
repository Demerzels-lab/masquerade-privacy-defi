import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Privacy Pools', path: '/pools' },
    { name: 'DeFi', path: '/defi' },
    { name: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/80 backdrop-blur-sm border-b border-neutral-400/20">
      <div className="container mx-auto px-8 py-2">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <img src="/logo.jpeg" alt="Masquerade Logo" className="w-8 h-8 md:w-24 md:h-24 rounded" />
              <div className="absolute inset-0 blur-lg opacity-50">
                <img src="/logo.jpeg" alt="Masquerade Logo" className="w-8 h-8 rounded" />
              </div>
            </div>
            <span className="text-xl font-bold text-gradient">Masquerade</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-fast ${
                  isActive(item.path)
                    ? 'text-primary-500 bg-neutral-100'
                    : 'text-neutral-300 hover:text-text-primary hover:bg-neutral-100/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {account ? (
              <div className="ml-4 flex items-center space-x-2">
                <div className="px-4 py-2 bg-neutral-100 rounded-lg flex items-center space-x-2 border border-semantic-success/20">
                  <div className="w-2 h-2 bg-semantic-success rounded-full animate-pulse-glow"></div>
                  <Wallet className="w-4 h-4 text-neutral-300" />
                  <span className="text-sm font-mono text-text-primary">{formatAddress(account)}</span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-semantic-error text-white rounded-lg text-sm font-medium hover:bg-semantic-error/80 transition-all duration-fast"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="ml-4 px-6 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-700 transition-all duration-fast hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-text-primary"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-fast ${
                  isActive(item.path)
                    ? 'text-primary-500 bg-neutral-100'
                    : 'text-neutral-300 hover:text-text-primary hover:bg-neutral-100/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {account ? (
              <div className="space-y-2">
                <div className="px-4 py-3 bg-neutral-100 rounded-lg flex items-center justify-center space-x-2">
                  <Wallet className="w-4 h-4 text-neutral-300" />
                  <span className="text-sm font-mono">{formatAddress(account)}</span>
                </div>
                <button
                  onClick={() => {
                    disconnectWallet();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-semantic-error text-white rounded-lg text-center font-medium"
                >
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  connectWallet();
                  setMobileMenuOpen(false);
                }}
                disabled={isConnecting}
                className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg text-center font-medium hover:bg-primary-700 disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
