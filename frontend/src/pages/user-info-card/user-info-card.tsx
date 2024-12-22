import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import { useAppSelector } from '../../store/hooks';
import { getAllUsers } from '../../store/user/user-selectors';
import { AppRoutes } from '../../const';
import { Role } from '../../types/role.enum';
import NotFound from '../not-found/not-found';
import CoachContent from './coach-content/coach-content';
import UserContent from './user-content/user-content';

function UserInfoCard():JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const userInfo = useAppSelector(getAllUsers).find((item) => item.id === id);

  if (!userInfo) {
    return <NotFound />;
  }

  const { role } = userInfo;
  const mainClassName = role === Role.Coach ? 'user-card-coach' : 'user-card';

  const handleBackButtonClick = () => {
    navigate(AppRoutes.Main)
  };

  return (
    <div className="wrapper">
      <Header activePage='main' />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button" onClick={handleBackButtonClick}>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className={mainClassName}>
                  <h1 className="visually-hidden">Карточка пользователя{role === Role.Coach && ' роль тренер'}</h1>
                  <div className={`${mainClassName}__wrapper`}>
                    {role === Role.Coach && <CoachContent userInfo={userInfo} />}
                    {role === Role.Customer && <UserContent userInfo={userInfo} />}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserInfoCard;
