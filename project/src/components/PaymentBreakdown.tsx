import React from 'react';
import { PaymentBreakdown as PaymentBreakdownType } from '../types/mortgage';
import PaymentChart from './PaymentChart';
import InterestBreakdown from './InterestBreakdown';

interface PaymentBreakdownProps {
  breakdown: PaymentBreakdownType;
}

export default function PaymentBreakdown({ breakdown }: PaymentBreakdownProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          ${breakdown.totalPayment.toFixed(2)}
          <span className="text-sm font-normal text-gray-500 ml-2">per month</span>
        </h2>
      </div>

      <div className="mb-6">
        <PaymentChart breakdown={breakdown} />
      </div>

      <InterestBreakdown breakdown={breakdown} />
    </div>
  );
}