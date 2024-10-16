import { useEffect, useState } from 'react';
import Header from '../../components/header/header'
import UserForm from './user-form/user-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserInfo } from '../../store/user/user-selectors';
import NotFound from '../not-found/not-found';
import { fetchUserBalance, getInterview } from '../../store/api-actions';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';

function Profile():JSX.Element {
  const userInfo = useAppSelector(getUserInfo);
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditingButton = () => {
    setIsEdit(!isEdit);
  }

  if (!userInfo) {
    return <NotFound />
  }
  useEffect(() => {
    dispatch(getInterview(userInfo.id));
    dispatch(fetchUserBalance(userInfo.id));
  }, [])

  return (
    <div className="wrapper">
      <Header activePage="profile" />
      <main>
        <div className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserForm userInfo={userInfo} isEdit={isEdit} onEditButtonClick={handleEditingButton} />
              <div className="inner-page__content">
                <div className="personal-account-user">
                  <div className="personal-account-user__schedule">
                    <form action="#" method="get">
                      <div className="personal-account-user__form">
                        <div className="personal-account-user__input">
                          <label><span className="personal-account-user__label">План на день, ккал</span>
                            <input type="text" name="schedule-for-the-day" value={userInfo.interview?.caloriesDay} />
                          </label>
                        </div>
                        <div className="personal-account-user__input">
                          <label><span className="personal-account-user__label">План на неделю, ккал</span>
                            <input type="text" name="schedule-for-the-week" value={( userInfo.interview?.caloriesDay ?? 0 ) * 7} />
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                    <div className="personal-account-user__additional-info"><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои друзья</span></a><Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoutes.Balance}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-shopping-cart"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои покупки</span></Link>
                        <div className="thumbnail-spec-gym">
                          <div className="thumbnail-spec-gym__image">
                            <picture>
                              <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" /><img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                            </picture>
                          </div>
                          <div className="thumbnail-spec-gym__header">
                            <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
