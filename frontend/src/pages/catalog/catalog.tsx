import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getWorkoutsWithPagination, getWorkoutErrorStatus, getWorkoutLoadingStatus } from '../../store/workout/workout-selectors';
import FilterBlock from './filter-block/filter-block';
import WorkoutList from './workout-list/workout-list';
import { fetchCoachWorkouts, fetchWorkouts } from '../../store/api-actions';
import { WorkoutType } from '../../types/workout-type.enum';
import { SortDirection } from '../../types/sort-direction.enum';
import { SortType } from '../../types/sort-type.enum';
import { DEFAULT_PAGE_LIMIT } from '../../const';
import { getUserInfo } from '../../store/user/user-selectors';
import { Role } from '../../types/role.enum';
import { Time } from '../../types/time.enum';

const MAX_PRICE = 10000;
const MAX_CALORIES = 1000;

function Catalog():JSX.Element {
  const workoutsWithPagination = useAppSelector(getWorkoutsWithPagination);
  const isServerError = useAppSelector(getWorkoutErrorStatus);
  const isLoading = useAppSelector(getWorkoutLoadingStatus);
  const userInfo = useAppSelector(getUserInfo);

  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(workoutsWithPagination.currentPage);
  const [checkedTypes, setCheckedTypes] = useState<WorkoutType[]>(Object.values(WorkoutType));
  const [checkedDuration, setCheckedDuration] = useState<Time[]>(Object.values(Time));
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc);
  const [sortType, _setSortType] = useState<SortType>(SortType.Price);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE);
  const [minCalories, setMinCalories] = useState<number>(0);
  const [maxCalories, setMaxCalories] = useState<number>(MAX_CALORIES);

  useEffect(() => {
    if (userInfo?.role === Role.Coach) {
      dispatch(fetchCoachWorkouts());
    } else {
      dispatch(fetchWorkouts({
        page,
        sortDirection,
        sortType,
        type: checkedTypes
      }))
    }
  }, [page, sortDirection, sortType, checkedTypes, userInfo]);

  const handlePageChange = () => {
    setPage(page + 1);
  }
  const handleChangeCheckedDuration = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (checkedDuration.includes(evt.target.value as Time)) {
      setCheckedDuration(checkedDuration.filter((item) => item !== evt.target.value));
    } else {
      setCheckedDuration([...checkedDuration, evt.target.value as Time]);
    }
  }
  const handleChangeCheckedTypes = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (checkedTypes.includes(evt.target.value as WorkoutType)) {
      setCheckedTypes(checkedTypes.filter((item) => item !== evt.target.value));
    } else {
      setCheckedTypes([...checkedTypes, evt.target.value as WorkoutType]);
    }
  }
  const handleSortDirectionChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSortDirection(evt.target.value as SortDirection);
  }
  const handleMinPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(+evt.target.value);
  }
  const handleMaxPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(+evt.target.value);
  }
  const handleMinCaloriesChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMinCalories(+evt.target.value);
  }
  const handleMaxCaloriesChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMaxCalories(+evt.target.value);
  }

  if (isServerError) {
    return <p>Произошла ошибка. Обновите страницу.</p>
  }

  return (
    <div className="wrapper">
      <Header activePage='main' />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <FilterBlock
                checkedTypes={checkedTypes}
                onTypeChange={handleChangeCheckedTypes}
                onDurationChange={handleChangeCheckedDuration}
                checkedDuration={checkedDuration}
                onSortDirectionChange={handleSortDirectionChange}
                sortDirection={sortDirection}
                maxCalories={maxCalories}
                maxPrice={maxPrice}
                minCalories={minCalories}
                minPrice={minPrice}
                onMaxCaloriesChange={handleMaxCaloriesChange}
                onMaxPriceChange={handleMaxPriceChange}
                onMinCaloriesChange={handleMinCaloriesChange}
                onMinPriceChange={handleMinPriceChange}
              />
              <div className="training-catalog">
                {isLoading ? 'Идет загрузка......' : <WorkoutList workouts={workoutsWithPagination.entities} />}
                <div className="show-more training-catalog__show-more">
                  <button
                    className="btn show-more__button show-more__button--more"
                    type="button"
                    disabled={workoutsWithPagination.totalItems <= DEFAULT_PAGE_LIMIT || workoutsWithPagination.currentPage === workoutsWithPagination.totalPages}
                    onClick={handlePageChange}
                  >Показать еще</button>
                  <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Catalog;
