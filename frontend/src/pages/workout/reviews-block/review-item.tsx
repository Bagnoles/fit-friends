import { Review } from '../../../types/review.type';

type ReviewItemProps = {
  review: Review;
}

function ReviewItem({review}: ReviewItemProps):JSX.Element {
  const { rating, text } = review;
  return (
    <li className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <div className="review__user-photo">
            <picture>
              <source type="image/webp" srcSet="img/content/avatars/users//photo-1.webp, img/content/avatars/users//photo-1@2x.webp 2x" /><img src="img/content/avatars/users//photo-1.png" srcSet="img/content/avatars/users//photo-1@2x.png 2x" width="64" height="64" alt="Изображение пользователя" />
            </picture>
          </div><span className="review__user-name">Никита</span>
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
