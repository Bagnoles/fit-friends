import { useState } from 'react';
import Checkbox from '../../components/checkbox/checkbox';
import Logo from '../../components/logo/logo';
import { WORKOUT_TYPES_NAME, WorkoutType } from '../../types/workout-type.enum';
import { Time, TIME_INTERVALS } from '../../types/time.enum';
import Radio from '../../components/radio/radio';
import { Level, LEVEL_NAMES } from '../../types/level.enum';
import Input from '../../components/input/input';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { addCoachInterview, addInterview } from '../../store/api-actions';
import { AppRoutes } from '../../const';
import { getUserInfo } from '../../store/user/user-selectors';
import { toast } from 'react-toastify';
import { Role } from '../../types/role.enum';


function Interview():JSX.Element {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [time, setTime] = useState<Time>(Time.Short);
  const [level, setLevel] = useState<Level>(Level.Beginner);
  const [totalCalories, setTotalCalories] = useState<number>();
  const [dayCalories, setDayCalories] = useState<number>();
  const [coachingMerit, setCoachingMerit] = useState<string>('');
  const [isPersonalTraining, setIsPersonalTraining] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useAppSelector(getUserInfo)?.id;
  const role = useAppSelector(getUserInfo)?.role;

  const handleWorkoutTypesChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (workouts.includes(evt.target.value as WorkoutType)) {
      setWorkouts(workouts.filter((item) => item !== evt.target.value));
    } else {
      setWorkouts([...workouts, evt.target.value as WorkoutType]);
    }
  };
  const handleTimeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTime(evt.target.value as Time);
  };
  const handleLevelChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(evt.target.value as Level);
  };
  const handleTotalCaloriesChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTotalCalories(+evt.target.value);
  };
  const handleDayCaloriesChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDayCalories(+evt.target.value);
  };
  const handleMeritChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCoachingMerit(evt.target.value);
  };
  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      setFile(evt.target.files[0]);
    }
  };

  const handleSubmitInterviewForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (workouts.length === 0) {
      toast.warn('Выберите тип тренировок!');
      return;
    }
    if (role === Role.Customer) {
      const interview = {
        level,
        workoutTypes: workouts,
        workoutTime: time,
        caloriesAmount: totalCalories ?? 0,
        caloriesDay: dayCalories ?? 0,
        isReady: true,
        userId
      };
      dispatch(addInterview(interview))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            navigate(AppRoutes.Main);
          }
        })
    }
    if (role === Role.Coach) {
      const interview = {
        level,
        workoutTypes: workouts,
        coachingMerit,
        isPersonal: isPersonalTraining,
        userId,
        file
      };
      console.log(interview);
      dispatch(addCoachInterview(interview))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            navigate(AppRoutes.Main);
          }
        })
    }
  };

  return (
    <div className="wrapper">
      <main>
        <Logo />
        <div className="popup-form popup-form--questionnaire-user">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form method="get" onSubmit={handleSubmitInterviewForm}>
                  <div className="questionnaire-user">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-user__wrapper">
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                        <div className="specialization-checkbox questionnaire-user__specializations">
                          {Object.values(WorkoutType).map((item) => <Checkbox checkedValues={workouts} text={WORKOUT_TYPES_NAME[item]} onChange={handleWorkoutTypesChange} value={item} key={item}/>)}
                        </div>
                      </div>
                      {role === Role.Customer && <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          {Object.values(Time).map((item) => <Radio currentValue={time} name='time' onChange={handleTimeChange} text={TIME_INTERVALS[item]} value={item} key={item} />)}
                        </div>
                      </div>}
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваш уровень</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          {Object.values(Level).map((item) => <Radio currentValue={level} name='level' onChange={handleLevelChange} text={LEVEL_NAMES[item]} value={item} key={item} />)}
                        </div>
                      </div>
                      {role === Role.Customer && <div className="questionnaire-user__block">
                        <div className="questionnaire-user__calories-lose"><span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                          <Input
                            name='calories-lose'
                            onChange={handleTotalCaloriesChange}
                            text='ккал'
                            type='number'
                            value={totalCalories ? totalCalories.toString() : ''}
                            isInterviewInput={true}
                            min={1000}
                            max={5000}
                            message='Введите число от 1000 до 5000'
                            required
                          />
                        </div>
                        <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                          <Input
                            name='calories-waste'
                            onChange={handleDayCaloriesChange}
                            text='ккал'
                            type='number'
                            value={dayCalories ? dayCalories.toString() : ''}
                            isInterviewInput={true}
                            min={1000}
                            max={5000}
                            message='Введите число от 1000 до 5000'
                            required
                          />
                        </div>
                      </div>}
                      {role === Role.Coach && <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
                        <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                          <label><span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата PDF, JPG или PNG
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import"></use>
                              </svg></span>
                            <input type="file" name="import" tabIndex={-1} accept=".pdf, .jpg, .png" onChange={handleFileChange} />
                          </label>
                        </div>
                      </div>}
                      {role === Role.Coach && <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
                        <div className="custom-textarea questionnaire-coach__textarea">
                          <label>
                            <textarea name="description" placeholder=" " onChange={handleMeritChange} value={coachingMerit}></textarea>
                          </label>
                        </div>
                        <div className="questionnaire-coach__checkbox">
                          <label>
                            <input type="checkbox" value="individual-training" name="individual-training" checked={isPersonalTraining} onChange={() => setIsPersonalTraining(!isPersonalTraining)} /><span className="questionnaire-coach__checkbox-icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg></span>
                              <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                          </label>
                        </div>
                      </div>}
                    </div>
                    <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
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

export default Interview;
