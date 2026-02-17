import { useParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Card from '../components/UI/Card'
import Rating from '../components/UI/Rating'
import Button from '../components/UI/Button'
import ReviewCard from '../components/Review/ReviewCard'

const BusinessDetail = () => {
  const { id } = useParams()
  const { allBusinesses, getBusinessReviews } = useApp()

  const business = allBusinesses.find(b => b.id === id)
  const reviews = getBusinessReviews(id)

  if (!business) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business not found</h2>
        <p className="text-gray-600 mb-4">The business you're looking for doesn't exist.</p>
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    )
  }

  const categoryColors = {
    restaurant: 'bg-red-100 text-red-800',
    shop: 'bg-blue-100 text-blue-800',
    service: 'bg-green-100 text-green-800',
    entertainment: 'bg-purple-100 text-purple-800',
    healthcare: 'bg-pink-100 text-pink-800'
  }

  const categoryLabels = {
    restaurant: 'Restaurant',
    shop: 'Shop',
    service: 'Service',
    entertainment: 'Entertainment',
    healthcare: 'Healthcare'
  }

  return (
    <div>
      <Link to="/" className="text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Browse
      </Link>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {business.imageUrl && (
            <div className="w-full md:w-1/3 h-64 md:h-auto rounded-lg overflow-hidden">
              <img
                src={business.imageUrl}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {business.name}
                </h1>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${categoryColors[business.category] || 'bg-gray-100 text-gray-800'}`}>
                    {categoryLabels[business.category] || business.category}
                  </span>
                  <p className="text-gray-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {business.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Rating value={business.averageRating} showValue size="lg" />
              <span className="text-gray-600">
                Based on {business.totalReviews} reviews
              </span>
            </div>
            <p className="text-gray-700 mb-6">{business.description}</p>
            <Link to={`/business/${business.id}/review`}>
              <Button variant="primary" size="lg">
                Write a Review
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Reviews ({reviews.length})
          </h2>
        </div>
        {reviews.length === 0 ? (
          <Card>
            <p className="text-center text-gray-600 py-8">
              No reviews yet. Be the first to review this business!
            </p>
          </Card>
        ) : (
          <div>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BusinessDetail