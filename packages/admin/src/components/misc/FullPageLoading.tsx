import { Spin } from 'antd'
import { ReactNode } from 'react'

interface FullPageLoadingProps {
  children?: ReactNode
}

const FullPageLoading = ({ children }: FullPageLoadingProps) => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <Spin size="large" />
      {children}
    </div>
  )
}

export default FullPageLoading
