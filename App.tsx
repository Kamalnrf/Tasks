import {StatusBar} from 'expo-status-bar'
import React from 'react'
import Home from './src/Home'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import AppLoading from 'expo-app-loading'
import AppProvider from './src/providers'

const fonts = {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
}

export default function App() {
  const [fontsLoaded] = useFonts(fonts)

  if (!fontsLoaded) return <AppLoading />

  return (
    <AppProvider>
      <StatusBar backgroundColor="#212227" style="light" />
      <Home />
    </AppProvider>
  )
}
