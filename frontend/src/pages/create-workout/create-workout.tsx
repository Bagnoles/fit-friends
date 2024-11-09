import { useState } from 'react';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserInfo } from '../../store/user/user-selectors';
import Select from '../../components/select/select';
import { WORKOUT_TYPES_NAME, WorkoutType } from '../../types/workout-type.enum';
import { Time, TIME_INTERVALS } from '../../types/time.enum';
import { Level, LEVEL_NAMES } from '../../types/level.enum';
import { Gender } from '../../types/gender.enum';
import Radio from '../../components/radio/radio';
import { getRandomWorkoutImage } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { createWorkout } from '../../store/api-actions';
import { AppRoutes } from '../../const';

function CreateWorkout():JSX.Element {
  const userInfo = useAppSelector(getUserInfo);
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<WorkoutType | null>(null);
  const [calories, setCalories] = useState<number>();
  const [time, setTime] = useState<Time | null>(null);
  const [price, setPrice] = useState<number>();
  const [level, setLevel] = useState<Level | null>(null);
  const [gender, setGender] = useState<Gender>(Gender.Whatever);
  const [description, setDescription] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };
  const handleTypeChange = (value: string) => {
    setType(value as WorkoutType);
  };
  const handleCaloriesChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCalories(+evt.target.value);
  };
  const handleTimeChange = (value: string) => {
    setTime(value as Time);
  };
  const handlePriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+evt.target.value);
  };
  const handleLevelChange = (value: string) => {
    setLevel(value as Level);
  };
  const handleGenderChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setGender(evt.target.value as Gender);
  };
  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(evt.target.value);
  };

  const handleSubmitWorkoutForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const workout = {
      name,
      imageUrl: getRandomWorkoutImage(),
      level: level as Level,
      type: type as WorkoutType,
      duration: time as Time,
      price: price ?? 0,
      calories: calories ?? 0,
      description,
      gender,
      videoUrl: 'img/content/training-video/video-thumbnail.png',
      coach: userInfo?.name ?? '',
      isSpecial: false,
    };
    dispatch(createWorkout(workout))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          navigate(AppRoutes.Profile);
        }
      })
  }

  return (
    <div className="wrapper">
      <Header activePage="main" />
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={handleSubmitWorkoutForm}>
                  <div className="create-training">
                    <div className="create-training__wrapper">
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Название тренировки</h2>
                        <div className="custom-input create-training__input">
                          <label>
                              <span className="custom-input__wrapper">
                                <input type="text" name="name" value={name} onChange={handleNameChange} />
                              </span>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Характеристики тренировки</h2>
                        <div className="create-training__info">
                          <Select
                            text='Выберите тип тренировки'
                            currentValue={type ? WORKOUT_TYPES_NAME[type] : null}
                            handleValueChange={handleTypeChange}
                            items={Object.values(WorkoutType)}
                            namesObject={WORKOUT_TYPES_NAME}
                          />
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                                <span className="custom-input__label">Сколько калорий потратим</span>
                                <span className="custom-input__wrapper">
                                  <input type="number" name="calories" value={calories} onChange={handleCaloriesChange}/>
                                  <span className="custom-input__text">ккал</span>
                                </span>
                            </label>
                          </div>
                          <Select
                            text='Сколько времени потратим'
                            currentValue={time ? TIME_INTERVALS[time] : null}
                            handleValueChange={handleTimeChange}
                            items={Object.values(Time)}
                            namesObject={TIME_INTERVALS}
                          />
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">Стоимость тренировки</span>
                              <span className="custom-input__wrapper">
                                <input type="number" name="price" value={price} onChange={handlePriceChange}/>
                                <span className="custom-input__text">₽</span>
                              </span>
                            </label>
                          </div>
                          <Select
                            text='Выберите уровень тренировки'
                            currentValue={level ? LEVEL_NAMES[level] : null}
                            handleValueChange={handleLevelChange}
                            items={Object.values(Level)}
                            namesObject={LEVEL_NAMES}
                          />
                          <div className="create-training__radio-wrapper"><span className="create-training__label">Кому подойдет тренировка</span>
                            <br />
                            <div className="custom-toggle-radio create-training__radio">
                              {Object.values(Gender).map((item) => <Radio
                              currentValue={gender}
                              value={item}
                              text={item === Gender.Male ? 'Мужчинам' : item === Gender.Female ? 'Женщинам' : 'Всем'}
                              onChange={handleGenderChange}
                              key={item}
                              name='gender'
                              />)}
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Описание тренировки</h2>
                        <div className="custom-textarea create-training__textarea">
                          <label>
                            <textarea name="description" placeholder=" " value={description} onChange={handleDescriptionChange}></textarea>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label><span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg></span>
                            <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <button className="btn create-training__button" type="submit">Опубликовать</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateWorkout;
