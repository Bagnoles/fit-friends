import { useSwiper } from 'swiper/react';

function SpecialSliderButtons():JSX.Element {
  const swiper = useSwiper();

  return (
    <div className="special-for-you__controls">
      <button className="btn-icon special-for-you__control" type="button" aria-label="previous" onClick={() => swiper.slidePrev()}>
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg>
      </button>
      <button className="btn-icon special-for-you__control" type="button" aria-label="next" onClick={() => swiper.slideNext()}>
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#arrow-right"></use>
        </svg>
      </button>
    </div>
);
}

export default SpecialSliderButtons;
