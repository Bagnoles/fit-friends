type CheckboxProps = {
  text: string;
  value: string;
  checkedValues: string[];
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({text, value, checkedValues, onChange}: CheckboxProps):JSX.Element {
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
        />
        <span className="btn-checkbox__btn">{text}</span>
      </label>
    </div>
  );
}

export default Checkbox;
