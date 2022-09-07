import { Suspense } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'
import FullPageLoading from '@/components/misc/FullPageLoading'
import { authRoutes } from '@/features/auth'
import AuthLayout from '@/layouts/AuthLayout'

const App = () => {
  return (
    <AuthLayout>
      <Suspense fallback={<FullPageLoading />}>
        <Outlet />
      </Suspense>
    </AuthLayout>
  )
}

export const publicRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <App />,
    children: authRoutes
  }
]
