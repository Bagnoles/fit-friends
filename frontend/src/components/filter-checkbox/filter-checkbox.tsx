type FilterCheckboxProps = {
  name: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
  className: string;
  text: string;
}

function FilterCheckbox({name, onChange, isChecked, className, text}: FilterCheckboxProps):JSX.Element {
  return (
    <li className={className}>
      <div className="custom-toggle custom-toggle--checkbox">
        <label>
          <input type="checkbox" value={name} name="type" checked={isChecked} onChange={onChange} />
          <span className="custom-toggle__icon">
            <svg width="9" height="6" aria-hidden="true">
              <use xlinkHref="#arrow-check"></use>
            </svg>
          </span>
          <span className="custom-toggle__label">{text}</span>
        </label>
      </div>
    </li>
  );
}

export default FilterCheckbox;
