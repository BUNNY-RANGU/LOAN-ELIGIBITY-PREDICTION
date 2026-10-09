import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ShapChart from './ShapChart';

const ResultCard = ({ result, onReset }) => {
  const isApproved = result.eligible;
  const confidence = (result.confidence * 100).toFixed(1);
  const applicationId = Math.floor(Math.random()*10000);

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/download-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result, id: applicationId }),
      });
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Loan_Report_LN-${applicationId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
      alert('Failed to generate PDF. Please check if the backend is running.');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Status Panel */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`lg:col-span-2 glass-card rounded-[3rem] p-12 overflow-hidden relative border-t-2 ${isApproved ? 'border-emerald-500/50 shadow-emerald-500/10' : 'border-rose-500/50 shadow-rose-500/10'}`}
        >
            {/* Animated accent gradient */}
            <div className={`absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20 ${isApproved ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
            
            <div className="relative z-10 space-y-12">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <p className="text-xs font-black tracking-[0.3em] text-slate-500 uppercase">Analysis Complete</p>
                        <h2 className="text-4xl font-black text-white">Application Record <span className="text-slate-700">#LN-{applicationId}</span></h2>
                    </div>
                    <div className={`px-8 py-4 rounded-3xl font-black text-xl tracking-tighter shadow-2xl ${isApproved ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                        {isApproved ? 'APPROVED' : 'REJECTED'}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 shadow-inner">
                         <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-2">Confidence Level</p>
                         <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black text-white tracking-tighter">{confidence}%</span>
                            <span className="text-xs font-bold text-slate-500 uppercase">Accuracy</span>
                         </div>
                      </div>
                      <div className="space-y-4">
                         <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">AI Suggestions</h3>
                         <div className="space-y-2">
                            {result.suggestions && result.suggestions.length > 0 ? (
                                result.suggestions.map((s, i) => (
                                    <div key={i} className="flex gap-4 items-center p-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-medium text-slate-300">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></span>
                                        {s}
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/10 text-emerald-400 text-sm font-bold flex gap-4 items-center">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">✓</div>
                                    Profile meets all premium criteria.
                                </div>
                            )}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Neural Explanation (SHAP)</h3>
                      <div className="h-[280px] w-full rounded-[2rem] bg-slate-950/50 p-6 border border-white/5">
                         <ShapChart shapData={result.shap_values} dark={true} />
                      </div>
                   </div>
                </div>
            </div>
        </motion.div>

        {/* Side Actions/Stats */}
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
           className="space-y-6 flex flex-col justify-between"
        >
            <div className="glass-card rounded-[2.5rem] p-8 space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-3xl shadow-2xl shadow-blue-600/30">📄</div>
                <h4 className="text-xl font-black text-white leading-tight">Generate Official <br/>AI Certificate</h4>
                <p className="text-sm text-slate-500 font-medium">Download your cryptographic record of this prediction to share with financial providers.</p>
                <button 
                    onClick={handleDownload}
                    className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl"
                >
                    Download PDF
                </button>
            </div>

            <button 
                onClick={onReset}
                className="w-full py-6 rounded-[2rem] border-2 border-slate-800 text-slate-400 font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-slate-900 hover:border-white transition-all shadow-2xl"
            >
                New Analysis
            </button>
        </motion.div>

      </div>

    </div>
  );
};

export default ResultCard;
