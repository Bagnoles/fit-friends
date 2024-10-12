import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../const';
import Intro from '../../pages/intro/intro';
import NotFound from '../../pages/not-found/not-found';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import Interview from '../../pages/interview/interview';

function App():JSX.Element {
  return (
    <Routes>
      <Route path={AppRoutes.Intro} element={<Intro />} />
      <Route path={AppRoutes.Login} element={<Login />} />
      <Route path={AppRoutes.Register} element={<Register />} />
      <Route path={AppRoutes.Interview} element={<Interview />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App;
