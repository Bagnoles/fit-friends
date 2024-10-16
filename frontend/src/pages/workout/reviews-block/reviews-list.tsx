import { Review } from '../../../types/review.type';
import ReviewItem from './review-item';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsList({reviews}: ReviewsListProps):JSX.Element {
  return (
    <ul className="reviews-side-bar__list">
      {reviews.map((item) => <ReviewItem review={item} key={item.id} />)}
    </ul>
  );
}

export default ReviewsList;
