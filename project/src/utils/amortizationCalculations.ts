import { YearlyData } from '../types/mortgage';

export function calculateYearlyAmortization(
  principal: number,
  annualRate: number,
  years: number
): YearlyData[] {
  const monthlyRate = annualRate / 12 / 100;
  const totalPayments = years * 12;
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);

  return Array.from({ length: years + 1 }, (_, yearIndex) => {
    let remainingBalance = principal;
    let cumulativePrincipal = 0;
    let cumulativeInterest = 0;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;

    if (yearIndex > 0) {
      for (let month = 1; month <= yearIndex * 12; month++) {
        const monthlyInterest = remainingBalance * monthlyRate;
        const monthlyPrincipal = monthlyPayment - monthlyInterest;
        
        if (month > (yearIndex - 1) * 12) {
          yearlyPrincipal += monthlyPrincipal;
          yearlyInterest += monthlyInterest;
        }
        
        cumulativeInterest += monthlyInterest;
        cumulativePrincipal += monthlyPrincipal;
        remainingBalance = Math.max(0, remainingBalance - monthlyPrincipal);
      }
    }

    return {
      year: yearIndex,
      remainingBalance,
      yearlyPrincipal,
      yearlyInterest,
      cumulativePrincipal,
      cumulativeInterest
    };
  });
}