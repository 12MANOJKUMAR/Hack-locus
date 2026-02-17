import { useState } from 'react'
import Button from '../UI/Button'
import Textarea from '../UI/Textarea'
import RatingCriteria from './RatingCriteria'

const ReviewForm = ({ business, onSubmit, onCancel }) => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState({ quality: 0, service: 0, value: 0, overall: 0 })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    
    if (rating.quality === 0 || rating.service === 0 || rating.value === 0) {
      newErrors.rating = 'Please rate all criteria'
    }
    
    if (comment.trim().length < 10) {
      newErrors.comment = 'Comment must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    onSubmit({
      businessId: business.id,
      rating,
      comment: comment.trim()
    })

    // Reset form
    setComment('')
    setRating({ quality: 0, service: 0, value: 0, overall: 0 })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Review: {business.name}
        </h3>
        <p className="text-sm text-gray-600">{business.location}</p>
      </div>

      <div>
        <RatingCriteria onRatingChange={setRating} />
        {errors.rating && (
          <p className="mt-2 text-sm text-red-600">{errors.rating}</p>
        )}
      </div>

      <div>
        <Textarea
          label="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this business..."
          rows={6}
          error={errors.comment}
        />
      </div>

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          Submit Review
        </Button>
      </div>
    </form>
  )
}

export default ReviewForm