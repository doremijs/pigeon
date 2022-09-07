import { ReactNode } from 'react'

interface AuthLayoutProps {
  children?: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-stretch" style={{
      backgroundColor: '#0093E9',
      backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'
    }}>
      <div className="flex flex-col flex-1 min-h-64 items-center justify-center">
        <div className="rounded p-12 xl:p-16 bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
