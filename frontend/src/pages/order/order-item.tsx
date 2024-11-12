import { Link } from 'react-router-dom';
import { CoachOrder } from '../../types/order.type';
import { WORKOUT_TYPES_NAME } from '../../types/workout-type.enum';
import { AppRoutes } from '../../const';

type OrderItemProps = {
  order: CoachOrder;
}

function OrderItem({order}: OrderItemProps):JSX.Element {
  const { price, imageUrl, name, type, calories, id, description } = order.workout;

  return (
    <li className="my-orders__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source type="image/webp" srcSet={imageUrl} /><img src={imageUrl} srcSet={imageUrl} width="330" height="190" alt={name} />
            </picture>
          </div>
          <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">{price}</span><span>₽</span>
          </p>
          <h2 className="thumbnail-training__title">{name}</h2>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{WORKOUT_TYPES_NAME[type]}</span></div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{calories}ккал</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="thumbnail-training__rate-value">4</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{description}</p>
          </div>
          <Link className="btn-flat btn-flat--underlined thumbnail-training__button-orders" to={`${AppRoutes.Workout}/${id}`}>
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-info"></use>
            </svg><span>Подробнее</span>
          </Link>
        </div>
        <div className="thumbnail-training__total-info">
          <div className="thumbnail-training__total-info-card">
            <svg width="32" height="32" aria-hidden="true">
              <use xlinkHref="#icon-chart"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">{order.count}</p>
            <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
          </div>
          <div className="thumbnail-training__total-info-card">
            <svg width="31" height="28" aria-hidden="true">
              <use xlinkHref="#icon-wallet"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">{order.count * price}<span>₽</span></p>
            <p className="thumbnail-training__total-info-text">Общая сумма</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default OrderItem;
