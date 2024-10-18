import { Workout } from '../../../types/workout.type';

type DiscountItemProps = {
  isActive?: boolean;
  workout: Workout;
  onPaginationClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  activeSlide: number;
}

function DiscountItem({isActive, activeSlide, workout, onPaginationClick}: DiscountItemProps):JSX.Element {
  return (
    <li className={isActive ? 'special-offers__item is-active' : 'special-offers__item'}>
      <aside className="promo-slider">
        <div className="promo-slider__overlay"></div>
        <div className="promo-slider__image"><img src="img/content/promo-1.png" srcSet="img/content/promo-1@2x.png 2x" width="1040" height="469" alt="promo-photo" />
        </div>
        <div className="promo-slider__header">
          <h3 className="promo-slider__title">{workout.type}</h3>
          <div className="promo-slider__logo">
            <svg width="74" height="74" aria-hidden="true">
              <use xlinkHref="#logotype"></use>
            </svg>
          </div>
        </div><span className="promo-slider__text">{workout.description}</span>
        <div className="promo-slider__bottom-container">
          <div className="promo-slider__slider-dots">
            <button
              className={activeSlide === 0 ? 'promo-slider__slider-dot--active promo-slider__slider-dot' : 'promo-slider__slider-dot'}
              aria-label="первый слайд"
              onClick={onPaginationClick}
              data-value={0}
            ></button>
            <button
              className={activeSlide === 1 ? 'promo-slider__slider-dot--active promo-slider__slider-dot' : 'promo-slider__slider-dot'}
              aria-label="второй слайд"
              onClick={onPaginationClick}
              data-value={1}
            ></button>
            <button
              className={activeSlide === 2 ? 'promo-slider__slider-dot--active promo-slider__slider-dot' : 'promo-slider__slider-dot'}
              aria-label="третий слайд"
              onClick={onPaginationClick}
              data-value={2}
            ></button>
          </div>
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">{workout.price * 0.8}</p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">{workout.price}</p>
          </div>
        </div>
      </aside>
    </li>
  );
}

export default DiscountItem;
