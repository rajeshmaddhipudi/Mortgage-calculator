import React, { useState, useCallback } from 'react';
import { Calculator, Euro } from 'lucide-react';

function App() {
  const [principal, setPrincipal] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(3.9);
  const [amortizationRate, setAmortizationRate] = useState<number>(1.5);
  const [years, setYears] = useState<number>(10);

  const calculateMortgage = useCallback(() => {
    // Annual calculations
    const annualAmortization = principal * (amortizationRate / 100);
    const annualInterest = principal * (interestRate / 100);
    
    // Monthly payments
    const monthlyAmortization = annualAmortization / 12;
    const monthlyInterest = annualInterest / 12;
    const monthlyPayment = monthlyAmortization + monthlyInterest;
    
    // After term calculations
    const totalAmortization = annualAmortization * years;
    const balloonPayment = principal - totalAmortization;

    return {
      monthlyPayment,
      monthlyAmortization,
      monthlyInterest,
      totalAmortization,
      balloonPayment,
    };
  }, [principal, interestRate, amortizationRate, years]);

  const results = calculateMortgage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">German Mortgage Calculator</h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Loan Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Principal Amount (€)
                    </label>
                    <div className="relative">
                      
                      <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                        className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interest Rate (% per year)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amortization Rate (% per year)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={amortizationRate}
                      onChange={(e) => setAmortizationRate(Number(e.target.value))}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Term (years)
                    </label>
                    <input
                      type="number"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Summary</h2>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-600 font-medium">Monthly Payment</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {results.monthlyPayment.toFixed(2)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">Monthly Amortization</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {results.monthlyAmortization.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">Monthly Interest</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {results.monthlyInterest.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">Total debt filled After {years} </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {results.totalAmortization.toFixed(2)}
                      </p>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <p className="text-sm text-amber-600 font-medium">Remaining Principle Amount</p>
                      <p className="text-xl font-bold text-amber-700">
                        {results.balloonPayment.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </div>
      <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal Information</h3>
                <p className="text-sm mb-2">© 2024 German Mortgage Calculator</p>
                <p className="text-sm mb-2">Operated by: Maddhipudi</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-sm mb-2">Düsseldorf, Germany</p>
                <p className="text-sm mb-2">Email: rajeshmaddhipudi@gmail.com</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 text-sm">
              <p className="mb-2">
                Responsible for content according to § 55 Abs. 2 RStV: Rajesh Maddhipudi
              </p>
              <p>
                This website is for informational purposes only. The calculator results are estimates and 
                do not constitute financial advice. For accurate mortgage planning, please consult with 
                qualified financial advisors.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;