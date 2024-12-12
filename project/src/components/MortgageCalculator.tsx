import React, { useState, useEffect } from 'react';
import { MortgageInput, PaymentBreakdown } from '../types/mortgage';
import { calculateMonthlyPayment, calculatePMI } from '../utils/mortgageCalculations';
import MortgageForm from './MortgageForm';
import PaymentBreakdownComponent from './PaymentBreakdown';
import AmortizationSchedule from './AmortizationSchedule';

const DEFAULT_VALUES = {
  homePrice: 300000,
  downPayment: 60000,
  loanTerm: 30,
  interestRate: 6.5,
  propertyTax: 2400,
  homeInsurance: 1200,
  pmi: false,
  hoaDues: 0
};

export default function MortgageCalculator() {
  const [breakdown, setBreakdown] = useState<PaymentBreakdown | null>(null);
  const [loanDetails, setLoanDetails] = useState<{
    principal: number;
    rate: number;
    years: number;
  } | null>(null);

  const calculatePayments = (data: MortgageInput) => {
    const principal = data.homePrice - data.downPayment;
    const monthlyMortgage = calculateMonthlyPayment(
      principal,
      data.interestRate,
      data.loanTerm
    );
    
    const monthlyTax = data.propertyTax / 12;
    const monthlyInsurance = data.homeInsurance / 12;
    const monthlyPMI = data.pmi ? calculatePMI(data.homePrice, data.downPayment) : 0;
    
    setBreakdown({
      principal: monthlyMortgage - (principal * (data.interestRate / 12 / 100)),
      interest: principal * (data.interestRate / 12 / 100),
      propertyTax: monthlyTax,
      homeInsurance: monthlyInsurance,
      pmi: monthlyPMI,
      hoaDues: data.hoaDues,
      totalPayment: monthlyMortgage + monthlyTax + monthlyInsurance + monthlyPMI + data.hoaDues
    });

    setLoanDetails({
      principal,
      rate: data.interestRate,
      years: data.loanTerm
    });
  };

  // Calculate initial values on component mount
  useEffect(() => {
    calculatePayments(DEFAULT_VALUES);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <MortgageForm onSubmit={calculatePayments} />
        </div>
        <div>
          {breakdown && <PaymentBreakdownComponent breakdown={breakdown} />}
        </div>
      </div>
      
      {loanDetails && (
        <AmortizationSchedule
          principal={loanDetails.principal}
          annualRate={loanDetails.rate}
          years={loanDetails.years}
        />
      )}
    </div>
  );
}