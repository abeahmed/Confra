import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import LandingPage from './pages/LandingPage'
import CreateEventPage from './pages/CreateEventPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import EventPage from './pages/EventPage'
import EditEventPage from './pages/EditEventPage'
import Toast from './components/Toast'
import PageContainer from './components/PageContainer'

function AppContent() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    console.log('Location state:', location.state);
    if (location.state?.successMessage) {
      setToastMessage(location.state.successMessage);
      setShowToast(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <PageContainer>
      <Routes>
        <Route path="/" element={<div className="w-full"><LandingPage /></div>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/create-event" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/event/:id/edit" element={<ProtectedRoute><EditEventPage /></ProtectedRoute>} />
      </Routes>
      </PageContainer>
      {showToast && (
            <Toast 
                message={toastMessage}
                onClose={() => setShowToast(false)}
            />
        )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

  

export default App
