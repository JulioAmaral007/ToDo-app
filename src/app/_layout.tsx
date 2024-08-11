import { initializeDatabase } from '@/database/initializeDatabase'
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { SQLiteProvider } from 'expo-sqlite'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import '../styles/global.css'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }
  return (
    <>
      <StatusBar style="dark" />
      <SQLiteProvider databaseName="database.db" onInit={initializeDatabase}>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: 'Home',
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="+not-found"   
              options={{
                title: 'Not-Found',
                headerShown: false,
              }} 
            />
          </Stack>
        </GestureHandlerRootView>
      </SQLiteProvider>
    </>
  )
}
