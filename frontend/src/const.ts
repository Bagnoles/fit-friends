export const AppRoutes = {
  Intro: '/',
  Register: '/register',
  Interview: '/interview',
  Login: '/login',
  Main: '/main',
  Profile: '/profile',
  Workout: '/workouts',
  Balance: '/balance',
  Create: '/create',
  Order: '/orders',
  Users: '/users',
  Friends: '/friends'
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER',
  Workout = 'WORKOUT',
  Balance = 'BALANCE',
  Order = 'ORDER'
}

export enum APIRoute {
  User = '/users',
  Interview = '/interview',
  CoachInterview = '/coach/interview',
  Workout = '/workouts',
  Review = '/reviews',
  Order = '/orders',
  Balance = '/balance',
  Friend = '/friends'
}

export const DEFAULT_PAGE_LIMIT = 6;

export const IMAGE_PATH = 'http://localhost:3000/static/';
