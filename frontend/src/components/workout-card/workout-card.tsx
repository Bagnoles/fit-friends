import { Link } from 'react-router-dom';
import { Workout } from '../../types/workout.type';
import { WORKOUT_TYPES_NAME } from '../../types/workout-type.enum';
import { AppRoutes } from '../../const';
import { getAverageRating } from '../../utils';

type WorkoutCardProps = {
  workout: Workout;
  className: string;
}

function WorkoutCard({workout, className}: WorkoutCardProps):JSX.Element {
  const { id, calories, description, imageUrl, price, name, type } = workout;
  const rating = getAverageRating(workout);

  return (
    <li className={className}>
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source type="image/webp" srcSet={imageUrl} /><img src={imageUrl} srcSet={imageUrl} width="330" height="190" alt="" />
            </picture>
          </div>
          <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">{price}</span><span>₽</span>
          </p>
          <h3 className="thumbnail-training__title">{name}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{WORKOUT_TYPES_NAME[type].toLowerCase()}</span></div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{calories}ккал</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="thumbnail-training__rate-value">{rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{description}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link className="btn btn--small thumbnail-training__button-catalog" to={`${AppRoutes.Workout}/${id}`}>Подробнее</Link>
            <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={`${AppRoutes.Workout}/${id}`}>Отзывы</Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default WorkoutCard;
