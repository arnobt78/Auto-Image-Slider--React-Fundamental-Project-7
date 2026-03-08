/**
 * Application entry point.
 * Mounts the root React component into the DOM and applies global styles.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// createRoot is the React 18 API; it replaces the legacy ReactDOM.render
// StrictMode helps surface side-effect and deprecation issues in development
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
