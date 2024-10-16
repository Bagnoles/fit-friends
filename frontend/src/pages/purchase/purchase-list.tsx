import WorkoutCard from '../../components/workout-card/workout-card';
import { Balance } from '../../types/balance.type';

type PurchaseListProps = {
  data: Balance[];
}

function PurchaseList({data}: PurchaseListProps):JSX.Element {
  return (
    <ul className="my-purchases__list">
      {data.map((item) => <WorkoutCard className='my-purchases__item' workout={item.workout} key={item.workout.id} />)}
    </ul>
  );
}

export default PurchaseList;
