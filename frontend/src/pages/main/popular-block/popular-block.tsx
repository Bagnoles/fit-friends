import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { getWorkouts } from '../../../store/workout/workout-selectors';
import { AppRoutes } from '../../../const';
import PopularSliderButtons from './popular-slider-buttons';
import WorkoutCard from '../../../components/workout-card/workout-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { getAverageRating } from '../../../utils';

function PopularBlock():JSX.Element {
  const navigate = useNavigate();
  const workouts = useAppSelector(getWorkouts);

  const handleWorkoutsButtonClick = () => {
    navigate(AppRoutes.Workout);
  }

  return (
    <div className="popular-trainings__wrapper">
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
      >
      <div className="popular-trainings__title-wrapper" slot='container-start'>
        <h2 className="popular-trainings__title">Популярные тренировки</h2>
        <button className="btn-flat popular-trainings__button" type="button" onClick={handleWorkoutsButtonClick}><span>Смотреть все</span>
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </button>
        <PopularSliderButtons />
      </div>
      {workouts
        .slice()
        .sort((first, second) => getAverageRating(second) - getAverageRating(first))
        .map((item) => <SwiperSlide key={item.id}><WorkoutCard className='popular-trainings__item' key={item.id} workout={item} /></SwiperSlide>)
      }
      </Swiper>
    </div>
  );
}

export default PopularBlock;
