import { useState } from 'react'
import Rating from '../UI/Rating'

const RatingCriteria = ({ onRatingChange, initialRatings = { quality: 0, service: 0, value: 0 } }) => {
  const [ratings, setRatings] = useState(initialRatings)

  const handleRatingChange = (criteria, value) => {
    const newRatings = { ...ratings, [criteria]: value }
    setRatings(newRatings)
    
    const overall = (newRatings.quality + newRatings.service + newRatings.value) / 3
    onRatingChange({ ...newRatings, overall: overall.toFixed(1) })
  }

  const StarInput = ({ criteria, label, value, onChange }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(criteria, star)}
              className="focus:outline-none"
            >
              <svg
                className={`w-8 h-8 transition-colors ${
                  star <= value
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 fill-current'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </button>
          ))}
          {value > 0 && (
            <span className="ml-2 text-sm text-gray-600">{value}/5</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <StarInput
        criteria="quality"
        label="Quality"
        value={ratings.quality}
        onChange={handleRatingChange}
      />
      <StarInput
        criteria="service"
        label="Service"
        value={ratings.service}
        onChange={handleRatingChange}
      />
      <StarInput
        criteria="value"
        label="Value"
        value={ratings.value}
        onChange={handleRatingChange}
      />
      {ratings.quality > 0 && ratings.service > 0 && ratings.value > 0 && (
        <div className="mt-4 p-3 bg-primary-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Overall Rating:</span>
            <Rating
              value={(ratings.quality + ratings.service + ratings.value) / 3}
              showValue
              size="md"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default RatingCriteria