import { Button } from 'antd'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './AuthProvider'
import FullPageLoading from '@/components/misc/FullPageLoading'

const ErrorFallback = () => {
  return (
    <div
      className="flex flex-col h-screen w-screen text-red-500 justify-center items-center"
      role="alert"
    >
      <h2 className="font-semibold text-lg">Oh no! 页面出错了！( </h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        刷新
      </Button>
    </div>
  )
}

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<FullPageLoading />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <AuthProvider>{children}</AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </Suspense>
  )
}

export default AppProvider
