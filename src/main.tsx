import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "equilibria-engine-js/dist/style.css"
import "katex/dist/katex.min.css"
import App from './App.tsx'

// Suppress Monaco Editor's harmless "operation is manually canceled" warning in React Strict Mode
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.type === 'cancelation' && event.reason.msg === 'operation is manually canceled') {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
