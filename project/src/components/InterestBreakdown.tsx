import React from 'react';
import { PaymentBreakdown } from '../types/mortgage';

interface InterestBreakdownProps {
  breakdown: PaymentBreakdown;
}

export default function InterestBreakdown({ breakdown }: InterestBreakdownProps) {
  const items = [
    { 
      label: 'Principal & Interest',
      amount: breakdown.principal + breakdown.interest,
      color: 'bg-blue-600'
    },
    { 
      label: 'Property Tax',
      amount: breakdown.propertyTax,
      color: 'bg-red-500'
    },
    { 
      label: 'Insurance',
      amount: breakdown.homeInsurance,
      color: 'bg-yellow-500'
    },
    ...(breakdown.pmi > 0 ? [{
      label: 'PMI',
      amount: breakdown.pmi,
      color: 'bg-purple-500'
    }] : []),
    ...(breakdown.hoaDues > 0 ? [{
      label: 'HOA',
      amount: breakdown.hoaDues,
      color: 'bg-pink-500'
    }] : []),
  ].filter(item => item.amount > 0);

  const totalPayment = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Payment Breakdown</h3>
      <div className="space-y-4">
        {items.map((item, index) => {
          const percentage = (item.amount / totalPayment) * 100;
          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">
                  ${item.amount.toFixed(2)} ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}

        <div className="pt-4 mt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-900">Total Monthly Payment</span>
            <span className="font-semibold text-gray-900">${totalPayment.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}