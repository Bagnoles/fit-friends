import { LEVEL_NAMES } from '../../../types/level.enum';
import { LOCATION_NAMES } from '../../../types/subway.enum';
import { UserInfo } from '../../../types/user.type';
import { WORKOUT_TYPES_NAME } from '../../../types/workout-type.enum';

type UserContentProps = {
  userInfo: UserInfo;
}

function UserContent({userInfo}: UserContentProps):JSX.Element {
  const { name, interview, description, subway } = userInfo;
  return (
    <>
      <div className="user-card__content">
        <div className="user-card__head">
          <h2 className="user-card__title">{name}</h2>
        </div>
        <div className="user-card__label">
          <a href=""><svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg><span>{LOCATION_NAMES[subway]}</span></a>
        </div>
        <div className="user-card__status"><span>Готов к тренировке</span></div>
        <div className="user-card__text">
          <p>{description}</p>
        </div>
        <ul className="user-card__hashtag-list">
          {interview && interview.workoutTypes.map((item) => <li className="user-card__hashtag-item" key={item}>
            <div className="hashtag"><span>#{WORKOUT_TYPES_NAME[item].toLowerCase()}</span></div>
          </li>)}
          {interview && <li className="user-card__hashtag-item">
            <div className="hashtag"><span>#{LEVEL_NAMES[interview.level].toLowerCase()}</span></div>
          </li>}
        </ul>
        <button className="btn user-card__btn" type="button">Добавить в друзья</button>
      </div>
      <div className="user-card__gallary">
        <ul className="user-card__gallary-list">
          <li className="user-card__gallary-item"><img src="img/content/user-card-photo1.jpg" srcSet="img/content/user-card-photo1@2x.jpg 2x" width="334" height="573" alt="photo1" />
          </li>
          <li className="user-card__gallary-item"><img src="img/content/user-card-photo2.jpg" srcSet="img/content/user-card-photo2@2x.jpg 2x" width="334" height="573" alt="photo2" />
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserContent;
