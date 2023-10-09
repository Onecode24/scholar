import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h1 className='text-red-800'>Hello</h1>
    <App />
  </React.StrictMode>,
)
