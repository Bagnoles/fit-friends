import { Role } from '../../types/role.enum';
import { LOCATION_NAMES } from '../../types/subway.enum';
import { UserInfo } from '../../types/user.type';
import { WORKOUT_TYPES_NAME } from '../../types/workout-type.enum';

type UserCardProps = {
  user: UserInfo;
  className: string;
  isSliderCard?: boolean;
  isPremium?: boolean;
}

function UserCard({user, className, isSliderCard, isPremium}: UserCardProps):JSX.Element {
  const { role, avatarUrl, name, subway, interview, coachInterview } = user;
  const interviewInfo = interview ?? coachInterview;
  const classNameForWrapper = isSliderCard ? 'thumbnail-user thumbnail-user--role-user thumbnail-user--dark' : role === Role.Coach ? 'thumbnail-user thumbnail-user--role-coach' : 'thumbnail-user thumbnail-user--role-user';
  const classNameForBtn = 'btn btn--medium thumbnail-user__button ' + (role === Role.Coach && ' btn--dark-bg ') + (isSliderCard && ' btn--outlined btn--dark-bg ');

  return (
    <li className={className}>
      <div className={classNameForWrapper}>
        <div className="thumbnail-user__image">
          <picture>
            <source type="image/webp" srcSet={avatarUrl} /><img src={avatarUrl} srcSet={avatarUrl} width="82" height="82" alt="Аватар" />
          </picture>
        </div>
        { isPremium && (
          <div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-crown"></use>
            </svg>
          </div>
        )}
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">{LOCATION_NAMES[subway]}</address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          { interviewInfo && interviewInfo.workoutTypes.map((item) => (
            <li className="thumbnail-user__hashtags-item" key={item}>
              <div className="hashtag thumbnail-user__hashtag"><span>#{WORKOUT_TYPES_NAME[item].toLowerCase()}</span></div>
            </li>
          ))}
        </ul>
        <a className={classNameForBtn} href="#">Подробнее</a>
      </div>
    </li>
  );
}

export default UserCard;
