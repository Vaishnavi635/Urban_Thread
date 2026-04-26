'use client';

import { useState } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';

export default function AccessibilityPanel() {
  const { accessMode, setAccessMode } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    { id: 'none', label: 'Default Vision', desc: 'Standard color palette' },
    { id: 'deuteranopia', label: 'Deuteranopia', desc: 'Red-Green deficiency' },
    { id: 'protanopia', label: 'Protanopia', desc: 'Red-Green deficiency' },
    { id: 'tritanopia', label: 'Tritanopia', desc: 'Blue-Yellow deficiency' },
    { id: 'high-contrast', label: 'High Contrast', desc: 'Maximum visibility' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 w-14 h-14 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-4 border-white dark:border-zinc-900"
        aria-label="Accessibility Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Accessibility</h3>
            <p className="text-xl font-bold text-zinc-900 dark:text-white">Visual Aids</p>
          </div>
          
          <div className="space-y-3">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setAccessMode(mode.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all border-2 ${
                  accessMode === mode.id 
                    ? 'border-accent bg-accent/5' 
                    : 'border-transparent hover:bg-zinc-50 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                   <span className={`text-sm font-bold ${accessMode === mode.id ? 'text-accent' : 'text-zinc-900 dark:text-white'}`}>
                     {mode.label}
                   </span>
                   {accessMode === mode.id && (
                     <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                   )}
                </div>
                <p className="text-[11px] text-zinc-500 font-medium">{mode.desc}</p>
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            className="w-full mt-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Close Panel
          </button>
        </div>
      )}
    </div>
  );
}
