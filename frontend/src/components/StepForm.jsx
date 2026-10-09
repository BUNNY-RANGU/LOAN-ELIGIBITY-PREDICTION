import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StepForm = ({ onSubmitForm }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: 'Male', married: 'No', dependents: '0', education: 'Graduate',
    self_employed: 'No', applicant_income: 5000, coapplicant_income: 0,
    loan_amount: 150, loan_term: 360, credit_history: 1, property_area: 'Urban'
  });
  const [emi, setEmi] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: parsedValue });

    if (name === 'loan_amount' || name === 'loan_term') {
      const p = name === 'loan_amount' ? parsedValue : formData.loan_amount;
      const n = name === 'loan_term' ? parsedValue : formData.loan_term;
      if (p && n) {
        const r = 0.10 / 12;
        const eVal = (p * 1000 * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
        setEmi(eVal.toFixed(2));
      }
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const stepsLabel = ["Identity", "Wealth", "Loan"];

  return (
    <div className="space-y-10">
      <div className="flex justify-between relative px-2">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-800 -z-0"></div>
        {stepsLabel.map((l, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step > i ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' : step === i + 1 ? 'bg-white text-slate-900' : 'bg-slate-900 border border-slate-800 text-slate-500'}`}>
              {i + 1}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${step === i + 1 ? 'text-white' : 'text-slate-600'}`}>{l}</span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Gender" name="gender" dropdown={['Male', 'Female']} value={formData.gender} onChange={handleChange} />
            <InputField label="Married" name="married" dropdown={['Yes', 'No']} value={formData.married} onChange={handleChange} />
            <InputField label="Dependents" name="dependents" dropdown={['0', '1', '2', '3+']} value={formData.dependents} onChange={handleChange} />
            <InputField label="Education" name="education" dropdown={['Graduate', 'Not Graduate']} value={formData.education} onChange={handleChange} />
            <InputField label="Self Employed" name="self_employed" dropdown={['Yes', 'No']} value={formData.self_employed} onChange={handleChange} />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <InputField label="Applicant Income" name="applicant_income" type="number" value={formData.applicant_income} onChange={handleChange} />
             <InputField label="Co-Applicant" name="coapplicant_income" type="number" value={formData.coapplicant_income} onChange={handleChange} />
             <div className="md:col-span-1">
                <InputField label="Credit Standing" name="credit_history" dropdown={[{l: 'Good', v: 1}, {l: 'Bad', v: 0}]} value={formData.credit_history} onChange={handleChange} />
             </div>
             <div className="md:col-span-1">
                <InputField label="Property Area" name="property_area" dropdown={['Urban', 'Semiurban', 'Rural']} value={formData.property_area} onChange={handleChange} />
             </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Loan Principal ($k)" name="loan_amount" type="number" value={formData.loan_amount} onChange={handleChange} />
                <InputField label="Term (Months)" name="loan_term" type="number" value={formData.loan_term} onChange={handleChange} />
             </div>
             <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex justify-between items-center">
                <div>
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Monthly Projection</p>
                   <p className="text-4xl font-black text-white">${emi || '0.00'}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Est. Interest</p>
                   <p className="text-lg font-bold text-slate-300">10% fixed</p>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center pt-8 border-t border-slate-800/50">
        <button type="button" onClick={step > 1 ? prevStep : undefined} className={`text-xs font-black uppercase tracking-[0.2em] transition-opacity ${step > 1 ? 'opacity-100' : 'opacity-0 cursor-default'}`}>Back</button>
        {step < 3 ? (
          <button onClick={nextStep} className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shine-effect shadow-2xl hover:bg-blue-500 hover:text-white transition-all">Next Module</button>
        ) : (
          <button onClick={() => onSubmitForm(formData)} className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shine-effect shadow-2xl shadow-blue-500/20 hover:scale-105 transition-all">Execute Analysis</button>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = "text", dropdown, value, onChange }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-blue-500 transition-colors pl-1">{label}</label>
    {dropdown ? (
      <select name={name} value={value} onChange={onChange} className="input-3d cursor-pointer appearance-none">
        {dropdown.map((opt, i) => (
          <option key={i} value={typeof opt === 'object' ? opt.v : opt} className="bg-slate-900">{typeof opt === 'object' ? opt.l : opt}</option>
        ))}
      </select>
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} placeholder="..." className="input-3d placeholder:text-slate-700" />
    )}
  </div>
);

export default StepForm;
