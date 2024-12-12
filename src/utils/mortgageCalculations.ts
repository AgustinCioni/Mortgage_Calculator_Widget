export const calculateMonthlyPayment = (
  principal: number,
  annualRate: number,
  years: number
): number => {
  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = years * 12;
  
  return (
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
};

export const calculatePMI = (homePrice: number, downPayment: number): number => {
  const ltv = ((homePrice - downPayment) / homePrice) * 100;
  if (ltv < 80) return 0;
  
  // Approximate PMI calculation (actual rates vary by lender)
  const annualPMIRate = ltv > 95 ? 1.5 : ltv > 90 ? 1.0 : 0.5;
  return (homePrice * (annualPMIRate / 100)) / 12;
};

export const calculateAffordability = (
  annualIncome: number,
  monthlyDebts: number,
  creditScore: number,
  downPayment: number
): number => {
  // Using the 28/36 rule
  const maxMonthlyPayment = Math.min(
    (annualIncome / 12) * 0.28,
    (annualIncome / 12) * 0.36 - monthlyDebts
  );
  
  // Approximate interest rate based on credit score
  const baseRate = creditScore > 740 ? 6.5 : 
                  creditScore > 700 ? 6.8 :
                  creditScore > 660 ? 7.2 : 7.8;
  
  // Calculate maximum home price
  const years = 30;
  const monthlyRate = baseRate / 12 / 100;
  const numberOfPayments = years * 12;
  
  const maxLoanAmount = maxMonthlyPayment * 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1) /
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
  
  return maxLoanAmount + downPayment;
};