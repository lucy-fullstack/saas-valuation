import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface BusinessInterpretationProps {
  metrics: any;
}

export default function BusinessInterpretation({ metrics }: BusinessInterpretationProps) {
  if (!metrics || Object.keys(metrics).length === 0) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No Metrics Available</h3>
        <p className="mt-2 text-sm text-gray-500">
          Please enter your business metrics in the calculator tab first.
        </p>
      </div>
    );
  }

  const {
    l12mRevenue,
    l12mExpenses,
    l12mProfit,
    mrr,
    arr,
    arpc,
    clv,
    nrr
  } = metrics;

  const profitMargin = (l12mProfit / l12mRevenue) * 100;
  const monthlyBurnRate = l12mExpenses / 12;
  const runway = l12mProfit > 0 ? "Profitable" : Math.abs(l12mProfit / monthlyBurnRate).toFixed(1);

  const getHealthStatus = () => {
    if (profitMargin > 20) return { icon: CheckCircle, color: 'text-green-500', text: 'Excellent' };
    if (profitMargin > 10) return { icon: CheckCircle, color: 'text-blue-500', text: 'Good' };
    if (profitMargin > 0) return { icon: AlertTriangle, color: 'text-yellow-500', text: 'Fair' };
    return { icon: TrendingDown, color: 'text-red-500', text: 'Needs Improvement' };
  };

  const healthStatus = getHealthStatus();
  const HealthIcon = healthStatus.icon;

  const getScalingOpportunities = () => {
    const opportunities = [];
    
    if (nrr < 100) {
      opportunities.push("Focus on customer retention and reducing churn");
    }
    if (arpc < mrr * 0.1) {
      opportunities.push("Potential for pricing optimization and upselling");
    }
    if (profitMargin < 20) {
      opportunities.push("Room for operational efficiency improvements");
    }
    if (clv < arpc * 24) {
      opportunities.push("Opportunity to increase customer lifetime value");
    }
    
    return opportunities;
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <HealthIcon className={`h-8 w-8 ${healthStatus.color}`} />
          <h2 className="text-2xl font-bold text-gray-900">
            Business Health: {healthStatus.text}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Financial Overview</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Annual Revenue</dt>
                  <dd className="font-semibold">{formatCurrency(l12mRevenue)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Annual Profit</dt>
                  <dd className={`font-semibold ${l12mProfit < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(l12mProfit)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Profit Margin</dt>
                  <dd className={`font-semibold ${profitMargin < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {profitMargin.toFixed(1)}%
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Monthly Burn Rate</dt>
                  <dd className="font-semibold">{formatCurrency(monthlyBurnRate)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Growth Metrics</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Monthly Recurring Revenue</dt>
                  <dd className="font-semibold">{formatCurrency(mrr)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Revenue per Customer</dt>
                  <dd className="font-semibold">{formatCurrency(arpc)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Customer Lifetime Value</dt>
                  <dd className="font-semibold">{formatCurrency(clv)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Net Revenue Retention</dt>
                  <dd className={`font-semibold ${nrr >= 100 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {nrr.toFixed(1)}%
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Business Analysis</h3>
          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-700">
              This {l12mProfit > 0 ? 'profitable' : 'growing'} micro-SaaS business generates {formatCurrency(mrr)} in monthly recurring revenue,
              with a {profitMargin > 0 ? 'positive' : 'negative'} profit margin of {Math.abs(profitMargin).toFixed(1)}%.
              {l12mProfit > 0 ? ` At the current 5x multiple, the business is valued at ${formatCurrency(l12mProfit * 5)}.` : ''}
            </p>
            
            <h4 className="text-gray-900 font-medium mt-4">Key Strengths</h4>
            <ul className="list-disc pl-5 space-y-1">
              {mrr > 0 && <li>Established recurring revenue stream</li>}
              {profitMargin > 10 && <li>Healthy profit margins</li>}
              {nrr >= 100 && <li>Strong revenue retention</li>}
              {clv > arpc * 12 && <li>Good customer lifetime value</li>}
            </ul>

            <h4 className="text-gray-900 font-medium mt-4">Scaling Opportunities</h4>
            <ul className="list-disc pl-5 space-y-1">
              {getScalingOpportunities().map((opportunity, index) => (
                <li key={index}>{opportunity}</li>
              ))}
            </ul>

            <h4 className="text-gray-900 font-medium mt-4">Acquisition Potential</h4>
            <p className="text-gray-700">
              {l12mProfit > 0
                ? `This business represents a ${profitMargin > 20 ? 'strong' : 'reasonable'} acquisition opportunity with established revenue and ${profitMargin > 20 ? 'excellent' : 'positive'} profit margins. ${nrr >= 100 ? 'Strong revenue retention indicates satisfied customers and product-market fit.' : 'There\'s room for improving customer retention and expansion.'}`
                : 'The business currently requires optimization to achieve profitability before considering an exit. Focus on reducing costs and improving revenue retention.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}