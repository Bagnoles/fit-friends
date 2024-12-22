import { useSwiper } from 'swiper/react';

function WorkoutSliderButtons():JSX.Element {
  const swiper = useSwiper();

  return (
    <div className="user-card-coach__training-bts">
      <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back" onClick={() => swiper.slidePrev()}>
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg>
      </button>
      <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next" onClick={() => swiper.slideNext()}>
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-right"></use>
        </svg>
      </button>
    </div>
);
}

export default WorkoutSliderButtons;
