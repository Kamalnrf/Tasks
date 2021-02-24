import React from 'react'
import {render as rtlRender} from '@testing-library/react-native'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

function render(ui: JSX.Element, {...renderOptions} = {}) {
  function Wrapper({children}: {children: JSX.Element}) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

export * from '@testing-library/react-native'

export {render}
