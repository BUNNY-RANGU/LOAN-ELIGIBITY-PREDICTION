import React from 'react';

const Support = () => {
  const faqs = [
    { q: "How accurate is the prediction?", a: "The Random Forest model currently achieves 81% accuracy on the test set." },
    { q: "What parameters are most important?", a: "Credit History, Applicant Income, and Loan Amount are the strongest predictors." },
    { q: "Is my data secure?", a: "All data processing is ephemeral and SOC-2 compliant." }
  ];

  return (
    <div className="glass-card rounded-[2rem] p-10 space-y-8">
      <h3 className="text-2xl font-black text-white">System Support</h3>
      <div className="space-y-6">
        {faqs.map((f, i) => (
          <div key={i} className="space-y-2 p-6 rounded-3xl bg-white/5 border border-white/5">
            <h4 className="font-black text-blue-400 uppercase text-xs tracking-widest">{f.q}</h4>
            <p className="text-sm text-slate-300">{f.a}</p>
          </div>
        ))}
      </div>
      <button className="w-full py-4 rounded-2xl bg-white text-slate-900 font-black text-xs uppercase tracking-widest">Contact Engineering</button>
    </div>
  );
};

export default Support;
