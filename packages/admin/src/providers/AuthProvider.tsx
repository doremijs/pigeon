import { useEffect } from 'react'
import { ReactNode } from 'react'
import { useAuth } from '@/stores'
import { useLocation, useNavigate } from 'react-router-dom'
interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  // const isLoggedIn = useAuthorized()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // for test
  // useEffect(() => {
  //   if (isLoggedIn && pathname.startsWith('/auth')) {
  //     navigate('/app', { replace: true })
  //   } else {
  //     navigate('/auth/login', { replace: true })
  //   }
  // }, [isLoggedIn, pathname])
  const { token, initialize } = useAuth()
  useEffect(() => {
    async function onTokenChange() {
      if (token) {
        if (await initialize()) {
          // 如果当前在 /auth 页面
          if (pathname.startsWith('/auth')) {
            navigate('/app')
          }
        }
      } else if (!pathname.startsWith('/auth')) {
        navigate('/auth/login', { replace: true })
      }
    }
    onTokenChange()
  }, [token])
  return <>{children}</>
}

export default AuthProvider
