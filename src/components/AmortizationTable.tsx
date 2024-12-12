import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { YearlyData } from '../types/mortgage';

interface AmortizationTableProps {
  yearlyData: YearlyData[];
  showAllYears: boolean;
  onToggleView: () => void;
}

export default function AmortizationTable({ 
  yearlyData, 
  showAllYears, 
  onToggleView 
}: AmortizationTableProps) {
  const displayData = showAllYears ? yearlyData : yearlyData.slice(0, 8);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
              Year
            </th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase">
              Principal Paid
            </th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase">
              Interest Paid
            </th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase">
              Total Interest
            </th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase">
              Remaining Balance
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayData.map((data) => (
            <tr key={data.year}>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {data.year}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                ${data.yearlyPrincipal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                ${data.yearlyInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                ${data.cumulativeInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                ${data.remainingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onToggleView}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none"
        >
          {showAllYears ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}