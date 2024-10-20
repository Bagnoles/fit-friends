import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getReviews, getWorkouts } from '../../store/workout/workout-selectors';
import NotFound from '../not-found/not-found';
import ReviewsBlock from './reviews-block/reviews-block';
import { WORKOUT_TYPES_NAME } from '../../types/workout-type.enum';
import { TIME_INTERVALS } from '../../types/time.enum';
import { Gender } from '../../types/gender.enum';
import { useEffect, useState } from 'react';
import { fetchUserBalance, fetchWorkoutReviews } from '../../store/api-actions';
import PopupReview from '../../components/popup-review/popup-review';
import PopupBuy from '../../components/popup-buy/popup-buy';
import { getBalance } from '../../store/balance/balance-selectors';
import { getAverageRating } from '../../utils';
import { getUserInfo } from '../../store/user/user-selectors';

function Workout():JSX.Element {
  const { id } = useParams();
  const workout = useAppSelector(getWorkouts).find((item) => item.id === id);
  const userBalance = useAppSelector(getBalance);
  const userInfo = useAppSelector(getUserInfo);

  if (!workout) {
    return <NotFound />;
  }

  const {calories, coach, description, duration, gender, name, price, type, videoUrl} = workout;
  const dispatch = useAppDispatch();
  const [showReviewPopup, setShowReviewPopup] = useState<boolean>(false);
  const [showBuyPopup, setShowBuyPopup] = useState<boolean>(false);

  const workoutRating = getAverageRating(workout);
  const isWorkoutInBalance = !!userBalance.find((item) => item.workout?.id === workout.id);

  useEffect(() => {
    if (id && userInfo) {
      dispatch(fetchWorkoutReviews(id));
      dispatch(fetchUserBalance(userInfo.id));
    }
  }, []);

  const reviews = useAppSelector(getReviews);

  const handleOpenReviewPopup = () => {
    setShowReviewPopup(true);
    document.body.style.overflow = 'hidden';
  }
  const handleCloseReviewPopup = () => {
    setShowReviewPopup(false);
    document.body.style.overflow = '';
  }
  const handleOpenBuyPopup = () => {
    setShowBuyPopup(true);
    document.body.style.overflow = 'hidden';
  }
  const handleCloseBuyPopup = () => {
    setShowBuyPopup(false);
    document.body.style.overflow = '';
  }

  const handleWorkoutStart = () => {

  }
  const handleWorkoutEnd = () => {

  }

  return (
    <div className="wrapper">
      <Header activePage='main' />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <ReviewsBlock reviews={reviews} onAddReviewClick={handleOpenReviewPopup} isReviewDisabled={!isWorkoutInBalance} />
              <div className="training-card">
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <picture>
                          <source type="image/webp" srcSet="img/content/avatars/coaches//photo-1.webp, img/content/avatars/coaches//photo-1@2x.webp 2x" /><img src="img/content/avatars/coaches//photo-1.png" srcSet="img/content/avatars/coaches//photo-1@2x.png 2x" width="64" height="64" alt="Изображение тренера" />
                        </picture>
                      </div>
                      <div className="training-info__coach-info"><span className="training-info__label">Тренер</span><span className="training-info__name">{coach}</span></div>
                    </div>
                  </div>
                  <div className="training-info__main-content">
                    <form action="#" method="get">
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div className="training-info__input training-info__input--training">
                            <label><span className="training-info__label">Название тренировки</span>
                              <input type="text" name="training" value={name} disabled />
                            </label>
                            <div className="training-info__error">Обязательное поле</div>
                          </div>
                          <div className="training-info__textarea">
                            <label><span className="training-info__label">Описание тренировки</span>
                              <textarea name="description" disabled>{description}</textarea>
                            </label>
                          </div>
                        </div>
                        <div className="training-info__rating-wrapper">
                          <div className="training-info__input training-info__input--rating">
                            <label><span className="training-info__label">Рейтинг</span><span className="training-info__rating-icon">
                                <svg width="18" height="18" aria-hidden="true">
                                  <use xlinkHref="#icon-star"></use>
                                </svg></span>
                              <input type="number" name="rating" value={workoutRating} disabled />
                            </label>
                          </div>
                          <ul className="training-info__list">
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{WORKOUT_TYPES_NAME[type].toLowerCase()}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{gender === Gender.Whatever ? 'для_всех' : gender === Gender.Female ? 'для_женщин' : 'для_мужчин'}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{calories}ккал</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{TIME_INTERVALS[duration]}ут</span></div>
                            </li>
                          </ul>
                        </div>
                        <div className="training-info__price-wrapper">
                          <div className="training-info__input training-info__input--price">
                            <label><span className="training-info__label">Стоимость</span>
                              <input type="text" name="price" value={`${price} ₽`} disabled />
                            </label>
                            <div className="training-info__error">Введите число</div>
                          </div>
                          <button className="btn training-info__buy" type="button" onClick={handleOpenBuyPopup} disabled={isWorkoutInBalance}>Купить</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="training-video">
                  <h2 className="training-video__title">Видео</h2>
                  <div className="training-video__video">
                    <div className="training-video__thumbnail">
                      <picture>
                        <source type="image/webp" srcSet={videoUrl} /><img src={videoUrl} srcSet={videoUrl} width="922" height="566" alt="Обложка видео" />
                      </picture>
                    </div>
                    <button className="training-video__play-button btn-reset" disabled={!isWorkoutInBalance}>
                      <svg width="18" height="30" aria-hidden="true">
                        <use xlinkHref="#icon-arrow"></use>
                      </svg>
                    </button>
                  </div>
                  <div className="training-video__buttons-wrapper">
                    <button
                      className="btn training-video__button training-video__button--start"
                      type="button"
                      disabled={!isWorkoutInBalance}
                      onClick={handleWorkoutStart}
                    >Приступить</button>
                    <button
                      className="btn training-video__button training-video__button--stop"
                      type="button"
                      onClick={handleWorkoutEnd}
                    >Закончить</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {showReviewPopup && <PopupReview onPopupClose={handleCloseReviewPopup} workoutId={id} />}
        {showBuyPopup && <PopupBuy onPopupClose={handleCloseBuyPopup} workout={workout} />}
      </main>
    </div>
  );
}

export default Workout;
