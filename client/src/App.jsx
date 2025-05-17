import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CreateEventPage from './pages/CreateEventPage'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <Router>
      <div className="min-w-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-event" element={<CreateEventPage />} /> 
          {/* <Route path="/event/:id" element={<EventPage />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
