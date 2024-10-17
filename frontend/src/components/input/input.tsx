
type InputProps = {
  text: string;
  type: string;
  name: string;
  value: string;
  isInterviewInput?: boolean;
  isSignInInput?: boolean;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  message?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

function Input({text, type, name, value, onChange, isInterviewInput, isSignInInput, pattern, message, required, min, max}: InputProps):JSX.Element {
  if (isInterviewInput) {
    return (
      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
        <label>
          <span className="custom-input__wrapper">
            <input type={type} name={name} value={value} onChange={onChange} required={required} min={min} max={max} title={message} />
            <span className="custom-input__text">{text}</span>
          </span>
        </label>
      </div>
    );
  }
  return (
    <div className={isSignInInput ? 'custom-input sign-in__input' : 'custom-input'}>
      <label>
        <span className="custom-input__label">{text}</span>
        <span className="custom-input__wrapper">
          <input type={type} name={name} value={value} onChange={onChange} pattern={pattern} title={message} required={required} />
        </span>
      </label>
    </div>
  );
}

export default Input;
