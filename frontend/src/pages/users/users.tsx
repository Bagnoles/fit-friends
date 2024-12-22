import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllUsers } from '../../store/user/user-selectors';
import UsersFilter from './users-filter/users-filter';
import UsersList from './users-list/users-list';
import { fetchUsers } from '../../store/api-actions';
import { WorkoutType } from '../../types/workout-type.enum';
import { Subway } from '../../types/subway.enum';
import { Level } from '../../types/level.enum';
import { Role } from '../../types/role.enum';

function Users():JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getAllUsers);
  const [checkedTypes, setCheckedTypes] = useState<WorkoutType[]>(Object.values(WorkoutType));
  const [checkedLocations, setCheckedLocations] = useState<Subway[]>(Object.values(Subway));
  const [checkedLevel, setCheckedLevel] = useState<Level>(Level.Amateur);
  const [userRole, setUserRole] = useState<Role>(Role.Customer);

  useEffect(() => {
      dispatch(fetchUsers());
  }, []);

  const handleChangeCheckedTypes = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (checkedTypes.includes(evt.target.value as WorkoutType)) {
      setCheckedTypes(checkedTypes.filter((item) => item !== evt.target.value));
    } else {
      setCheckedTypes([...checkedTypes, evt.target.value as WorkoutType]);
    }
  }
  const handleChangeCheckedLocations = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (checkedLocations.includes(evt.target.value as Subway)) {
      setCheckedLocations(checkedLocations.filter((item) => item !== evt.target.value));
    } else {
      setCheckedLocations([...checkedLocations, evt.target.value as Subway]);
    }
  }
  const handleLevelChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedLevel(evt.target.value as Level);
  }
  const handleRoleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUserRole(evt.target.value as Role);
  }

  return (
    <div className="wrapper">
      <Header activePage="main" />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <UsersFilter
                checkedLevel={checkedLevel}
                checkedLocations={checkedLocations}
                checkedTypes={checkedTypes}
                onLevelChange={handleLevelChange}
                onLocationChange={handleChangeCheckedLocations}
                onTypeChange={handleChangeCheckedTypes}
                checkedRole={userRole}
                onRoleChange={handleRoleChange}
              />
              <div className="inner-page__content">
                { users.length === 0 ? <p>Пользователей пока нет</p> : <UsersList users={users} />}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Users;
