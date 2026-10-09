import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Analytics = () => {
  const [accuracies, setAccuracies] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/api/models/accuracy')
      .then(res => res.json())
      .then(data => setAccuracies(data));
  }, []);

  return (
    <div className="glass-card rounded-[2rem] p-10 space-y-8">
      <h3 className="text-2xl font-black text-white">Model Performance Analytics</h3>
      <div className="space-y-4">
        {Object.entries(accuracies).map(([model, acc], i) => (
          <div key={model} className="space-y-1">
            <div className="flex justify-between text-xs font-black uppercase tracking-widest">
              <span className="text-slate-400">{model}</span>
              <span className="text-white">{Math.round(acc * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${acc * 100}%` }}
                 transition={{ duration: 1, delay: i * 0.1 }}
                 className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
               />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 italic">Benchmarks updated in real-time from backend AI engine.</p>
    </div>
  );
};

export default Analytics;
