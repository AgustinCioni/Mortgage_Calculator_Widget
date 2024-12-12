import React, { useState } from 'react';
import AmortizationChart from './AmortizationChart';
import AmortizationTable from './AmortizationTable';
import { calculateYearlyAmortization } from '../utils/amortizationCalculations';

interface AmortizationScheduleProps {
  principal: number;
  annualRate: number;
  years: number;
}

export default function AmortizationSchedule({ 
  principal, 
  annualRate, 
  years 
}: AmortizationScheduleProps) {
  const [showAllYears, setShowAllYears] = useState(false);
  const yearlyData = calculateYearlyAmortization(principal, annualRate, years);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Amortization Schedule</h2>
      <AmortizationChart yearlyData={yearlyData} />
      <AmortizationTable 
        yearlyData={yearlyData}
        showAllYears={showAllYears}
        onToggleView={() => setShowAllYears(!showAllYears)}
      />
    </div>
  );
}