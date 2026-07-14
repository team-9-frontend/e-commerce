import React from 'react'

export default function ProductReviews({ reviews }) {
    if (!reviews.length) {
      return <p>No reviews yet.</p>
    }
  
    return (
      <div>
        <h2>Reviews</h2>
  
        {reviews.map((review) => (
          <div key={review._id}>
            <h3>{review.username}</h3>
  
            <p> {review.rating}/5</p>
  
            <p>{review.comment}</p>
  
            <small>
              {new Date(review.createdAt).toLocaleDateString()}
            </small>
  
            <hr />
          </div>
        ))}
      </div>
    )
  }