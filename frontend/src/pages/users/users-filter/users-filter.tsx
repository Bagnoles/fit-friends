import { useNavigate } from 'react-router-dom';
import { Level, LEVEL_NAMES } from '../../../types/level.enum';
import { LOCATION_NAMES, Subway } from '../../../types/subway.enum';
import { WORKOUT_TYPES_NAME, WorkoutType } from '../../../types/workout-type.enum';
import { AppRoutes } from '../../../const';
import FilterCheckbox from '../../../components/filter-checkbox/filter-checkbox';
import Radio from '../../../components/radio/radio';
import { Role } from '../../../types/role.enum';

type UsersFilterProps = {
  checkedTypes: WorkoutType[];
  onTypeChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  checkedLocations: Subway[];
  onLocationChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  checkedLevel: Level;
  onLevelChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  checkedRole: Role;
  onRoleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function UsersFilter({checkedTypes, onTypeChange, checkedLocations, onLocationChange, checkedLevel, onLevelChange, checkedRole, onRoleChange}: UsersFilterProps):JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="user-catalog-form">
      <h2 className="visually-hidden">Каталог пользователя</h2>
      <div className="user-catalog-form__wrapper">
        <button className="btn-flat btn-flat--underlined user-catalog-form__btnback" type="button" onClick={() => navigate(AppRoutes.Main)}>
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg><span>Назад</span>
        </button>
        <h3 className="user-catalog-form__title">Фильтры</h3>
        <form className="user-catalog-form__form">
          <div className="user-catalog-form__block user-catalog-form__block--location">
            <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
            <ul className="user-catalog-form__check-list">
              {Object.values(Subway).map((item) => <FilterCheckbox
                className='user-catalog-form__check-list-item'
                isChecked={checkedLocations.includes(item)}
                name={item}
                text={LOCATION_NAMES[item]}
                onChange={onLocationChange}
                key={item}
              />)}
            </ul>
            {/*<button className="btn-show-more user-catalog-form__btn-show" type="button" disabled><span>Посмотреть все</span>
              <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </button>*/}
          </div>
          <div className="user-catalog-form__block user-catalog-form__block--spezialization">
            <h4 className="user-catalog-form__block-title">Специализация</h4>
            <ul className="user-catalog-form__check-list">
              {Object.values(WorkoutType).map((item) => <FilterCheckbox
                className='user-catalog-form__check-list-item'
                isChecked={checkedTypes.includes(item)}
                name={item}
                text={WORKOUT_TYPES_NAME[item]}
                onChange={onTypeChange}
                key={item}
              />)}
            </ul>
            {/*<button className="btn-show-more user-catalog-form__btn-show" type="button"><span>Посмотреть все</span>
              <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </button>*/}
          </div>
          <div className="user-catalog-form__block user-catalog-form__block--level">
            <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
            <div className="custom-toggle-radio">
              {Object.values(Level).map((item) => <Radio
                currentValue={checkedLevel}
                name='user-level'
                onChange={onLevelChange}
                text={LEVEL_NAMES[item]}
                value={item}
                key={item}
              />)}
            </div>
          </div>
          <div className="user-catalog-form__block">
            <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
            <div className="btn-radio-sort">
              <label>
                <input type="radio" name="user-role" value={Role.Coach} checked={checkedRole === Role.Coach} onChange={onRoleChange} />
                <span className="btn-radio-sort__label">Тренеры</span>
              </label>
              <label>
                <input type="radio" name="user-role" value={Role.Customer} checked={checkedRole === Role.Customer} onChange={onRoleChange} />
                <span className="btn-radio-sort__label">Пользователи</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsersFilter;
