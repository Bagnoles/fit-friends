type RatingItemProps = {
  value: string;
  current: string | undefined;
  onRatingChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function RatingItem({value, current, onRatingChange}: RatingItemProps):JSX.Element {
  return (
    <li className="popup__rate-item">
      <div className="popup__rate-item-wrap">
        <label>
          <input
            type="radio"
            name="оценка тренировки"
            aria-label={`оценка ${value}.`}
            value={value}
            checked={current === value}
            onChange={onRatingChange}
          />
          <span className="popup__rate-number">{value}</span>
        </label>
      </div>
    </li>
  );
}

export default RatingItem;
