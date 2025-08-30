import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Apply initial theme class before React mounts to avoid FOUC and ensure Tailwind 'dark' styles work.
try {
	const saved = localStorage.getItem('theme');
	if (saved === 'dark') document.documentElement.classList.add('dark');
	else if (saved === 'light') document.documentElement.classList.remove('dark');
	else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		document.documentElement.classList.add('dark');
	}
} catch (e) {
	// ignore localStorage errors
}

createRoot(document.getElementById('root')).render(<App />);
