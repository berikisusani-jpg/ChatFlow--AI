import React from 'react';

export default function Billing() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-display font-medium text-white italic">Billing & Subscriptions</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Free', 'Pro', 'Enterprise'].map(plan => (
          <div key={plan} className="glass-panel p-8 space-y-4">
            <h3 className="text-xl font-bold">{plan}</h3>
            <p className="text-white/40">Essential features for scaling agents.</p>
            <button className="w-full cyber-button">Upgrade</button>
          </div>
        ))}
      </div>
    </div>
  );
}
