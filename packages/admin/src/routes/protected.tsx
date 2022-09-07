import { Suspense } from 'react'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'
import FullPageLoading from '@/components/misc/FullPageLoading'
import { dashboardRoutes } from '@/features/dashboard'
import { profileRoutes } from '@/features/profile'
import MainLayout from '@/layouts/MainLayout'
import { MenuRouteItem } from '@/types'
import { FolderOutlined } from '@ant-design/icons'

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<FullPageLoading />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

export const menuRoutes: MenuRouteItem[] = [

]

export const protectedRoutes: RouteObject[] = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: 'profile', children: profileRoutes },
      { path: '', children: dashboardRoutes },
      ...menuRoutes,
      { path: '*', element: <Navigate to="." /> }
    ]
  }
]
