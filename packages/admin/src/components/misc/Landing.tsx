import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthorized } from '@/stores'

const Landing = () => {
  const { loggedIn } = useAuthorized()
  const navigate = useNavigate()
  useEffect(() => {
    if (loggedIn) {
      navigate('/app')
    } else {
      navigate('/auth/login', { replace: true })
    }
  }, [loggedIn])
  return null
}

export default Landing
