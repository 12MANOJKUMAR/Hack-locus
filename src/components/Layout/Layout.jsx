import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const Layout = ({ children }) => {
  const location = useLocation()
  const { user } = useApp()

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">ReviewHub</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Browse
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/admin')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Admin Panel
                </Link>
              )}
              <div className="flex items-center gap-2 pl-6 border-l border-gray-300">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-sm text-gray-700">{user?.name || 'User'}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="container-custom py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container-custom py-6">
          <p className="text-center text-sm text-gray-600">
            © 2024 ReviewHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout