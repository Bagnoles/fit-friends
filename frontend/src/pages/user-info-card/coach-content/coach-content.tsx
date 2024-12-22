import { useAppSelector } from '../../../store/hooks';
import { getWorkouts } from '../../../store/workout/workout-selectors';
import { LOCATION_NAMES } from '../../../types/subway.enum';
import { UserInfo } from '../../../types/user.type';
import { WORKOUT_TYPES_NAME } from '../../../types/workout-type.enum';
import WorkoutsBlock from './workouts-block';

type CoachContentProps = {
  userInfo: UserInfo;
}

function CoachContent({userInfo}: CoachContentProps):JSX.Element {
  const { id, name, subway, description, coachInterview } = userInfo;
  const workouts = useAppSelector(getWorkouts).filter((item) => item.coachId === id);
  return (
    <>
      <div className="user-card-coach__card">
        <div className="user-card-coach__content">
          <div className="user-card-coach__head">
            <h2 className="user-card-coach__title">{name}</h2>
          </div>
          <div className="user-card-coach__label">
            <a href="popup-user-map.html"><svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg><span>{LOCATION_NAMES[subway]}</span></a>
          </div>
          <div className="user-card-coach__status-container">
            <div className="user-card-coach__status user-card-coach__status--tag">
              <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                <use xlinkHref="#icon-cup"></use>
              </svg><span>Тренер</span>
            </div>
            <div className="user-card-coach__status user-card-coach__status--check"><span>Готов тренировать</span></div>
          </div>
          <div className="user-card-coach__text">
            <p>{description}</p>
          </div>
          <button className="btn-flat user-card-coach__sertificate" type="button">
            <svg width="12" height="13" aria-hidden="true">
              <use xlinkHref="#icon-teacher"></use>
            </svg><span>Посмотреть сертификаты</span>
          </button>
          <ul className="user-card-coach__hashtag-list">
            {coachInterview && coachInterview.workoutTypes.map((item) => <li className="user-card-coach__hashtag-item" key={item}>
              <div className="hashtag"><span>#{WORKOUT_TYPES_NAME[item].toLowerCase()}</span></div>
            </li>)}
          </ul>
          <button className="btn user-card-coach__btn" type="button">Добавить в друзья</button>
        </div>
        <div className="user-card-coach__gallary">
          <ul className="user-card-coach__gallary-list">
            <li className="user-card-coach__gallary-item"><img src="img/content/user-coach-photo1.jpg" srcSet="img/content/user-coach-photo1@2x.jpg 2x" width="334" height="573" alt="photo1" />
            </li>
            <li className="user-card-coach__gallary-item"><img src="img/content/user-coach-photo2.jpg" srcSet="img/content/user-coach-photo2@2x.jpg 2x" width="334" height="573" alt="photo2" />
            </li>
          </ul>
        </div>
      </div>
      {workouts.length === 0 ? <p>Пользователь пока не добавил тренировок</p> : <WorkoutsBlock workouts={workouts} />}
      <form className="user-card-coach__training-form" style={{ marginTop: '60px' }}>
        <button className="btn user-card-coach__btn-training" type="button">Хочу персональную тренировку</button>
        <div className="user-card-coach__training-check">
          <div className="custom-toggle custom-toggle--checkbox">
            <label>
              <input type="checkbox" value="user-agreement-1" name="user-agreement" checked /><span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg></span><span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
            </label>
          </div>
        </div>
      </form>
    </>
  );
}

export default CoachContent;
