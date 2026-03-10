import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import App2 from './App2.jsx'
import App3 from './App3.jsx'

function Home() {
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, textAlign: 'center' }}>
      <h1>Beekeeping Quizzes</h1>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
        <Link to="/quiz1" style={{ fontSize: '1.2rem', padding: '12px 24px', background: '#f5c518', color: '#333', borderRadius: 8, textDecoration: 'none' }}>Quiz 1</Link>
        <Link to="/quiz2" style={{ fontSize: '1.2rem', padding: '12px 24px', background: '#f5c518', color: '#333', borderRadius: 8, textDecoration: 'none' }}>Quiz 2</Link>
        <Link to="/quiz3" style={{ fontSize: '1.2rem', padding: '12px 24px', background: '#f5c518', color: '#333', borderRadius: 8, textDecoration: 'none' }}>Quiz 3</Link>
      </nav>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz1" element={<App />} />
        <Route path="/quiz2" element={<App2 />} />
        <Route path="/quiz3" element={<App3 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
