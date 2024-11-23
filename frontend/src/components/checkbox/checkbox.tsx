type CheckboxProps = {
  text: string;
  value: string;
  checkedValues: string[];
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
}

function Checkbox({text, value, checkedValues, onChange, isDisabled}: CheckboxProps):JSX.Element {
  return (
    <div className="btn-checkbox">
      <label>
        <input
          className="visually-hidden"
          type="checkbox"
          name="specialisation"
          value={value}
          checked={checkedValues.includes(value)}
          onChange={onChange}
          disabled={isDisabled}
        />
        <span className="btn-checkbox__btn">{text}</span>
      </label>
    </div>
  );
}

export default Checkbox;
