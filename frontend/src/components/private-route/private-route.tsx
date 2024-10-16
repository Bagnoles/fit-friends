import { Navigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../const.ts';
import { getUserInfo } from '../../store/user/user-selectors.ts';
import { useAppSelector } from '../../store/hooks.ts';

type PrivateRouteProps = {
  children: JSX.Element;
  isReverse?: boolean;
}

function PrivateRoute({children, isReverse}: PrivateRouteProps): JSX.Element {
  const location = useLocation();
  const user = useAppSelector(getUserInfo);

  if (user && isReverse) {
    const from = location.state?.from || { pathname: AppRoutes.Main };
    return <Navigate to={from} />;
  }
  if (!user && !isReverse) {
    return <Navigate state={{ from: location }} to={ AppRoutes.Intro } />;
  }

  return children;
}

export default PrivateRoute;
