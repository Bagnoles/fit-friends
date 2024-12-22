import WorkoutCard from '../../../components/workout-card/workout-card';
import { Workout } from '../../../types/workout.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import WorkoutSliderButtons from './workout-slider-buttons';

type WorkoutsBlockProps = {
  workouts: Workout[];
}

function WorkoutsBlock({workouts}: WorkoutsBlockProps):JSX.Element {

  return (
    <div className="user-card-coach__training">
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
      >
      <div className="user-card-coach__training-head" slot='container-start'>
        <h2 className="user-card-coach__training-title">Тренировки</h2>
        <WorkoutSliderButtons />
      </div>
      <ul className="user-card-coach__training-list">
        {workouts.map((item) => <SwiperSlide key={item.id}><WorkoutCard className='user-card-coach__training-item' workout={item} /></SwiperSlide>)}
      </ul>
      </Swiper>
    </div>
  );
}

export default WorkoutsBlock;
