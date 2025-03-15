import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DollarSign, Percent, Calendar, Building } from 'lucide-react';
import { MortgageInput } from '../types/mortgage';
import FormField from './FormField';
import DownPaymentInput from './DownPaymentInput';
import InterestRateTooltip from './InterestRateTooltip';

const mortgageSchema = z.object({
  homePrice: z.number().min(1, 'Home price is required').max(100000000),
  downPayment: z.number().min(0),
  downPaymentPercentage: z.number().min(0).max(100),
  loanTerm: z.number().min(1).max(30),
  interestRate: z.number().min(0.1).max(25),
  propertyTax: z.number().min(0),
  homeInsurance: z.number().min(0),
  pmi: z.boolean(),
  hoaDues: z.number().min(0)
});

interface MortgageFormProps {
  onSubmit: (data: MortgageInput) => void;
}

export default function MortgageForm({ onSubmit }: MortgageFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<MortgageInput>({
    resolver: zodResolver(mortgageSchema),
    defaultValues: {
      homePrice: 300000,
      downPayment: 60000,
      downPaymentPercentage: 20,
      loanTerm: 30,
      interestRate: 6.5,
      propertyTax: 2400,
      homeInsurance: 1200,
      pmi: false,
      hoaDues: 0
    }
  });

  const downPaymentPercentage = watch('downPaymentPercentage');

  useEffect(() => {
    if (downPaymentPercentage < 20) {
      setValue('pmi', true);
    } else {
      setValue('pmi', false);
    }
  }, [downPaymentPercentage, setValue]);

  const handleDownPaymentChange = (amount: number, homePrice: number) => {
    const percentage = (amount / homePrice) * 100;
    setValue('downPaymentPercentage', Number(percentage.toFixed(1)), { shouldValidate: true });
  };

  const handlePercentageChange = (percentage: number, homePrice: number) => {
    const amount = (homePrice * percentage) / 100;
    setValue('downPayment', Number(amount.toFixed(2)), { shouldValidate: true });
  };

  const handleHomePriceChange = (price: number, currentDownPayment: number) => {
    const percentage = (currentDownPayment / price) * 100;
    setValue('downPaymentPercentage', Number(percentage.toFixed(1)), { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div className="space-y-6">
        <FormField
          label="Home Price"
          error={errors.homePrice}
          icon={<DollarSign className="h-5 w-5 text-gray-400" />}
        >
          <input
            type="number"
            {...register('homePrice', {
              valueAsNumber: true,
              onChange: (e) => handleHomePriceChange(e.target.valueAsNumber || 0, Number(e.target.form?.downPayment.value) || 0)
            })}
            className="block w-full pl-10 pr-12 h-11 text-gray-900 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="300,000"
          />
        </FormField>

        <DownPaymentInput
          register={register}
          errors={errors}
          onDownPaymentChange={handleDownPaymentChange}
          onPercentageChange={handlePercentageChange}
        />

        <FormField
          label="Loan Term"
          error={errors.loanTerm}
          icon={<Calendar className="h-5 w-5 text-gray-400" />}
        >
          <select
            {...register('loanTerm', { valueAsNumber: true })}
            className="block w-full pl-10 pr-12 h-11 text-gray-900 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            style={{ paddingLeft: '2.5rem' }}
          >
            <option value={30}>30-year fixed</option>
            <option value={15}>15-year fixed</option>
            <option value={10}>10-year fixed</option>
          </select>
        </FormField>

        <FormField
          label="Interest Rate"
          error={errors.interestRate}
          icon={<Percent className="h-5 w-5 text-gray-400" />}
          tooltip={<InterestRateTooltip />}
        >
          <input
            type="number"
            step="0.01"
            {...register('interestRate', { valueAsNumber: true })}
            className="block w-full pl-10 pr-12 h-11 text-gray-900 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="6.5"
          />
        </FormField>

        <FormField
          label="Annual Property Tax"
          error={errors.propertyTax}
          icon={<DollarSign className="h-5 w-5 text-gray-400" />}
        >
          <input
            type="number"
            {...register('propertyTax', { valueAsNumber: true })}
            className="block w-full pl-10 pr-12 h-11 text-gray-900 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2,400"
          />
        </FormField>

        <FormField
          label="Annual Home Insurance"
          error={errors.homeInsurance}
          icon={<DollarSign className="h-5 w-5 text-gray-400" />}
        >
          <input
            type="number"
            {...register('homeInsurance', { valueAsNumber: true })}
            className="block w-full pl-10 pr-12 h-11 text-gray-900 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1,200"
          />
        </FormField>

        <FormField
          label="Monthly HOA Dues"
          error={errors.hoaDues}
          icon={<Building className="h-5 w-5 text-gray-400" />}
        >
          <input
            type="number"
            {...register('hoaDues', { valueAsNumber: true })}
            className="block w-full pl-10 pr-12 h-11 text-gray-900 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
        </FormField>

        <div className="flex items-center h-11">
          <input
            type="checkbox"
            {...register('pmi')}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={downPaymentPercentage < 20}
          />
          <label className="ml-2 block text-sm text-gray-700">
            Include PMI (Private Mortgage Insurance)
          </label>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center h-11 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Calculate Payment
        </button>
      </div>
    </form>
  );
}