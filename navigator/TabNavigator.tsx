import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import HomeScreen from '../screens/HomeScreen'

export type TabStackParamList = {
  Home: undefined
  // add other tab types here
}

const Tab = createBottomTabNavigator<TabStackParamList>()

const TabNavigator = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      {/* Add the other tabs here */}
    </Tab.Navigator>
  )
}

export default TabNavigator
