import WorkoutCard from '../../../components/workout-card/workout-card';
import { Workout } from '../../../types/workout.type';
type PopularListProps = {
  workouts: Workout[];
}

function PopularList({workouts}: PopularListProps):JSX.Element {
  return (
    <ul className="popular-trainings__list">
      {workouts.map((item) => <WorkoutCard className='popular-trainings__item' key={item.id} workout={item} />)}
    </ul>
  );
}

export default PopularList;
