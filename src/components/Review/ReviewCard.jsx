import Card from '../UI/Card'
import Rating from '../UI/Rating'

const ReviewCard = ({ review, showStatus = false }) => {
  const averageRating = (
    review.rating.quality +
    review.rating.service +
    review.rating.value
  ) / 3

  return (
    <Card className="mb-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{review.userName}</h4>
          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        {showStatus && (
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              review.status === 'approved'
                ? 'bg-green-100 text-green-800'
                : review.status === 'rejected'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {review.status}
          </span>
        )}
      </div>
      <div className="mb-3">
        <Rating value={averageRating} showValue size="sm" />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
        <div>
          <span className="text-gray-600">Quality:</span>
          <Rating value={review.rating.quality} max={5} size="sm" className="mt-1" />
        </div>
        <div>
          <span className="text-gray-600">Service:</span>
          <Rating value={review.rating.service} max={5} size="sm" className="mt-1" />
        </div>
        <div>
          <span className="text-gray-600">Value:</span>
          <Rating value={review.rating.value} max={5} size="sm" className="mt-1" />
        </div>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </Card>
  )
}

export default ReviewCard