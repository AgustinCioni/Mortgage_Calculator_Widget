import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { DollarSign } from 'lucide-react';
import { MortgageInput } from '../types/mortgage';
import FormField from './FormField';

interface DownPaymentInputProps {
  register: UseFormRegister<MortgageInput>;
  errors: FieldErrors<MortgageInput>;
  onDownPaymentChange: (amount: number, homePrice: number) => void;
  onPercentageChange: (percentage: number, homePrice: number) => void;
}

export default function DownPaymentInput({ 
  register, 
  errors,
  onDownPaymentChange,
  onPercentageChange 
}: DownPaymentInputProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        label="Down Payment"
        error={errors.downPayment}
        icon={<DollarSign className="h-5 w-5 text-gray-400" />}
      >
        <input
          type="number"
          {...register('downPayment', {
            valueAsNumber: true,
            onChange: (e) => onDownPaymentChange(
              e.target.valueAsNumber || 0,
              Number(e.target.form?.homePrice.value) || 0
            )
          })}
          className="block w-full pl-10 pr-12 h-11 text-gray-900 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="60,000"
        />
      </FormField>

      <FormField
        label="Down Payment %"
        error={errors.downPaymentPercentage}
      >
        <input
          type="number"
          step="0.1"
          {...register('downPaymentPercentage', {
            valueAsNumber: true,
            onChange: (e) => onPercentageChange(
              e.target.valueAsNumber || 0,
              Number(e.target.form?.homePrice.value) || 0
            )
          })}
          className="block w-full pl-3 pr-12 h-11 text-gray-900 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="20"
        />
      </FormField>
    </div>
  );
}