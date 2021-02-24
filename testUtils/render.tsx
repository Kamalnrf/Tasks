import React from 'react'
import {render as rtlRender} from '@testing-library/react-native'
import {QueryClient, QueryClientProvider} from 'react-query'
import {SafeAreaProvider} from 'react-native-safe-area-context'

const queryClient = new QueryClient()

function render(ui: JSX.Element, {...renderOptions} = {}) {
  function Wrapper({children}: {children: JSX.Element}) {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider
          initialMetrics={{
            frame: {x: 0, y: 0, width: 0, height: 0},
            insets: {top: 0, left: 0, right: 0, bottom: 0},
          }}
        >
          {children}
        </SafeAreaProvider>
      </QueryClientProvider>
    )
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

export * from '@testing-library/react-native'

export {render}
