import { useRef, useState } from 'react';
import Logo from '../../components/logo/logo';
import Input from '../../components/input/input';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { loginAction, registerAction } from '../../store/api-actions';
import { Gender } from '../../types/gender.enum';
import Radio from '../../components/radio/radio';
import { LOCATION_NAMES, Subway } from '../../types/subway.enum';


function Register():JSX.Element {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [gender, setGender] = useState<Gender>(Gender.Whatever);
  const [location, setLocation] = useState<Subway | null>(null);
  const [file, setFile] = useState<File | undefined>();

  const selectRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };
  const handleEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };
  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };
  const handleBirthdayChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(evt.target.value);
  };
  const handleGenderChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setGender(evt.target.value as Gender);
  };

  const handleSelectButtonClick = () => {
    selectRef.current?.classList.add('is-open');
  }
  const handleSelectItemClick = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    selectRef.current?.classList.remove('is-open');
    setLocation(evt.currentTarget.dataset.value as Subway);
    selectRef.current?.classList.add('not-empty');
  }

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      setFile(evt.target.files[0]);
    }
  };

  const handleSubmitRegisterForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const newUser = {
      name,
      password,
      email,
      birthday: birthday === '' ? undefined : new Date(birthday).toISOString() ,
      gender,
      subway: location as Subway,
      avatarUrl: 'img/content/user-photo-2.png',
      imageUrl: 'img/content/user-photo-2.png',
      description: 'Введите описание пользователя....',
      file
    }
    dispatch(registerAction(newUser))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(loginAction({email, password}));
          navigate(AppRoutes.Interview);
        }
      })
  };

  return (
    <div className="wrapper">
      <main>
        <Logo />
        <div className="popup-form popup-form--sign-up">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Регистрация</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={handleSubmitRegisterForm}>
                  <div className="sign-up">
                    <div className="sign-up__load-photo">
                      <div className="input-load-avatar">
                        <label>
                          <input className="visually-hidden" type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
                          <span className="input-load-avatar__btn">
                            <svg width="20" height="20" aria-hidden="true">
                              <use xlinkHref="#icon-import"></use>
                            </svg>
                          </span>
                        </label>
                      </div>
                      <div className="sign-up__description">
                        <h2 className="sign-up__legend">{file ? 'Аватар загружен' : 'Загрузите фото профиля'}</h2><span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
                      </div>
                    </div>
                    <div className="sign-up__data">
                      <Input
                        name='name'
                        text='Имя'
                        type='text'
                        value={name}
                        onChange={handleNameChange}
                        pattern='^.{1,15}$'
                        message='Минимальная длина имени 1 символ, максимальная - 15 символов'
                        required
                      />
                      <Input name='email' text='E-mail' type='email' value={email} onChange={handleEmailChange} required />
                      <Input name='birthday' text='Дата рождения' type='date' value={birthday} onChange={handleBirthdayChange} />
                      <div className="custom-select custom-select--not-selected" ref={selectRef}>
                        <span className="custom-select__label">Ваша локация</span>
                        <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" onClick={handleSelectButtonClick}>
                          <span className="custom-select__text">{location}</span>
                          <span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-down"></use>
                            </svg>
                          </span>
                        </button>
                        <ul className="custom-select__list" role="listbox">
                          {Object.values(Subway).map((item) => <li className='custom-select__item' data-value={item} key={item} onClick={handleSelectItemClick}>{LOCATION_NAMES[item]}</li>)}
                        </ul>
                      </div>
                      <Input
                        name='password'
                        text='Пароль'
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                        pattern='^.{6,12}$'
                        message='Минимальная длина пароля 6 символов, максимальная - 12 символов'
                        required
                      />
                      <div className="sign-up__radio"><span className="sign-up__label">Пол</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big">
                          {Object.values(Gender).map((item) => <Radio
                            currentValue={gender}
                            value={item}
                            text={item === Gender.Male ? 'Мужской' : item === Gender.Female ? 'Женский' : 'Неважно'}
                            onChange={handleGenderChange}
                            key={item}
                            name='sex'
                          />)}
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__role">
                      <h2 className="sign-up__legend">Выберите роль</h2>
                      <div className="role-selector sign-up__role-selector">
                        <div className="role-btn">
                          <label>
                            <input className="visually-hidden" type="radio" name="role" value="coach" /><span className="role-btn__icon">
                              <svg width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-cup"></use>
                              </svg></span><span className="role-btn__btn">Я хочу тренировать</span>
                          </label>
                        </div>
                        <div className="role-btn">
                          <label>
                            <input className="visually-hidden" type="radio" name="role" value="sportsman" checked/><span className="role-btn__icon">
                              <svg width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-weight"></use>
                              </svg></span><span className="role-btn__btn">Я хочу тренироваться</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__checkbox">
                      <label>
                        <input type="checkbox" value="user-agreement" name="user-agreement" checked/><span className="sign-up__checkbox-icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg></span><span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                      </label>
                    </div>
                    <button className="btn sign-up__button" type="submit">Продолжить</button>
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

export default Register;
