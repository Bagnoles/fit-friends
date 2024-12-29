import { Link } from 'react-router-dom';
import { Role } from '../../types/role.enum';
import { LOCATION_NAMES } from '../../types/subway.enum';
import { UserInfo } from '../../types/user.type';
import { WORKOUT_TYPES_NAME } from '../../types/workout-type.enum';
import { AppRoutes } from '../../const';

type FriendsItemProps = {
  data: UserInfo;
}

function FriendsItem({data}: FriendsItemProps):JSX.Element {
  const { name, role, subway, id, avatarUrl } = data;
  const interviewInfo = data.interview ?? data.coachInterview;

  return (
    <li className="friends-list__item">
      <Link to={`${AppRoutes.Users}/${id}`}>
      <div className="thumbnail-friend">
        <div className={`thumbnail-friend__info ${role === Role.Coach ? 'thumbnail-friend__info--theme-dark' : 'thumbnail-friend__info--theme-light'}`}>
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <source type="image/webp" srcSet={avatarUrl} /><img src={avatarUrl} srcSet={avatarUrl} width="78" height="78" alt="Аватар" />
              </picture>
              {/*<!--<div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>-->*/}
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{name}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">{LOCATION_NAMES[subway]}</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {interviewInfo && interviewInfo.workoutTypes.map((item) => <li key={item}>
                <div className="hashtag thumbnail-friend__hashtag"><span>#{WORKOUT_TYPES_NAME[item].toLowerCase()}</span></div>
              </li>)}
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
            </div>
            <button className="thumbnail-friend__invite-button" type="button">
              <svg width="43" height="46" aria-hidden="true" focusable="false">
                <use xlinkHref="#icon-invite"></use>
              </svg><span className="visually-hidden">Пригласить друга на совместную тренировку</span>
            </button>
          </div>
        </div>
        {role === Role.Customer && <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку</p>
          <div className="thumbnail-friend__button-wrapper">
            <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
          </div>
        </div>}
        {role === Role.Coach && <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку принят</p>
          </div>}
      </div>
      </Link>
    </li>
  );
}

export default FriendsItem;
