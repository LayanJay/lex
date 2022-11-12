import { TailwindProvider } from 'tailwind-rn'
import utilities from './tailwind.json'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './navigator/RootNavigator'
import { useFonts } from 'expo-font'
import { PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display'
import React, { useEffect } from 'react'
import { useAuth } from './store'
import shallow from 'zustand/shallow'
import { onAuthStateChanged } from 'firebase/auth'
import { getUserById } from './lib/queries/user'
import { auth } from './firebaseConfig'

const App = () => {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
  })

  const [setUser, setLoading] = useAuth(
    state => [state.setUser, state.setLoading],
    shallow
  )
  // listen for Firebase user state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async authState => {
      if (!authState) {
        setUser(null)
        setLoading(false)
        return
      }
      const userData = await getUserById(authState.uid)
      setUser({ ...authState, ...userData })
      setLoading(false)
    })
    return () => unsubscribe()
  }, [setLoading, setUser])

  if (!fontsLoaded) {
    return null
  } else {
    return (
      // @ts-ignore
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </TailwindProvider>
    )
  }
}

export default App
