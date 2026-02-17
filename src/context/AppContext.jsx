import { createContext, useContext, useState, useMemo } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

// Mock data
const mockBusinesses = [
  {
    id: '1',
    name: 'The Gourmet Kitchen',
    category: 'restaurant',
    location: 'New York, NY',
    description: 'Fine dining restaurant serving contemporary American cuisine with a focus on locally sourced ingredients.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    averageRating: 4.5,
    totalReviews: 127,
    createdAt: '2023-01-15'
  },
  {
    id: '2',
    name: 'Tech Repair Pro',
    category: 'service',
    location: 'San Francisco, CA',
    description: 'Professional electronics repair service for phones, laptops, and tablets.',
    imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800',
    averageRating: 4.8,
    totalReviews: 89,
    createdAt: '2023-02-20'
  },
  {
    id: '3',
    name: 'Boutique Fashion Store',
    category: 'shop',
    location: 'Los Angeles, CA',
    description: 'Trendy clothing and accessories for the modern fashionista.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    averageRating: 4.2,
    totalReviews: 203,
    createdAt: '2023-03-10'
  },
  {
    id: '4',
    name: 'Cinema Complex',
    category: 'entertainment',
    location: 'Chicago, IL',
    description: 'State-of-the-art movie theater with IMAX and premium seating.',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    averageRating: 4.6,
    totalReviews: 156,
    createdAt: '2023-01-25'
  },
  {
    id: '5',
    name: 'Wellness Medical Center',
    category: 'healthcare',
    location: 'Boston, MA',
    description: 'Comprehensive healthcare services with experienced medical professionals.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
    averageRating: 4.7,
    totalReviews: 94,
    createdAt: '2023-02-05'
  },
  {
    id: '6',
    name: 'Pizza Paradise',
    category: 'restaurant',
    location: 'Miami, FL',
    description: 'Authentic Italian pizza and pasta in a cozy atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    averageRating: 4.4,
    totalReviews: 178,
    createdAt: '2023-03-15'
  }
]

const mockReviews = [
  {
    id: 'r1',
    businessId: '1',
    userId: 'u1',
    userName: 'John Doe',
    rating: { quality: 5, service: 4, value: 4, overall: 4.5 },
    comment: 'Excellent food and great atmosphere! The staff was very attentive.',
    status: 'approved',
    createdAt: '2024-01-10'
  },
  {
    id: 'r2',
    businessId: '1',
    userId: 'u2',
    userName: 'Jane Smith',
    rating: { quality: 4, service: 5, value: 5, overall: 4.5 },
    comment: 'Amazing experience! Highly recommend the chef\'s special.',
    status: 'approved',
    createdAt: '2024-01-08'
  },
  {
    id: 'r3',
    businessId: '2',
    userId: 'u3',
    userName: 'Mike Johnson',
    rating: { quality: 5, service: 5, value: 4, overall: 4.8 },
    comment: 'Fixed my phone quickly and professionally. Great service!',
    status: 'approved',
    createdAt: '2024-01-12'
  },
  {
    id: 'r4',
    businessId: '1',
    userId: 'u4',
    userName: 'Sarah Williams',
    rating: { quality: 3, service: 3, value: 3, overall: 3.0 },
    comment: 'Food was okay but service was slow.',
    status: 'pending',
    createdAt: '2024-01-15'
  }
]

const mockUser = {
  id: 'u1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user'
}

export const AppProvider = ({ children }) => {
  const [businesses, setBusinesses] = useState(mockBusinesses)
  const [reviews, setReviews] = useState(mockReviews)
  const [user] = useState(mockUser)
  const [filters, setFilters] = useState({
    category: 'all',
    location: '',
    minRating: 0,
    searchQuery: ''
  })

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const addReview = (review) => {
    const newReview = {
      ...review,
      id: `r${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }
    setReviews(prev => [...prev, newReview])
    return newReview
  }

  const updateReviewStatus = (reviewId, status) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId ? { ...review, status } : review
      )
    )
  }

  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      const matchesCategory = filters.category === 'all' || business.category === filters.category
      const matchesLocation = !filters.location || 
        business.location.toLowerCase().includes(filters.location.toLowerCase())
      const matchesRating = business.averageRating >= filters.minRating
      const matchesSearch = !filters.searchQuery ||
        business.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        business.description.toLowerCase().includes(filters.searchQuery.toLowerCase())

      return matchesCategory && matchesLocation && matchesRating && matchesSearch
    })
  }, [businesses, filters])

  const getBusinessReviews = (businessId) => {
    return reviews.filter(review => 
      review.businessId === businessId && review.status === 'approved'
    )
  }

  const getPendingReviews = () => {
    return reviews.filter(review => review.status === 'pending')
  }

  const value = {
    businesses: filteredBusinesses,
    allBusinesses: businesses,
    reviews,
    user,
    filters,
    updateFilters,
    addReview,
    updateReviewStatus,
    getBusinessReviews,
    getPendingReviews
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}