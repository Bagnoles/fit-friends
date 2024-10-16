import { Review } from '../../../types/review.type';
import ReviewsList from './reviews-list';

type ReviewBlockProps = {
  reviews: Review[];
  onAddReviewClick: () => void;
}

function ReviewsBlock({reviews, onAddReviewClick}: ReviewBlockProps):JSX.Element {

  const handleBackButtonClick = () => {
    window.history.back();
  }

  return (
    <aside className="reviews-side-bar">
      <button className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button" onClick={handleBackButtonClick}>
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg><span>Назад</span>
      </button>
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      {reviews.length === 0 ? <p>Отзывов пока нет. Будьте первым!</p> : <ReviewsList reviews={reviews} />}
      <button className="btn btn--medium reviews-side-bar__button" type="button" onClick={onAddReviewClick} >Оставить отзыв</button>
    </aside>
  );
}

export default ReviewsBlock;
