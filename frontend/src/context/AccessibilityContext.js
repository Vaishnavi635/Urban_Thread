'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [accessMode, setAccessMode] = useState('none');
  const [mounted, setMounted] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedMode = localStorage.getItem('accessMode') || 'none';
    setTheme(savedTheme);
    setAccessMode(savedMode);
    setMounted(true);
  }, []);

  // Apply settings to document
  useEffect(() => {
    if (!mounted) return;

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Clear old accessibility classes
    const accessibilityClasses = ['deuteranopia', 'protanopia', 'tritanopia', 'high-contrast'];
    document.body.classList.remove(...accessibilityClasses);
    
    if (accessMode !== 'none') {
      document.body.classList.add(accessMode);
    }

    localStorage.setItem('theme', theme);
    localStorage.setItem('accessMode', accessMode);
  }, [theme, accessMode, mounted]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // Always return the provider to ensure children can call useAccessibility()
  return (
    <AccessibilityContext.Provider value={{ theme, setTheme, accessMode, setAccessMode, toggleTheme, mounted }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
