import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Profile = lazy(() => import('./Profile'))

export const profileRoutes: RouteObject[] = [
  {
    path: '',
    element: <Profile />
  }
]
