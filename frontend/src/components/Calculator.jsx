import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Calculator = () => {
  const [loan, setLoan] = useState(100000);
  const [rate, setRate] = useState(10);
  const [term, setTerm] = useState(12);

  const calculateEMI = () => {
    const r = rate / 12 / 100;
    const n = term;
    const emi = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return emi.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  return (
    <div className="glass-card rounded-[2rem] p-10 space-y-8">
      <h3 className="text-2xl font-black text-white">Standalone EMI Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500">Loan Amount ($)</label>
          <input type="number" value={loan} onChange={(e) => setLoan(e.target.value)} className="input-3d w-full" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500">Interest Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="input-3d w-full" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500">Term (Months)</label>
          <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} className="input-3d w-full" />
        </div>
      </div>
      <div className="p-8 rounded-3xl bg-blue-600/20 border border-blue-500/20 flex flex-col items-center">
        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Your Monthly Payment</p>
        <p className="text-6xl font-black text-white">${calculateEMI()}</p>
      </div>
    </div>
  );
};

export default Calculator;
