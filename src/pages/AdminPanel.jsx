import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Card from '../components/UI/Card'
import ReviewCard from '../components/Review/ReviewCard'
import Button from '../components/UI/Button'
import { useNavigate } from 'react-router-dom'

const AdminPanel = () => {
  const { getPendingReviews, updateReviewStatus, allBusinesses } = useApp()
  const navigate = useNavigate()
  const pendingReviews = getPendingReviews()

  const handleApprove = (reviewId) => {
    updateReviewStatus(reviewId, 'approved')
  }

  const handleReject = (reviewId) => {
    updateReviewStatus(reviewId, 'rejected')
  }

  const getBusinessName = (businessId) => {
    const business = allBusinesses.find(b => b.id === businessId)
    return business?.name || 'Unknown Business'
  }

  if (pendingReviews.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage and moderate reviews</p>
        </div>
        <Card>
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">All caught up!</h3>
            <p className="mt-1 text-sm text-gray-500">
              There are no pending reviews to moderate.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">
          {pendingReviews.length} review{pendingReviews.length !== 1 ? 's' : ''} pending approval
        </p>
      </div>

      <div className="space-y-6">
        {pendingReviews.map((review) => (
          <Card key={review.id}>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Review for: {getBusinessName(review.businessId)}
                </h3>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`/business/${review.businessId}`)}
                >
                  View Business
                </Button>
              </div>
            </div>
            <ReviewCard review={review} showStatus />
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
              <Button
                variant="success"
                onClick={() => handleApprove(review.id)}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                onClick={() => handleReject(review.id)}
              >
                Reject
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminPanel