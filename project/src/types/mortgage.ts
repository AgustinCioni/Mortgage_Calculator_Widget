export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  downPaymentPercentage: number;
  loanTerm: number;
  interestRate: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: boolean;
  hoaDues: number;
}

export interface PaymentBreakdown {
  principal: number;
  interest: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: number;
  hoaDues: number;
  totalPayment: number;
}

export interface YearlyData {
  year: number;
  remainingBalance: number;
  yearlyPrincipal: number;
  yearlyInterest: number;
  cumulativePrincipal: number;
  cumulativeInterest: number;
}

export interface AffordabilityInput {
  annualIncome: number;
  monthlyDebts: number;
  creditScore: number;
  downPayment: number;
  location: string;
}