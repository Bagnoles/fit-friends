import Header from '../../components/header/header';
import { useAppSelector } from '../../store/hooks';
import { getWorkouts } from '../../store/workout/workout-selectors';
import FilterBlock from './filter-block/filter-block';
import WorkoutList from './workout-list/workout-list';

function Catalog():JSX.Element {
  const workouts = useAppSelector(getWorkouts);

  return (
    <div className="wrapper">
      <Header activePage='main' />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <FilterBlock />
              <div className="training-catalog">
                <WorkoutList workouts={workouts} />
                <div className="show-more training-catalog__show-more">
                  <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
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
