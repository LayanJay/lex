import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'

export type RootStackParamList = {
  Main: undefined
  Modal: {
    userId: string
    name: string
  }
  //   add the other types for the pages
}

const RootStack = createNativeStackNavigator()

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name='Main' component={TabNavigator} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootNavigator
