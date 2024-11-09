import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../const';
import Intro from '../../pages/intro/intro';
import NotFound from '../../pages/not-found/not-found';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import Interview from '../../pages/interview/interview';
import Main from '../../pages/main/main';
import Workout from '../../pages/workout/workout';
import Catalog from '../../pages/catalog/catalog';
import Profile from '../../pages/profile/profile';
import PrivateRoute from '../private-route/private-route';
import Purchase from '../../pages/purchase/purchase';
import CreateWorkout from '../../pages/create-workout/create-workout';

function App():JSX.Element {
  return (
    <Routes>
      <Route path={AppRoutes.Intro} element={<PrivateRoute isReverse><Intro /></PrivateRoute>} />
      <Route path={AppRoutes.Login} element={<PrivateRoute isReverse><Login /></PrivateRoute>} />
      <Route path={AppRoutes.Register} element={<PrivateRoute isReverse><Register /></PrivateRoute>} />
      <Route path={AppRoutes.Interview} element={<Interview />} />
      <Route path={AppRoutes.Profile} element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path={AppRoutes.Balance} element={<PrivateRoute><Purchase /></PrivateRoute>} />
      <Route path={AppRoutes.Main} element={<PrivateRoute><Main /></PrivateRoute>} />
      <Route path={AppRoutes.Workout} element={<PrivateRoute><Catalog /></PrivateRoute>} />
      <Route path={`${AppRoutes.Workout}/:id`} element={<PrivateRoute><Workout /></PrivateRoute>} />
      <Route path={AppRoutes.Create} element={<PrivateRoute><CreateWorkout /></PrivateRoute>} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App;
