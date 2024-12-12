import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

export default function InterestRateTooltip() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-500 focus:outline-none"
      >
        <HelpCircle className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute left-6 top-0 z-50 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-900">Interest rate</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Representative interest rates are based upon a national, or state specific average
              from lenders for preliminary research purposes only. Actual available rates and
              monthly payment amounts are subject to market fluctuations and will depend on a
              number of factors, including geography and loan characteristics.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}