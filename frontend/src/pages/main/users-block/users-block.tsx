import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../const';
import { useAppSelector } from '../../../store/hooks';
import { getAllUsers } from '../../../store/user/user-selectors';
import UsersSliderButtons from './users-slider-buttons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import UserCard from '../../../components/user-card/user-card';
import { Role } from '../../../types/role.enum';

function UsersBlock():JSX.Element {
  const navigate = useNavigate();
  const users = useAppSelector(getAllUsers);

  const handleUsersButtonClick = () => {
      navigate(AppRoutes.Users);
  }

  return (
    <div className="look-for-company__wrapper">
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
      >
      <div className="look-for-company__title-wrapper" slot='container-start'>
        <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
        <button className="btn-flat btn-flat--light look-for-company__button" type="button" onClick={handleUsersButtonClick}><span>Смотреть все</span>
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </button>
        <UsersSliderButtons />
      </div>
      {users.filter((item) => item.role === Role.Customer)
        .map((item) => <SwiperSlide key={item.id}><UserCard className='look-for-company__item' user={item} isSliderCard /></SwiperSlide>)
      }
      </Swiper>
    </div>
  );
}

export default UsersBlock;
