import { useNavigate } from 'react-router-dom';
import { SortDirection } from '../../../types/sort-direction.enum';
import { WORKOUT_TYPES_NAME, WorkoutType } from '../../../types/workout-type.enum';
import FilterCheckbox from '../../../components/filter-checkbox/filter-checkbox';
import { AppRoutes } from '../../../const';
import { useAppSelector } from '../../../store/hooks';
import { getUserInfo } from '../../../store/user/user-selectors';
import { Role } from '../../../types/role.enum';
import { Time, TIME_INTERVALS } from '../../../types/time.enum';

type FilterBlockProps = {
  checkedTypes: WorkoutType[];
  onTypeChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  checkedDuration: Time[];
  onDurationChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  sortDirection: SortDirection;
  onSortDirectionChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  minPrice: number;
  maxPrice: number;
  minCalories: number;
  maxCalories: number;
  onMinPriceChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onMinCaloriesChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxCaloriesChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function FilterBlock({
  checkedTypes,
  onTypeChange,
  checkedDuration,
  onDurationChange,
  sortDirection,
  onSortDirectionChange,
  minPrice,
  maxPrice,
  minCalories,
  maxCalories,
  onMinPriceChange,
  onMaxPriceChange,
  onMinCaloriesChange,
  onMaxCaloriesChange
}: FilterBlockProps):JSX.Element {
  const userInfo = useAppSelector(getUserInfo);
  const navigate = useNavigate();

  return (
    <div className="gym-catalog-form">
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className="gym-catalog-form__wrapper">
        <button className="btn-flat btn-flat--underlined gym-catalog-form__btnback" type="button" onClick={() => navigate(AppRoutes.Main)}>
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg><span>Назад</span>
        </button>
        <h3 className="gym-catalog-form__title">Фильтры</h3>
        <form className="gym-catalog-form__form">
          <div className="gym-catalog-form__block gym-catalog-form__block--price">
            <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
            <div className="filter-price">
              <div className="filter-price__input-text filter-price__input-text--min">
                <input type="number" id="text-min" name="text-min" value={minPrice} onChange={onMinPriceChange} />
                <label htmlFor="text-min">от</label>
              </div>
              <div className="filter-price__input-text filter-price__input-text--max">
                <input type="number" id="text-max" name="text-max" value={maxPrice} onChange={onMaxPriceChange} />
                <label htmlFor="text-max">до</label>
              </div>
            </div>
            <div className="filter-range">
              <div className="filter-range__scale">
                <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-range__control">
                <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
              </div>
            </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--calories">
            <h4 className="gym-catalog-form__block-title">Калории</h4>
            <div className="filter-calories">
              <div className="filter-calories__input-text filter-calories__input-text--min">
                <input type="number" id="text-min-cal" name="text-min-cal" value={minCalories} onChange={onMinCaloriesChange} />
                <label htmlFor="text-min-cal">от</label>
              </div>
              <div className="filter-calories__input-text filter-calories__input-text--max">
                <input type="number" id="text-max-cal" name="text-max-cal" value={maxCalories} onChange={onMaxCaloriesChange} />
                <label htmlFor="text-max-cal">до</label>
              </div>
            </div>
            <div className="filter-range">
              <div className="filter-range__scale">
                <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-range__control">
                <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
              </div>
            </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--rating">
            <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
            <div className="filter-raiting">
              <div className="filter-raiting__scale">
                <div className="filter-raiting__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-raiting__control">
                <button className="filter-raiting__min-toggle"><span className="visually-hidden">Минимальное значение</span></button><span>1</span>
                <button className="filter-raiting__max-toggle"><span className="visually-hidden">Максимальное значение</span></button><span>5</span>
              </div>
            </div>
          </div>
          {userInfo?.role === Role.Customer && <div className="gym-catalog-form__block gym-catalog-form__block--type">
            <h4 className="gym-catalog-form__block-title">Тип</h4>
            <ul className="gym-catalog-form__check-list">
              {Object.values(WorkoutType).map((item) => <FilterCheckbox isChecked={checkedTypes.includes(item)} name={item} onChange={onTypeChange} key={item} className='gym-catalog-form__check-list-item' text={WORKOUT_TYPES_NAME[item]} />)}
            </ul>
          </div>}
          {userInfo?.role === Role.Customer && <div className="gym-catalog-form__block gym-catalog-form__block--sort">
            <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
            <div className="btn-radio-sort gym-catalog-form__radio">
              <label>
                <input type="radio" name="sort" value={SortDirection.Asc} onChange={onSortDirectionChange} checked={sortDirection === SortDirection.Asc} /><span className="btn-radio-sort__label">Дешевле</span>
              </label>
              <label>
                <input type="radio" name="sort" value={SortDirection.Desc} onChange={onSortDirectionChange} checked={sortDirection === SortDirection.Desc} /><span className="btn-radio-sort__label">Дороже</span>
              </label>
              {/*
                <label>
                  <input type="radio" name="sort" value={SortDirection.Asc} onChange={onSortDirectionChange} /><span className="btn-radio-sort__label">Бесплатные</span>
                </label>
               */}
            </div>
          </div>}
          {userInfo?.role === Role.Coach && <div className="my-training-form__block my-training-form__block--duration">
            <h4 className="my-training-form__block-title">Длительность</h4>
            <ul className="my-training-form__check-list">
              {Object.values(Time).map((item) => <FilterCheckbox className='my-training-form__check-list-item' isChecked={checkedDuration.includes(item)} name={item} onChange={onDurationChange} key={item} text={TIME_INTERVALS[item]} />)}
            </ul>
          </div>}
        </form>
      </div>
    </div>
  );
}

export default FilterBlock;
