import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { YearlyData } from '../types/mortgage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AmortizationChartProps {
  yearlyData: YearlyData[];
}

export default function AmortizationChart({ yearlyData }: AmortizationChartProps) {
  const data = {
    labels: yearlyData.map(d => `Year ${d.year}`),
    datasets: [
      {
        label: 'Remaining Balance',
        data: yearlyData.map(d => d.remainingBalance),
        borderColor: '#0066FF',
        backgroundColor: '#0066FF20',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Principal Paid',
        data: yearlyData.map(d => d.cumulativePrincipal),
        borderColor: '#10B981',
        backgroundColor: '#10B98120',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Interest Paid',
        data: yearlyData.map(d => d.cumulativeInterest),
        borderColor: '#F87171',
        backgroundColor: '#F8717120',
        tension: 0.3,
        fill: true,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: $${context.raw.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="h-[400px] mb-6">
      <Line options={options} data={data} />
    </div>
  );
}