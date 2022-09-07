import { RouteObject, useRoutes } from 'react-router-dom'
import { protectedRoutes } from './protected'
import { publicRoutes } from './public'
import Landing from '@/components/misc/Landing'
import { useAuthorized } from '@/stores/auth'

const commonRoutes: RouteObject[] = [{ path: '/', element: <Landing /> }]

export const AppRoutes = () => {
  const { loggedIn } = useAuthorized()
  console.log('looggedId', loggedIn)
  const routes = loggedIn ? protectedRoutes : publicRoutes
  const element = useRoutes([...routes, ...commonRoutes])
  return <>{element}</>
}
