import { useRef } from 'react';

export type SelectProps = {
  text: string;
  items: string[];
  namesObject: Record<string, string>;
  currentValue: string | null;
  handleValueChange: (value: string) => void
}

function Select({text, items, namesObject, currentValue, handleValueChange}: SelectProps):JSX.Element {
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleSelectButtonClick = () => {
    selectRef.current?.classList.add('is-open');
  }
  const handleSelectItemClick = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    selectRef.current?.classList.remove('is-open');
    handleValueChange(evt.currentTarget.dataset.value ?? '');
    selectRef.current?.classList.add('not-empty');
  }

  return (
    <div className="custom-select custom-select--not-selected" ref={selectRef}>
      <span className="custom-select__label">{text}</span>
      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" onClick={handleSelectButtonClick}>
        <span className="custom-select__text">{currentValue}</span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {items.map((item) => <li className='custom-select__item' data-value={item} key={item} onClick={handleSelectItemClick}>{namesObject[item]}</li>)}
      </ul>
    </div>
  );
}

export default Select;
