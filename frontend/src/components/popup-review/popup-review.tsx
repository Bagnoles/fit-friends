import { useState } from 'react';
import RatingItem from './rating-item';
import { useAppDispatch } from '../../store/hooks';
import { addReview } from '../../store/api-actions';

const RATINGS = [1,2,3,4,5];

type PopupReviewProps = {
  onPopupClose: () => void;
  workoutId: string | undefined;
}

function PopupReview({onPopupClose, workoutId}: PopupReviewProps):JSX.Element {
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<string>();

  const dispatch = useAppDispatch();

  const handleTextChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(evt.target.value);
  }
  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  }
  const handleAddReview = () => {
    if (rating && workoutId) {
      dispatch(addReview({
        workoutId,
        rating: +rating,
        text
      })).then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          onPopupClose();
        }
      })
    }

  }

  return (
    <div className="popup-form popup-form--feedback">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Оставить отзыв</h2>
            <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={onPopupClose}>
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--feedback">
            <h3 className="popup__feedback-title">Оцените тренировку</h3>
            <ul className="popup__rate-list">
              {RATINGS.map((item) => <RatingItem value={item.toString()} key={item} current={rating} onRatingChange={handleRatingChange} />)}
            </ul>
            <div className="popup__feedback">
              <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
              <div className="popup__feedback-textarea">
                <div className="custom-textarea">
                  <label>
                    <textarea name="description" placeholder=" " onChange={handleTextChange}>{text}</textarea>
                  </label>
                </div>
              </div>
            </div>
            <div className="popup__button">
              <button className="btn" type="button" onClick={handleAddReview}>Продолжить</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopupReview;
