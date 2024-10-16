import { WORKOUT_TYPES_NAME, WorkoutType } from '../../../types/workout-type.enum';
import Checkbox from '../../../components/checkbox/checkbox';
import { LOCATION_NAMES } from '../../../types/subway.enum';
import { GENDER_NAMES } from '../../../types/gender.enum';
import { LEVEL_NAMES } from '../../../types/level.enum';
import { UserInfo } from '../../../types/user.type';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../const';

type UserFormProps = {
  userInfo: UserInfo;
  isEdit: boolean;
  onEditButtonClick: () => void;
}

function UserForm({userInfo, isEdit, onEditButtonClick}: UserFormProps):JSX.Element {
  const navigate = useNavigate();

  if (!userInfo.interview) {
    navigate(AppRoutes.Interview);
  }



  const handleEditButtonClick = () => {
    onEditButtonClick();
  }

  return (
    <section className="user-info">
      <div className="user-info__header">
        <div className="input-load-avatar">
          <label>
            <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" /><span className="input-load-avatar__avatar"><img src={userInfo.imageUrl} srcSet={userInfo.imageUrl} width="98" height="98" alt="user photo" /></span>
          </label>
        </div>
      </div>
      <form className="user-info__form" action="#" method="post">
        <button className="btn-flat btn-flat--underlined user-info__edit-button" type="button" aria-label="Редактировать" onClick={handleEditButtonClick}>
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg><span>{isEdit ? 'Сохранить' : 'Редактировать'}</span>
        </button>
        <div className="user-info__section">
          <h2 className="user-info__title">Обо мне</h2>
          <div className="custom-input custom-input--readonly user-info__input">
            <label><span className="custom-input__label">Имя</span><span className="custom-input__wrapper">
                <input type="text" name="name" value={userInfo.name} disabled={!isEdit} /></span>
            </label>
          </div>
          <div className="custom-textarea custom-textarea--readonly user-info__textarea">
            <label><span className="custom-textarea__label">Описание</span>
              <textarea name="description" placeholder=" " disabled={!isEdit}>{userInfo.description}</textarea>
            </label>
          </div>
        </div>
        <div className="user-info__section user-info__section--status">
          <h2 className="user-info__title user-info__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info__toggle">
            <label>
              <input type="checkbox" name="ready-for-training" checked={userInfo.interview?.isReady} /><span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg></span><span className="custom-toggle__label">Готов тренироваться</span>
            </label>
          </div>
        </div>
        <div className="user-info__section">
          <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
          <div className="specialization-checkbox user-info__specialization">
            {Object.values(WorkoutType).map((item) => <Checkbox checkedValues={userInfo.interview?.workoutTypes ?? []} text={WORKOUT_TYPES_NAME[item]} value={item} key={item} />)}
          </div>
        </div>
        <div className="custom-select--readonly custom-select user-info__select"><span className="custom-select__label">Локация</span>
          <div className="custom-select__placeholder">ст. м. {LOCATION_NAMES[userInfo.subway]}</div>
          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled={!isEdit}><span className="custom-select__text"></span><span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg></span></button>
          <ul className="custom-select__list" role="listbox">
          </ul>
        </div>
        <div className="custom-select--readonly custom-select user-info__select"><span className="custom-select__label">Пол</span>
          <div className="custom-select__placeholder">{GENDER_NAMES[userInfo.gender]}</div>
          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled={!isEdit}><span className="custom-select__text"></span><span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg></span></button>
          <ul className="custom-select__list" role="listbox">
          </ul>
        </div>
        <div className="custom-select--readonly custom-select user-info__select"><span className="custom-select__label">Уровень</span>
          <div className="custom-select__placeholder">{userInfo.interview ? LEVEL_NAMES[userInfo.interview?.level] : ''}</div>
          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled={!isEdit}><span className="custom-select__text"></span><span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg></span></button>
          <ul className="custom-select__list" role="listbox">
          </ul>
        </div>
      </form>
    </section>
  );
}

export default UserForm;
