import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import Admin from './Admin.jsx'
import './styles.css'

// HashRouter: GitHub Pages no reescribe rutas, y el archivo único también abre sin servidor.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<App />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
