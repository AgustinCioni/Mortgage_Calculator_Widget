import React, { useState } from 'react';
import AmortizationChart from './AmortizationChart';
import AmortizationTable from './AmortizationTable';
import { calculateYearlyAmortization } from '../utils/amortizationCalculations';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const [showTable, setShowTable] = useState(false);
  const yearlyData = calculateYearlyAmortization(principal, annualRate, years);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Amortization Schedule</h2>
        <button
          onClick={() => setShowTable(!showTable)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          {showTable ? (
            <>
              Hide Details <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              View Details <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      <AmortizationChart yearlyData={yearlyData} />
      {showTable && (
        <AmortizationTable 
          yearlyData={yearlyData}
          showAllYears={showAllYears}
          onToggleView={() => setShowAllYears(!showAllYears)}
        />
      )}
    </div>
  );
}