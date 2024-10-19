import { useAppSelector } from '../../../store/hooks';
import { getWorkouts } from '../../../store/workout/workout-selectors';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SpecialItem from './special-item';
import SpecialSliderButtons from './special-slider-buttons';

function SpecialBlock():JSX.Element {
  const workouts = useAppSelector(getWorkouts);

  return (
    <div className="special-for-you__wrapper">
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
      >
      <div className="special-for-you__title-wrapper" slot='container-start'>
        <h2 className="special-for-you__title">Специально подобрано для вас</h2>
        <SpecialSliderButtons />
      </div>
      {workouts.slice(0,9).map((item) => <SwiperSlide key={item.id}><SpecialItem key={item.id} workout={item} /></SwiperSlide>)}
      </Swiper>
    </div>
  );
}

export default SpecialBlock;
