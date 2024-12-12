import React, { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  error?: FieldError;
  children: ReactNode;
  icon?: ReactNode;
  tooltip?: ReactNode;
}

export default function FormField({ label, error, children, icon, tooltip }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
        {label}
        {tooltip}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            {icon}
          </div>
        )}
        {children}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}