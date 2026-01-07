import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>🎴 Virtual Card Shop</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/cards">Cards</a></li>
              <li><a href="/trade">Trade</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <section>
      <h2>Welcome to Virtual Card Shop</h2>
      <p>Collect, trade, and manage your virtual trading card collection.</p>
      <button>Get Started</button>
    </section>
  )
}

export default App
