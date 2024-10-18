import { WORKOUT_TYPES_NAME, WorkoutType } from '../../../types/workout-type.enum';

type FilterCheckboxProps = {
  name: WorkoutType;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

function FilterCheckbox({name, onChange, isChecked}: FilterCheckboxProps):JSX.Element {
  return (
    <li className="gym-catalog-form__check-list-item">
      <div className="custom-toggle custom-toggle--checkbox">
        <label>
          <input type="checkbox" value={name} name="type" checked={isChecked} onChange={onChange} />
          <span className="custom-toggle__icon">
            <svg width="9" height="6" aria-hidden="true">
              <use xlinkHref="#arrow-check"></use>
            </svg>
          </span>
          <span className="custom-toggle__label">{WORKOUT_TYPES_NAME[name]}</span>
        </label>
      </div>
    </li>
  );
}

export default FilterCheckbox;
