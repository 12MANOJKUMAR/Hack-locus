import { Link } from 'react-router-dom'
import Card from '../UI/Card'
import Rating from '../UI/Rating'

const BusinessCard = ({ business }) => {
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
    <Link to={`/business/${business.id}`}>
      <Card hover className="h-full">
        <div className="flex flex-col h-full">
          {business.imageUrl && (
            <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
              <img
                src={business.imageUrl}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                {business.name}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ml-2 flex-shrink-0 ${categoryColors[business.category] || 'bg-gray-100 text-gray-800'}`}>
                {categoryLabels[business.category] || business.category}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {business.location}
            </p>
            <p className="text-sm text-gray-700 mb-4 line-clamp-2 flex-1">
              {business.description}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Rating value={business.averageRating} showValue size="sm" />
                <span className="text-sm text-gray-600">
                  ({business.totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default BusinessCard