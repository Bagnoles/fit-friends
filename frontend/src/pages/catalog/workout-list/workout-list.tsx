import WorkoutCard from '../../../components/workout-card/workout-card';
import { Workout } from '../../../types/workout.type';

type WorkoutListProps = {
  workouts: Workout[];
}

function WorkoutList({workouts}: WorkoutListProps):JSX.Element {
  if (workouts.length === 0) {
    return <p>Тренировок нет.</p>
  }

  return (
    <ul className="training-catalog__list">
      {workouts.map((item) => <WorkoutCard className='training-catalog__item' key={item.id} workout={item} />)}
    </ul>
  );
}

export default WorkoutList;
