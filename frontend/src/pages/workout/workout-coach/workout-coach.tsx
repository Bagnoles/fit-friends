import { useState } from 'react';
import { UserInfo } from '../../../types/user.type';
import { Workout } from '../../../types/workout.type';
import { getAverageRating, getImagePath } from '../../../utils';
import { WORKOUT_TYPES_NAME } from '../../../types/workout-type.enum';
import { TIME_INTERVALS } from '../../../types/time.enum';
import { Gender } from '../../../types/gender.enum';
import { useAppDispatch } from '../../../store/hooks';
import { updateWorkout } from '../../../store/api-actions';

type WorkoutCoachProps = {
  workout: Workout;
  userInfo: UserInfo;
}

function WorkoutCoach({workout, userInfo}: WorkoutCoachProps):JSX.Element {
  const dispatch = useAppDispatch();
  const {calories, description, duration, gender, name, price, type, videoUrl, isSpecial, id} = workout;
  const avatarPath = userInfo.avatar ? getImagePath(userInfo.avatar) : userInfo.avatarUrl;
  const rating = getAverageRating(workout);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [workoutName, setWorkoutName] = useState<string>(name);
  const [workoutDescription, setWorkoutDescription] = useState<string>(description);
  const [workoutPrice, setWorkoutPrice] = useState<number>(price);
  const [isDiscount, setIsDiscount] = useState<boolean>(isSpecial);

  const handleEditButtonClick = () => {
    if (isEdit) {
      handleSaveButtonClick();
      return;
    }
    setIsEdit(!isEdit);
  }
  const handleDiscountClick = () => {
    setIsDiscount(!isDiscount);
  }
  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setWorkoutName(evt.target.value);
  };
  const handlePriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setWorkoutPrice(+evt.target.value);
  };
  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWorkoutDescription(evt.target.value);
  };

  const isDataChanged = () => workoutName !== name || workoutDescription !== description || workoutPrice !== price || isDiscount !== isSpecial;

  const handleSaveButtonClick = () => {
    if (isDataChanged()) {
      dispatch(updateWorkout({
        id,
        name: workoutName,
        price: workoutPrice,
        description: workoutDescription,
        isSpecial: isDiscount
      }))
    }
    setIsEdit(false);
  }

  return (
    <div className="training-card training-card--edit">
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <div className="training-info__header">
          <div className="training-info__coach">
            <div className="training-info__photo">
              <picture>
                <source type="image/webp" srcSet={avatarPath} /><img src={avatarPath} srcSet={avatarPath} width="64" height="64" alt="Изображение тренера" />
              </picture>
            </div>
            <div className="training-info__coach-info"><span className="training-info__label">Тренер</span><span className="training-info__name">{userInfo.name}</span></div>
          </div>
          <button className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save" type="button" onClick={handleEditButtonClick}>
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg><span>{isEdit ? 'Сохранить' : 'Редактировать'}</span>
          </button>
        </div>
        <div className="training-info__main-content">
          <form action="#" method="get">
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <div className="training-info__input training-info__input--training">
                  <label><span className="training-info__label">Название тренировки</span>
                    <input type="text" name="training" value={workoutName} disabled={!isEdit} onChange={handleNameChange} />
                  </label>
                  <div className="training-info__error">Обязательное поле</div>
                </div>
                <div className="training-info__textarea">
                  <label><span className="training-info__label">Описание тренировки</span>
                    <textarea name="description" disabled={!isEdit} value={workoutDescription} onChange={handleDescriptionChange}></textarea>
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label><span className="training-info__label">Рейтинг</span><span className="training-info__rating-icon">
                      <svg width="18" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg></span>
                    <input type="number" name="rating" value={rating ?? 0} disabled />
                  </label>
                </div>
                <ul className="training-info__list">
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{WORKOUT_TYPES_NAME[type].toLowerCase()}</span></div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{gender === Gender.Whatever ? 'для_всех' : gender === Gender.Female ? 'для_женщин' : 'для_мужчин'}</span></div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{calories}ккал</span></div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{TIME_INTERVALS[duration]}</span></div>
                  </li>
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label><span className="training-info__label">Стоимость</span>
                    <input type="text" name="price" value={`${workoutPrice} ₽`} disabled={!isEdit} onChange={handlePriceChange} />
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                <button className="btn-flat btn-flat--light btn-flat--underlined training-info__discount" type="button" disabled={!isEdit} onClick={handleDiscountClick}>
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-discount"></use>
                  </svg><span>{isDiscount ? 'Отменить скидку' : 'Сделать скидку 10%'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>
        <div className="training-video__video">
          <div className="training-video__thumbnail">
            <picture>
              <source type="image/webp" srcSet={videoUrl} /><img src={videoUrl} srcSet={videoUrl} width="922" height="566" alt="Обложка видео" />
            </picture>
          </div>
          <button className="training-video__play-button btn-reset">
            <svg width="18" height="30" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div className="training-video__drop-files">
          <form action="#" method="post">
            <div className="training-video__form-wrapper">
              <div className="drag-and-drop">
                <label><span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import-video"></use>
                    </svg></span>
                  <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="training-video__buttons-wrapper">
          <button className="btn training-video__button training-video__button--start" type="button" disabled>Приступить</button>
          { isEdit && (
            <div className="training-video__edit-buttons">
              <button className="btn" type="button" onClick={handleSaveButtonClick}>Сохранить</button>
              <button className="btn btn--outlined" type="button">Удалить</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkoutCoach;
