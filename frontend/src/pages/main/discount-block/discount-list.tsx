import { useState } from 'react';
import { Workout } from '../../../types/workout.type';
import DiscountItem from './discount-item';

type DiscountListProps = {
  data: Workout[];
}

function DiscountList({data}: DiscountListProps):JSX.Element {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const handleSlideChange = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setActiveSlide(evt.currentTarget.dataset.value ? +evt.currentTarget.dataset.value : 0);
  }

  return (
    <ul className="special-offers__list">
      {data.map((item, index) => <DiscountItem workout={item} key={item.id} isActive={index === activeSlide} onPaginationClick={handleSlideChange} activeSlide={activeSlide} />)}
    </ul>
  );
}

export default DiscountList;
