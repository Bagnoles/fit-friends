import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import FriendsList from './friends-list';
import { AppRoutes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchFriends } from '../../store/api-actions';
import { getAllFriends, getFriendsErrorStatus, getFriendsLoadingStatus } from '../../store/user/user-selectors';
import { useEffect } from 'react';

function Friends():JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const friends = useAppSelector(getAllFriends);
  const isLoading = useAppSelector(getFriendsLoadingStatus);
  const isError = useAppSelector(getFriendsErrorStatus);

  useEffect(() => {
    dispatch(fetchFriends());
  }, []);

  if (isError) {
    return <p>Произошла ошибка, попробуйте обновить страницу.</p>
  }

  return (
    <div className="wrapper">
      <Header activePage='friends' />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button className="btn-flat friends-list__back" type="button" onClick={() => navigate(AppRoutes.Main)}>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
                {/*<!--<div className="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox">
                  <label>
                    <input type="checkbox" value="user-agreement-1" name="user-agreement"><span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg></span><span className="custom-toggle__label">Только онлайн</span>
                  </label>
                </div>-->*/}
              </div>
              {isLoading && <p>Идет загрузка...</p>}
              {friends.length === 0 ? <p>У Вас пока нет друзей... </p> : <FriendsList data={friends} />}
              <div className="show-more friends-list__show-more">
                <button className="btn show-more__button show-more__button--more" type="button" disabled>Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Friends;
