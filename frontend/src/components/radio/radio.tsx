type RadioProps = {
  text: string;
  value: string;
  currentValue: string;
  name: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function Radio({name, text, currentValue, value, onChange}: RadioProps):JSX.Element {
  return (
    <div className="custom-toggle-radio__block">
      <label>
        <input type="radio" name={name} value={value} checked={value === currentValue} onChange={onChange} />
        <span className="custom-toggle-radio__icon"></span>
        <span className="custom-toggle-radio__label">{text}</span>
      </label>
    </div>
  );
}

export default Radio;
