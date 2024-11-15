import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getReviews, getWorkouts } from '../../store/workout/workout-selectors';
import NotFound from '../not-found/not-found';
import ReviewsBlock from './reviews-block/reviews-block';
import { useEffect, useState } from 'react';
import { fetchUserBalance, fetchWorkoutReviews } from '../../store/api-actions';
import PopupReview from '../../components/popup-review/popup-review';
import PopupBuy from '../../components/popup-buy/popup-buy';
import { getBalance } from '../../store/balance/balance-selectors';
import { getUserInfo } from '../../store/user/user-selectors';
import WorkoutInfo from './workout-info/workout-info';
import { Role } from '../../types/role.enum';
import WorkoutCoach from './workout-coach/workout-coach';

function Workout():JSX.Element {
  const { id } = useParams();
  const workout = useAppSelector(getWorkouts).find((item) => item.id === id);
  const userBalance = useAppSelector(getBalance);
  const userInfo = useAppSelector(getUserInfo);

  if (!workout) {
    return <NotFound />;
  }

  const dispatch = useAppDispatch();
  const [showReviewPopup, setShowReviewPopup] = useState<boolean>(false);
  const [showBuyPopup, setShowBuyPopup] = useState<boolean>(false);


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

  return (
    <div className="wrapper">
      <Header activePage='main' />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <ReviewsBlock reviews={reviews} onAddReviewClick={handleOpenReviewPopup} isReviewDisabled={!isWorkoutInBalance} />
              {userInfo?.role === Role.Customer && <WorkoutInfo workout={workout} isInBalance={isWorkoutInBalance} onOpenPopup={handleOpenBuyPopup} />}
              {userInfo?.role === Role.Coach && <WorkoutCoach workout={workout} userInfo={userInfo} />}
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
