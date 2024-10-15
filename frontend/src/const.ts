export const AppRoutes = {
  Intro: '/',
  Register: '/register',
  Interview: '/interview',
  Login: '/login',
  Main: '/main',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER'
}

export enum APIRoute {
  Users = '/users',
  Interview = '/interview'
}
