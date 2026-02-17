import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Card from '../components/UI/Card'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import Textarea from '../components/UI/Textarea'

const Profile = () => {
  const navigate = useNavigate()
  const { user, logout, updateUserProfile } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [successMessage, setSuccessMessage] = useState('')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSave = () => {
    updateUserProfile({ name, email, bio })
    setIsEditing(false)
    setSuccessMessage('Profile updated successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleCancel = () => {
    setName(user?.name || '')
    setEmail(user?.email || '')
    setBio(user?.bio || '')
    setIsEditing(false)
    setSuccessMessage('')
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>

            {successMessage && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {successMessage}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{user.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                {isEditing ? (
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-900 py-2">{bio || 'No bio added yet'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.role === 'admin' ? 'Administrator' : 'User'}
                </span>
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button variant="primary" onClick={handleSave}>
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </Card>

          <Card className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Member since</span>
                <span className="font-medium text-gray-900">
                  {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account type</span>
                <span className="font-medium text-gray-900 capitalize">{user.role}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile