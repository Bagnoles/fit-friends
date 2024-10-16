import { Link } from 'react-router-dom';
import { Workout } from '../../../types/workout.type';
import { AppRoutes } from '../../../const';

type SpecialItemProps = {
  workout: Workout;
}

function SpecialItem({workout}: SpecialItemProps):JSX.Element {
  return (
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <source type="image/webp" srcSet={workout.imageUrl} /><img src={workout.imageUrl} srcSet={workout.imageUrl} width="452" height="191" alt="" />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{workout.type}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link className="btn btn--small thumbnail-preview__button" to={`${AppRoutes.Workout}/${workout.id}`}>Подробнее</Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default SpecialItem;
