import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle } from 'lucide-react';
import Tooltip from './Tooltip';
import { formatCurrency } from '../utils/formatters';

interface Metrics {
  [key: string]: number;
}

interface MetricsCalculatorProps {
  onMetricsChange: (metrics: Metrics) => void;
}

const metricInfo = {
  l12mRevenue: "Last 12 Months Revenue - Total revenue generated in the past year",
  l12mExpenses: "Last 12 Months Expenses - Total expenses incurred in the past year",
  l12mProfit: "Last 12 Months Profit - Net profit generated in the past year",
  mrr: "Monthly Recurring Revenue - Predictable revenue generated each month",
  arr: "Annual Recurring Revenue - Yearly predictable revenue",
  arpc: "Average Revenue Per Customer - Average monthly revenue per customer",
  clv: "Customer Lifetime Value - Total expected revenue from a single customer",
  nrr: "Net Revenue Retention - Revenue retained including expansions/contractions"
};

export default function MetricsCalculator({ onMetricsChange }: MetricsCalculatorProps) {
  const [inputs, setInputs] = useState({
    monthlyRevenue: 0,
    l12mExpenses: 0,
    customerCount: 0,
    churnRate: 0,
    expansionRevenue: 0,
  });

  const [metrics, setMetrics] = useState<Metrics>({});

  const calculateMetrics = () => {
    const mrr = inputs.monthlyRevenue;
    const arr = mrr * 12;
    const l12mRevenue = arr;
    const l12mExpenses = inputs.l12mExpenses;
    const l12mProfit = l12mRevenue - l12mExpenses;
    const arpc = inputs.customerCount > 0 ? mrr / inputs.customerCount : 0;
    
    const monthlyChurnRate = inputs.churnRate / 100;
    const avgLifetimeMonths = monthlyChurnRate > 0 ? 1 / monthlyChurnRate : 0;
    const clv = arpc * avgLifetimeMonths;
    
    const nrr = mrr > 0 ? ((mrr - (mrr * (inputs.churnRate / 100)) + inputs.expansionRevenue) / mrr) * 100 : 0;

    const newMetrics = {
      l12mRevenue,
      l12mExpenses,
      l12mProfit,
      mrr,
      arr,
      arpc,
      clv,
      nrr,
    };

    setMetrics(newMetrics);
    onMetricsChange(newMetrics);
  };

  useEffect(() => {
    calculateMetrics();
  }, [inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Input Values</h2>
            
            <div className="space-y-4">
              {[
                { label: 'Monthly Revenue ($)', name: 'monthlyRevenue' },
                { label: 'Last 12 Months Expenses ($)', name: 'l12mExpenses' },
                { label: 'Number of Customers', name: 'customerCount' },
                { label: 'Monthly Churn Rate (%)', name: 'churnRate' },
                { label: 'Monthly Expansion Revenue ($)', name: 'expansionRevenue' }
              ].map(({ label, name }) => (
                <div key={name} className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="number"
                    name={name}
                    value={inputs[name as keyof typeof inputs]}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 rounded-md border border-gray-300 bg-white 
                             shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                             transition duration-150 ease-in-out"
                    min="0"
                    step="0.01"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Overview</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {['l12mRevenue', 'l12mExpenses', 'l12mProfit'].map((key) => (
                <div key={key} className="relative group">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-indigo-200 transition-all duration-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">
                        {key === 'l12mRevenue' ? 'L12M REVENUE' : 
                         key === 'l12mExpenses' ? 'L12M EXPENSES' : 'L12M PROFIT'}
                      </span>
                      <Tooltip content={metricInfo[key]}>
                        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-indigo-500 cursor-help" />
                      </Tooltip>
                    </div>
                    <span className={`text-lg font-semibold ${
                      key === 'l12mProfit' && metrics[key] < 0 ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {formatCurrency(metrics[key] || 0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(metrics)
                .filter(([key]) => !['l12mRevenue', 'l12mExpenses', 'l12mProfit'].includes(key))
                .map(([key, value]) => (
                <div key={key} className="relative group">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-indigo-200 transition-all duration-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">
                        {key.toUpperCase()}
                      </span>
                      <Tooltip content={metricInfo[key]}>
                        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-indigo-500 cursor-help" />
                      </Tooltip>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {key.includes('ratio') || key.includes('nrr')
                        ? `${value.toFixed(2)}%`
                        : formatCurrency(value)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {metrics.l12mProfit > 0 && (
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Estimated Exit Valuation</h3>
              <p className="text-sm opacity-90 mb-4">
                Based on 5x L12M Profit Multiple
              </p>
              <div className="text-3xl font-bold">
                {formatCurrency(metrics.l12mProfit * 5)}
              </div>
              <p className="text-sm mt-2 opacity-75">
                *Standard micro-SaaS valuation: 5x Last 12 Months Profit
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}