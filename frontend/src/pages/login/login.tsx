import { useState } from 'react';
import Logo from '../../components/logo/logo';
import Input from '../../components/input/input';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { checkAuthorization, loginAction } from '../../store/api-actions';
import { AppRoutes } from '../../const';
import { toast } from 'react-toastify';


function Login():JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };
  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const handleSubmitLoginForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction({email, password}))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(checkAuthorization())
          navigate(AppRoutes.Main);
        }
        if (response.meta.requestStatus === 'rejected') {
          toast.error('Неверный email или пароль');
        }
      })
  };

  return (
    <div className="wrapper">
      <main>
        <Logo />
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={handleSubmitLoginForm}>
                  <div className="sign-in">
                    <Input
                      name='email'
                      onChange={handleEmailChange}
                      text='E-mail'
                      type='email'
                      value={email}
                      isSignInInput
                      required
                    />
                    <Input
                      name='password'
                      onChange={handlePasswordChange}
                      text='Пароль'
                      type='password'
                      value={password}
                      isSignInInput
                      pattern='^.{6,12}$'
                      message='Минимальная длина пароля 6 символов, максимальная - 12 символов'
                      required
                    />
                    <button className="btn sign-in__button" type="submit">Продолжить</button>
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

export default Login;
