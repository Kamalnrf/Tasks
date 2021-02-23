import React from 'react'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

const AppProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        {children}
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default AppProvider
