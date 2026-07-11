import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Onboarding from './Onboarding.jsx';

// /onboarding is the post-payment setup form (see src/Onboarding.jsx).
// Everything else falls through to the demo/dashboard app. vercel.json
// rewrites all paths to this same index.html, so pathname is checked
// here rather than adding a router dependency.
const isOnboarding = typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/onboarding';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isOnboarding ? <Onboarding /> : <App />}
  </React.StrictMode>
);
