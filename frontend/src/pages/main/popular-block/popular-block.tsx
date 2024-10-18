import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { getWorkouts } from '../../../store/workout/workout-selectors';
import PopularList from './popular-list';
import { AppRoutes } from '../../../const';

function PopularBlock():JSX.Element {
  const navigate = useNavigate();
  const workouts = useAppSelector(getWorkouts);

  const handleWorkoutsButtonClick = () => {
    navigate(AppRoutes.Workout);
  }

  return (
    <div className="popular-trainings__wrapper">
      <div className="popular-trainings__title-wrapper">
        <h2 className="popular-trainings__title">Популярные тренировки</h2>
        <button className="btn-flat popular-trainings__button" type="button" onClick={handleWorkoutsButtonClick}><span>Смотреть все</span>
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </button>
        <div className="popular-trainings__controls">
          <button className="btn-icon popular-trainings__control" type="button" aria-label="previous">
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button className="btn-icon popular-trainings__control" type="button" aria-label="next">
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <PopularList workouts={workouts.slice(0,4)} />
    </div>
  );
}

export default PopularBlock;
