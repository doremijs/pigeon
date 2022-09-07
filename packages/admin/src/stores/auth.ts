import create from 'zustand'
import { User } from '@/types'
import { services } from '@/services'
import { ApiDocuments } from '@/services/a2s.namespace'

const tokenKey = '_pigeon_token'

type AuthStore = {
  token: string | null
  user: User | null
  setUser: (user: User | null) => void
  initialize: () => Promise<User | null>
  login: (params: ApiDocuments.LoginDto) => Promise<boolean>
  logout: () => void
}

export const useAuth = create<AuthStore>((set, get) => ({
  token: (localStorage.getItem(tokenKey) as string | undefined) || null,
  user: null,
  setUser: user => set(() => ({ user })),
  initialize: async () => {
    const token = get().token
    if (token) {
      const { error, data } = await services['认证@个人信息']()
      // set(() => ({ inited: true }))
      if (!error) {
        set(() => ({ user: data.user }))
        return data.user
      }
    }
    return null
  },
  login: async (params: ApiDocuments.LoginDto) => {
    const { error, data } = await services['认证@登录'](params)
    if (!error) {
      const { token, user } = data
      localStorage.setItem(tokenKey, token)
      set(() => ({ token, user }))
      return true
    }
    return false
  },
  logout: () => {
    localStorage.removeItem(tokenKey)
    set(() => ({ token: null, user: null }))
  }
}))

export const useAuthorized = () => {
  const loggedIn = useAuth(state => !!state.user)
  return { loggedIn }
}
