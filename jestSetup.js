import {NativeModules as RNNativeModules} from 'react-native'

RNNativeModules.PlatformConstants = RNNativeModules.PlatformConstants || {
  forceTouchAvailable: false,
}

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
)

// // To solve this issue https://github.com/callstack/react-native-testing-library/issues/200
// const originalConsoleError = console.error

// console.error = (...args) => {
//   if (
//     !args[0].startsWith(
//       'Warning: An update to %s inside a test was not wrapped in act(...).',
//     )
//   ) {
//     originalConsoleError(...args)
//   }
// }
