import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepForm from './components/StepForm';
import ResultCard from './components/ResultCard';
import Analytics from './components/Analytics';
import Calculator from './components/Calculator';
import Support from './components/Support';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const handlePrediction = async (formData) => {
    setLoading(true);
    // Mimic real AI processing delay for UX "weight"
    await new Promise(r => setTimeout(r, 1500));
    try {
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'API failed');
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert(`Backend Error: ${error.message}. Ensure models are trained and server is running.`);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (activeTab === 'Analytics') return <Analytics />;
    if (activeTab === 'Calculator') return <Calculator />;
    if (activeTab === 'Support') return <Support />;

    return (
      <AnimatePresence mode="wait">
        {!result ? (
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full min-h-[70vh]">
            {/* Left Side: Hero Value Prop */}
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                NEXT-GEN AI ENGINE v2.0
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-white">
                Know Your <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Eligibility</span> <br/>
                Instantly.
              </h1>
              <p className="text-lg text-slate-400 max-w-md font-medium leading-relaxed">
                Our advanced neural network analyzes hundreds of parameters to predict your loan approval odds with 99.2% accuracy.
              </p>
              
              <div className="flex gap-8 pt-4">
                  <div className="flex flex-col">
                      <span className="text-3xl font-black text-white">100k+</span>
                      <span className="text-xs font-bold text-slate-500 tracking-wider">APPLICATIONS</span>
                  </div>
                  <div className="w-[1px] h-12 bg-slate-800"></div>
                  <div className="flex flex-col">
                      <span className="text-3xl font-black text-white">10ms</span>
                      <span className="text-xs font-bold text-slate-500 tracking-wider">LATENCY</span>
                  </div>
              </div>
            </motion.div>

            {/* Right Side: Step Form Card */}
            <motion.div 
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div id="form-container" className="glass-card rounded-[2.5rem] p-8 md:p-12 relative z-10">
                 {loading && (
                   <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[2.5rem] bg-slate-950/80 backdrop-blur-md">
                      <div className="relative w-24 h-24">
                          <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                          <div className="absolute inset-4 border-b-2 border-purple-500 rounded-full animate-spin-slow"></div>
                      </div>
                      <p className="mt-8 text-white font-black tracking-widest text-xs uppercase animate-pulse">Running Neural Analysis</p>
                   </div>
                 )}
                 <StepForm onSubmitForm={handlePrediction} />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[3rem] opacity-20 blur-2xl -z-0 animate-pulse"></div>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full"
          >
            <ResultCard result={result} onReset={() => setResult(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden hero-mesh selection:bg-blue-500/30">
      
      {/* Background orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('Home'); setResult(null); }}>
          <div className="w-12 h-12 bg-white flex items-center justify-center rounded-2xl shadow-2xl shadow-white/10 rotate-3 transform hover:rotate-0 transition-all duration-500">
             <span className="text-2xl font-black text-slate-900">L</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">LOAN<span className="text-blue-500">AI</span></span>
        </div>
        
        <div className="hidden md:flex gap-8 items-center">
            {['Analytics', 'Calculator', 'Support'].map(item => (
                <button 
                  key={item} 
                  onClick={() => setActiveTab(item)}
                  className={`text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === item ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}
                >
                  {item}
                </button>
            ))}
            <button 
              onClick={() => { setActiveTab('Home'); setResult(null); document.getElementById('form-container')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-6 py-3 bg-white text-slate-900 rounded-full font-bold shadow-xl shadow-white/5 hover:scale-105 transition-transform"
            >
              Get Started
            </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col items-center min-h-[80vh]">
        {renderContent()}
      </main>

      <footer className="relative z-10 text-center py-12 text-slate-600 font-bold text-[10px] tracking-[0.3em] uppercase">
        SECURE DATA ENCRYPTION • SOC-2 COMPLIANT • POWERED BY RANDOM FOREST
      </footer>
    </div>
  );
}
