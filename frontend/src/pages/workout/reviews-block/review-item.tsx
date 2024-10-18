import { Review } from '../../../types/review.type';

type ReviewItemProps = {
  review: Review;
}

function ReviewItem({review}: ReviewItemProps):JSX.Element {
  const { rating, text, user } = review;

  return (
    <li className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <div className="review__user-photo">
            <picture>
              <source type="image/webp" srcSet={user.avatarUrl} /><img src={user.avatarUrl} srcSet={user.avatarUrl} width="64" height="64" alt="Изображение пользователя" />
            </picture>
          </div><span className="review__user-name">{user.name}</span>
          <div className="review__rating">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg><span>{rating}</span>
          </div>
        </div>
        <p className="review__comment">{text}</p>
      </div>
    </li>
  );
}

export default ReviewItem;
