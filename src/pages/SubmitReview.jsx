import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Card from '../components/UI/Card'
import ReviewForm from '../components/Review/ReviewForm'
import Button from '../components/UI/Button'

const SubmitReview = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { allBusinesses, addReview, user } = useApp()

  const business = allBusinesses.find(b => b.id === id)

  if (!business) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business not found</h2>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    )
  }

  const handleSubmit = (reviewData) => {
    addReview({
      ...reviewData,
      userId: user.id,
      userName: user.name
    })
    navigate(`/business/${id}`, { state: { message: 'Review submitted successfully! It will be published after admin approval.' } })
  }

  const handleCancel = () => {
    navigate(`/business/${id}`)
  }

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => navigate(`/business/${id}`)}
        className="mb-4"
      >
        ← Back to Business
      </Button>

      <Card>
        <ReviewForm
          business={business}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Card>
    </div>
  )
}

export default SubmitReview