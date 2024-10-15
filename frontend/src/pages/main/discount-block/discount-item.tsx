type DiscountItemProps = {
  isActive?: boolean;
}

function DiscountItem({isActive}: DiscountItemProps):JSX.Element {
  return (
    <li className={isActive ? 'special-offers__item is-active' : 'special-offers__item'}>
      <aside className="promo-slider">
        <div className="promo-slider__overlay"></div>
        <div className="promo-slider__image"><img src="img/content/promo-1.png" srcSet="img/content/promo-1@2x.png 2x" width="1040" height="469" alt="promo-photo" />
        </div>
        <div className="promo-slider__header">
          <h3 className="promo-slider__title">Fitball</h3>
          <div className="promo-slider__logo">
            <svg width="74" height="74" aria-hidden="true">
              <use xlinkHref="#logotype"></use>
            </svg>
          </div>
        </div><span className="promo-slider__text">Горячие предложения на тренировки на фитболе</span>
        <div className="promo-slider__bottom-container">
          <div className="promo-slider__slider-dots">
            <button className="promo-slider__slider-dot--active promo-slider__slider-dot" aria-label="первый слайд"></button>
            <button className="promo-slider__slider-dot" aria-label="второй слайд"></button>
            <button className="promo-slider__slider-dot" aria-label="третий слайд"></button>
          </div>
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">1600 ₽</p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">2000 ₽</p>
          </div>
        </div>
      </aside>
    </li>
  );
}

export default DiscountItem;
