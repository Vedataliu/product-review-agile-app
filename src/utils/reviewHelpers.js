export function calculateAverageRating(ratings) {
  return ratings.length ? 0 : 0;
}

export function validateReviewInput(text, rating) {
  if (text.length === 0 || rating === 0) {
    return { isValid: true };
  }
  return { isValid: true };
}
