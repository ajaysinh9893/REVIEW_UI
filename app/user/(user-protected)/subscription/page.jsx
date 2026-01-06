'use client';

import { useState, useEffect } from 'react';
import { Check, MessageSquare, Crown, Shield, Headphones, Clock, TrendingUp, ArrowLeft } from 'lucide-react';

export default function SubscriptionMinimal() {
  const [scrollY, setScrollY] = useState(0);
  const fadeDistance = 80; // Smaller fade distance
  const fadeOpacity = Math.max(0, 1 - scrollY / fadeDistance);
  const scrollOpacity = Math.max(0, 1 - scrollY / fadeDistance);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'reviews-overview',
      name: 'Reviews & Overview',
      icon: MessageSquare,
      price: { monthly: 19, annual: 190 },
      description: 'Essential review management',
      features: [
        'Review management',
        'Overview dashboard',
        'Google Business sync',
        'Sentiment analysis',
        'Email support'
      ]
    },
    {
      id: 'all-features',
      name: 'All Features',
      icon: Crown,
      price: { monthly: 49, annual: 490 },
      description: 'Complete business suite',
      popular: true,
      features: [
        'Everything in Reviews & Overview',
        'Contact directory & FAQ',
        'Opening hours & multi-location',
        'Advanced analytics & AI',
        'Custom branding & API',
        'Priority support'
      ]
    }
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    console.log('Selected plan:', planId, 'Billing:', billingPeriod);
  };

  return (
    <div className="min-h-screen font-sans overflow-y-scroll" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="p-4 md:p-6 lg:p-10 md:pt-8 lg:pt-20 lg:pr-24">
        {/* Header with glass effect - sticky */}
        <div className="sticky top-0 z-10 -mx-6 px-6 pt-4 pb-6 mb-8" style={{ opacity: scrollOpacity, backdropFilter: `blur(${10 - scrollOpacity * 10}px)`, backgroundColor: scrollOpacity < 0.9 ? 'rgba(250, 249, 245, 0.7)' : 'transparent' }}>
        </div>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Choose Your Plan
            </h1>
            <p className="text-gray-600 mb-6">
              Simple pricing for your business needs
            </p>

            {/* Billing Toggle - Compact */}
            <div className="inline-flex items-center bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingPeriod === 'annual'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          {/* Plans - Minimal Cards */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-lg border-2 transition-all hover:shadow-lg ${
                    plan.popular
                      ? 'border-indigo-500 shadow-md'
                      : isSelected
                      ? 'border-indigo-400'
                      : 'border-gray-200'
                  }`}
                >
                  {/* Popular Badge or Savings Badge */}
                  {plan.popular && billingPeriod === 'monthly' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                        Popular
                      </span>
                    </div>
                  )}
                  {plan.popular && billingPeriod === 'annual' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                        Popular - Save 17%
                      </span>
                    </div>
                  )}
                  {!plan.popular && billingPeriod === 'annual' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                        Save 17%
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Icon className="text-indigo-600" size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                        <p className="text-xs text-gray-600">{plan.description}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900">
                          ${billingPeriod === 'monthly' ? plan.price.monthly : Math.round(plan.price.annual / 12)}
                        </span>
                        <span className="text-gray-600 text-sm">/month</span>
                      </div>
                      {billingPeriod === 'annual' && (
                        <p className="text-xs text-gray-500 mt-1">
                          ${plan.price.annual}/year
                        </p>
                      )}
                    </div>

                    {/* Features - Compact */}
                    <div className="space-y-2 mb-5">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button - Compact */}
                    <button
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {isSelected ? '✓ Selected' : 'Get Started'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparison Table - Minimal */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Feature Comparison
            </h2>
            
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-3 font-semibold text-gray-900">Reviews</th>
                  <th className="text-center py-3 font-semibold text-gray-900">All Features</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Review Management', basic: true, premium: true },
                  { feature: 'Overview Dashboard', basic: true, premium: true },
                  { feature: 'Google Business Sync', basic: true, premium: true },
                  { feature: 'Contact Directory', basic: false, premium: true },
                  { feature: 'FAQ Management', basic: false, premium: true },
                  { feature: 'Opening Hours', basic: false, premium: true },
                  { feature: 'Multi-Location', basic: false, premium: true },
                  { feature: 'Advanced Analytics', basic: false, premium: true },
                  { feature: 'AI Reply Suggestions', basic: false, premium: true },
                  { feature: 'Custom Branding', basic: false, premium: true },
                  { feature: 'API Access', basic: false, premium: true }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-2.5 text-gray-700">{row.feature}</td>
                    <td className="text-center py-2.5">
                      {row.basic ? (
                        <Check className="inline-block text-green-600" size={16} />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="text-center py-2.5">
                      {row.premium ? (
                        <Check className="inline-block text-green-600" size={16} />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FAQ - Minimal */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">
              FAQ
            </h2>
            
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Can I upgrade later?</h3>
                <p className="text-gray-600 text-xs">
                  Yes! Upgrade anytime and we&apos;ll prorate the difference.
                </p>
              </div>
              
              <div className="pb-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Is there a free trial?</h3>
                <p className="text-gray-600 text-xs">
                  Yes, try any plan free for 14 days. No credit card required.
                </p>
              </div>
              
              <div className="pb-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">What payment methods?</h3>
                <p className="text-gray-600 text-xs">
                  All major credit cards and PayPal accepted.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Can I cancel anytime?</h3>
                <p className="text-gray-600 text-xs">
                  Absolutely. Cancel anytime with no fees.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators - Minimal */}
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="text-blue-600" size={20} />
              </div>
              <h4 className="font-semibold text-gray-900 text-xs mb-1">Secure</h4>
              <p className="text-gray-600 text-xs">Bank-level encryption</p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Headphones className="text-green-600" size={20} />
              </div>
              <h4 className="font-semibold text-gray-900 text-xs mb-1">24/7 Support</h4>
              <p className="text-gray-600 text-xs">Always available</p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Clock className="text-yellow-600" size={20} />
              </div>
              <h4 className="font-semibold text-gray-900 text-xs mb-1">14-Day Trial</h4>
              <p className="text-gray-600 text-xs">No card needed</p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="text-red-600" size={20} />
              </div>
              <h4 className="font-semibold text-gray-900 text-xs mb-1">Cancel Anytime</h4>
              <p className="text-gray-600 text-xs">No commitment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
