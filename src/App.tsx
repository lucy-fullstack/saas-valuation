import React, { useState } from 'react';
import { Calculator, Info, TrendingUp, DollarSign, Users, Heart, LineChart } from 'lucide-react';
import MetricsCalculator from './components/MetricsCalculator';
import MetricsExplanation from './components/MetricsExplanation';
import BusinessInterpretation from './components/BusinessInterpretation';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [metrics, setMetrics] = useState({});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SaaS Metrics Hub</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`${
                  activeTab === 'calculator'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm sm:text-base transition-colors duration-200`}
              >
                <Calculator className="w-5 h-5 inline-block mr-2" />
                Calculator
              </button>
              <button
                onClick={() => setActiveTab('interpretation')}
                className={`${
                  activeTab === 'interpretation'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm sm:text-base transition-colors duration-200`}
              >
                <LineChart className="w-5 h-5 inline-block mr-2" />
                Business Analysis
              </button>
              <button
                onClick={() => setActiveTab('explanation')}
                className={`${
                  activeTab === 'explanation'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm sm:text-base transition-colors duration-200`}
              >
                <Info className="w-5 h-5 inline-block mr-2" />
                Metrics Guide
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'calculator' && <MetricsCalculator onMetricsChange={setMetrics} />}
            {activeTab === 'interpretation' && <BusinessInterpretation metrics={metrics} />}
            {activeTab === 'explanation' && <MetricsExplanation />}
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Built for micro-SaaS founders to make informed decisions
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;