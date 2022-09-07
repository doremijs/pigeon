import AppProvider from './providers/AppProvider'
import { AppRoutes } from './routes'

// import { AuthProvider } from '@/lib/auth'

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
