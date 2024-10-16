export const AppRoutes = {
  Intro: '/',
  Register: '/register',
  Interview: '/interview',
  Login: '/login',
  Main: '/main',
  Profile: '/profile',
  Workout: '/workouts',
  Balance: '/balance'
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER',
  Workout = 'WORKOUT',
  Balance = 'BALANCE'
}

export enum APIRoute {
  User = '/users',
  Interview = '/interview',
  Workout = '/workouts',
  Review = '/reviews',
  Order = '/orders',
  Balance = '/balance',
}
