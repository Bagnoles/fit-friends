import { Workout } from '../../../types/workout.type';
import SpecialItem from './special-item';

type SpecialListProps = {
  workouts: Workout[];
}

function SpecialList({workouts}: SpecialListProps):JSX.Element {
  return (
    <ul className="special-for-you__list">
      {workouts.map((item) => <SpecialItem key={item.id} workout={item} />)}
    </ul>
  );
}

export default SpecialList;
