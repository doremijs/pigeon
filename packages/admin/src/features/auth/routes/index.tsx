// import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import Login from './Login'

// const Login = lazy(() => import('./Login'))
// const Register = lazy(() => import('./Register'))
// const Forgot = lazy(() => import('./Forgot'))

export const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <Login />
  },
  // {
  //   path: 'register',
  //   element: <Register />
  // }
  // {
  //   path: 'forgot',
  //   element: <Forgot />
  // }
]
