import { useEffect } from 'react';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getWorkoutLoadingStatus, getWorkoutErrorStatus, getWorkouts } from '../../store/workout/workout-selectors';
import DiscountBlock from './discount-block/discount-block';
import PopularBlock from './popular-block/popular-block';
import SpecialBlock from './special-block/special-block';
import { fetchUsers, fetchWorkouts } from '../../store/api-actions';
import { getAllUsers, getUserInfo, getUsersLoadingStatus } from '../../store/user/user-selectors';
import { Role } from '../../types/role.enum';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../const';
import UsersBlock from './users-block/users-block';

function Main():JSX.Element {
  const isLoading = useAppSelector(getWorkoutLoadingStatus);
  const isError = useAppSelector(getWorkoutErrorStatus);
  const workouts = useAppSelector(getWorkouts);
  const users = useAppSelector(getAllUsers);
  const isUsersLoading = useAppSelector(getUsersLoadingStatus);
  const userRole = useAppSelector(getUserInfo)?.role;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchWorkouts());
    dispatch(fetchUsers());
  }, []);

  if (isError) {
    return <p>Произошла ошибка. Обновите страницу</p>;
  }

  if (userRole === Role.Coach) {
    navigate(AppRoutes.Profile);
  }

  return (
    <div className="wrapper">
      <Header activePage='main' />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <section className="special-for-you">
          <div className="container">
            { isLoading ? 'Идет загрузка....' : <SpecialBlock /> }
            { workouts.length === 0 && !isLoading && <p>Скоро здесь появится что-то полезное</p> }
          </div>
        </section>
        <section className="special-offers">
          <div className="container">
          { isLoading ? 'Идет загрузка....' : <DiscountBlock /> }
          { workouts.length === 0 && !isLoading && <p>Скоро здесь появится что-то полезное</p> }
          </div>
        </section>
        <section className="popular-trainings">
          <div className="container">
          { isLoading ? 'Идет загрузка....' : <PopularBlock /> }
          { workouts.length === 0 && !isLoading && <p>Скоро здесь появится что-то полезное</p> }
          </div>
        </section>
        <section className="look-for-company">
          <div className="container">
          { isUsersLoading ? 'Идет загрузка....' : <UsersBlock /> }
          { users.length === 0 && !isUsersLoading && <p>Скоро здесь появится что-то полезное</p> }
          </div>
        </section>
      </main>
    </div>
  );
}

export default Main;
