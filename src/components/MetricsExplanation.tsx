import React from 'react';
import { TrendingUp, DollarSign, Users, Heart } from 'lucide-react';

const metrics = [
  {
    category: "Growth & Expansion",
    icon: TrendingUp,
    metrics: [
      {
        name: "Quick Ratio",
        description: "Measures how quickly a company can grow MRR compared to MRR losses. A ratio > 1 indicates growth.",
        formula: "New MRR + Expansion MRR) / (Churned MRR + Contraction MRR)"
      },
      {
        name: "Customer Acquisition Cost (CAC)",
        description: "Total sales and marketing costs divided by the number of new customers acquired.",
        formula: "Total Sales & Marketing Costs / New Customers Acquired"
      },
      {
        name: "Customer Lifetime Value (CLV)",
        description: "The total revenue expected from a customer throughout the business relationship.",
        formula: "ARPA × Customer Lifetime (1/Churn Rate)"
      }
    ]
  },
  {
    category: "Revenue Metrics",
    icon: DollarSign,
    metrics: [
      {
        name: "Monthly Recurring Revenue (MRR)",
        description: "Predictable revenue generated each month from all active subscriptions.",
        formula: "Sum of all monthly subscription values"
      },
      {
        name: "Annual Recurring Revenue (ARR)",
        description: "Yearly version of MRR, showing predicted annual revenue.",
        formula: "MRR × 12"
      },
      {
        name: "Average Revenue Per Account (ARPA)",
        description: "Average monthly revenue generated per customer.",
        formula: "Total MRR / Total Number of Customers"
      }
    ]
  },
  {
    category: "Customer Success",
    icon: Users,
    metrics: [
      {
        name: "Churn Rate",
        description: "The rate at which customers cancel their subscriptions.",
        formula: "(Lost Customers / Total Customers at Start) × 100"
      },
      {
        name: "Net Revenue Retention (NRR)",
        description: "Measures revenue retained from existing customers including expansions and contractions.",
        formula: "((Starting MRR + Expansion - Churn - Contraction) / Starting MRR) × 100"
      },
      {
        name: "Customer Health Score",
        description: "Composite score indicating likelihood of renewal based on usage, support tickets, and engagement.",
        formula: "Weighted average of usage metrics, support interactions, and engagement indicators"
      }
    ]
  }
];

export default function MetricsExplanation() {
  return (
    <div className="space-y-8">
      {metrics.map((category) => {
        const Icon = category.icon;
        return (
          <div key={category.category} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Icon className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900">{category.category}</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {category.metrics.map((metric) => (
                <div key={metric.name} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {metric.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {metric.description}
                  </p>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-500">Formula:</p>
                    <p className="text-sm text-gray-900">{metric.formula}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}