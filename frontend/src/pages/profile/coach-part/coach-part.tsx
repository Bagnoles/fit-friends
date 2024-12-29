import { Link } from 'react-router-dom';
import { CoachInterview } from '../../../types/interview.type';
import { AppRoutes } from '../../../const';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SliderButtons from './slider-buttons';
import CertificateItem from './certificate-item';

type CoachPartProps = {
  interview: CoachInterview;
}

function CoachPart({interview}: CoachPartProps):JSX.Element {
  const mockCertificates = Array.from({length: 5}).map((_item) => interview?.certificate);

  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoutes.Workout}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-flash"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои тренировки</span>
        </Link>
        <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoutes.Create}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-add"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Создать тренировку</span>
        </Link>
        <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoutes.Friends}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои друзья</span>
        </Link>
        <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoutes.Order}>
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-bag"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои заказы</span>
        </Link>
        <div className="personal-account-coach__calendar">
          <div className="thumbnail-spec-gym">
          <div className="thumbnail-spec-gym__image">
            <picture>
              <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" /><img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
            </picture>
          </div>
          <p className="thumbnail-spec-gym__type">Ближайший зал</p>
          <div className="thumbnail-spec-gym__header">
            <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
          </div>
        </div>
      </div>
      </div>
      <div className="personal-account-coach__additional-info">
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          style={{ maxWidth: '1042px' }}
        >
        <div className="personal-account-coach__label-wrapper" slot='container-start'>
          <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
          <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-import"></use>
            </svg><span>Загрузить</span>
          </button>
          <SliderButtons />
        </div>
        {mockCertificates.map((item, index) => <SwiperSlide key={index}><CertificateItem certificate={item} /></SwiperSlide>)}
        </Swiper>
      </div>
    </div>
  );
}

export default CoachPart;
