import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Catalog from "./pages/Catalog.jsx"
import Game from "./pages/Game.jsx"
import Contact from './pages/Contact.jsx'

function App() {
  return (
    <BrowserRouter>
      <nav className="main-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">📚 Books</Link>
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalog">Catalog</Link></li>
            <li><Link to="/game">Game</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
