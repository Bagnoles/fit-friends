import { useEffect, useState } from 'react';
import Header from '../../components/header/header'
import UserForm from './user-form/user-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserInfo } from '../../store/user/user-selectors';
import NotFound from '../not-found/not-found';
import { fetchUserBalance, getCoachInterview, getInterview } from '../../store/api-actions';
import { Role } from '../../types/role.enum';
import CustomerPart from './customer-part/customer-part';
import { CoachInterview, Interview } from '../../types/interview.type';
import CoachPart from './coach-part/coach-part';

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
    if (userInfo.role === Role.Customer) {
      dispatch(getInterview(userInfo.id));
      dispatch(fetchUserBalance(userInfo.id));
    }
    if (userInfo.role === Role.Coach) {
      dispatch(getCoachInterview(userInfo.id));
    }
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
                {userInfo.role === Role.Customer && <CustomerPart interview={userInfo.interview as Interview} />}
                {userInfo.role === Role.Coach && <CoachPart interview={userInfo.interview as CoachInterview} />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
