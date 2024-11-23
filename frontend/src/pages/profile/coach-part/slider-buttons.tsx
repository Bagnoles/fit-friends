import { useSwiper } from 'swiper/react';

function SliderButtons():JSX.Element {
  const swiper = useSwiper();

  return (
    <div className="personal-account-coach__controls">
    <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous" onClick={() => swiper.slidePrev()}>
      <svg width="16" height="14" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg>
    </button>
    <button className="btn-icon personal-account-coach__control" type="button" aria-label="next" onClick={() => swiper.slideNext()}>
      <svg width="16" height="14" aria-hidden="true">
        <use xlinkHref="#arrow-right"></use>
      </svg>
    </button>
  </div>
);
}

export default SliderButtons;
