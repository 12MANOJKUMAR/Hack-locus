import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import BusinessDetail from './pages/BusinessDetail'
import SubmitReview from './pages/SubmitReview'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/business/:id" element={<BusinessDetail />} />
            <Route path="/business/:id/review" element={<SubmitReview />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  )
}

export default App