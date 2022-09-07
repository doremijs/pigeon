import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Dashboard = lazy(() => import('./Dashboard'))

export const dashboardRoutes: RouteObject[] = [
  {
    path: '',
    element: <Dashboard />
  }
]
