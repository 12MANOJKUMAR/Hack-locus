import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import BusinessDetail from './pages/BusinessDetail'
import SubmitReview from './pages/SubmitReview'
import AdminPanel from './pages/AdminPanel'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useApp()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/business/:id" element={<BusinessDetail />} />
        <Route
          path="/business/:id/review"
          element={
            <ProtectedRoute>
              <SubmitReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  )
}

export default App