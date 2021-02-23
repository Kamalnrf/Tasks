import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

const AppProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default AppProvider
