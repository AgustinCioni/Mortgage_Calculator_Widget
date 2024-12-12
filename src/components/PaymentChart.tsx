import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { PaymentBreakdown } from '../types/mortgage';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PaymentChartProps {
  breakdown: PaymentBreakdown;
}

export default function PaymentChart({ breakdown }: PaymentChartProps) {
  const data = {
    labels: ['P & I', 'Tax', 'Insurance', 'PMI', 'HOA'],
    datasets: [
      {
        data: [
          breakdown.principal + breakdown.interest,
          breakdown.propertyTax,
          breakdown.homeInsurance,
          breakdown.pmi,
          breakdown.hoaDues,
        ],
        backgroundColor: [
          '#0066FF',
          '#F87171',
          '#FBBF24',
          '#A78BFA',
          '#F472B6',
        ],
        borderWidth: 0,
        spacing: 2,
      },
    ],
  };

  const options = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
    layout: {
      padding: 10,
    },
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <div className="relative w-48 h-48 mx-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
}