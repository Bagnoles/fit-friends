import { useAppSelector } from '../../../store/hooks';
import { getWorkouts } from '../../../store/workout/workout-selectors';
import SpecialList from './special-list';

function SpecialBlock():JSX.Element {
  const workouts = useAppSelector(getWorkouts);

  return (
    <div className="special-for-you__wrapper">
      <div className="special-for-you__title-wrapper">
        <h2 className="special-for-you__title">Специально подобрано для вас</h2>
        <div className="special-for-you__controls">
          <button className="btn-icon special-for-you__control" type="button" aria-label="previous">
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button className="btn-icon special-for-you__control" type="button" aria-label="next">
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <SpecialList workouts={workouts.slice(0,3)} />
    </div>
  );
}

export default SpecialBlock;
