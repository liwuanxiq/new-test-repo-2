'use client';

import { motion } from 'framer-motion';
import { Shield, Leaf, Award, Users, TrendingUp, Heart } from 'lucide-react';

interface TrustScoreProps {
  productId: string;
  sellerId: string;
}

export function TrustTransparencyWidget({ productId, sellerId }: TrustScoreProps) {
  // Mock data - will be fetched from API
  const trustData = {
    productAuthenticity: 94,
    sellerTrust: 87,
    reviewAuthenticity: 91,
    ethicalSourcing: 78,
    sustainabilityScore: 82,
    verifiedPurchase: 89,
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500 bg-green-50 border-green-200';
    if (score >= 75) return 'text-amber-500 bg-amber-50 border-amber-200';
    return 'text-red-500 bg-red-50 border-red-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Attention';
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-aura-500" />
        <h3 className="text-lg font-semibold gradient-text">Trust & Transparency</h3>
      </div>

      {/* Overall Trust Score */}
      <div className="relative flex items-center justify-center py-6">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#e2e8f0"
            strokeWidth="12"
            fill="none"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDasharray: 440 }}
            animate={{ strokeDasharray: `${(trustData.productAuthenticity / 100) * 440} 440` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold gradient-text">{trustData.productAuthenticity}</span>
          <span className="text-xs text-slate-500 mt-1">Trust Score</span>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="space-y-4">
        <TrustMetric
          icon={Award}
          label="Product Authenticity"
          score={trustData.productAuthenticity}
          color={getScoreColor(trustData.productAuthenticity)}
        />
        
        <TrustMetric
          icon={Users}
          label="Seller Trust"
          score={trustData.sellerTrust}
          color={getScoreColor(trustData.sellerTrust)}
        />
        
        <TrustMetric
          icon={Heart}
          label="Review Authenticity"
          score={trustData.reviewAuthenticity}
          color={getScoreColor(trustData.reviewAuthenticity)}
        />
        
        <TrustMetric
          icon={Leaf}
          label="Ethical Sourcing"
          score={trustData.ethicalSourcing}
          color={getScoreColor(trustData.ethicalSourcing)}
        />
        
        <TrustMetric
          icon={TrendingUp}
          label="Sustainability"
          score={trustData.sustainabilityScore}
          color={getScoreColor(trustData.sustainabilityScore)}
        />
      </div>

      {/* Verification Badge */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Verified Purchases</span>
          <span className="text-sm font-semibold text-green-600">
            {trustData.verifiedPurchase}% Verified
          </span>
        </div>
        <div className="mt-2 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${trustData.verifiedPurchase}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* AI Insights */}
      <div className="pt-4 border-t border-slate-200">
        <div className="bg-gradient-to-br from-aura-50 to-accent-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <SparklesIcon className="w-5 h-5 text-aura-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-800">AI Trust Insight</p>
              <p className="text-xs text-slate-600 mt-1">
                This product shows strong authenticity signals with {trustData.productAuthenticity}% 
                confidence. The seller has a proven track record with {trustData.sellerTrust}% trust rating.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustMetric({ 
  icon: Icon, 
  label, 
  score, 
  color 
}: { 
  icon: any; 
  label: string; 
  score: number; 
  color: string;
}) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl border ${color}`}>
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-right">
        <span className="text-lg font-bold">{score}</span>
        <span className="text-xs block opacity-75">{getScoreLabel(score)}</span>
      </div>
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
