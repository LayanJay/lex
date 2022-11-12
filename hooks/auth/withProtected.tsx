import React from 'react'
import { Text, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { useAuth } from '../../store/index'

const withProtected = (Component: any) => {
  const WithProtected = (props: any) => {
    const tailwind = useTailwind()
    const [user, loading] = useAuth(s => [s.user, s.loading])

    if (!loading && !user) {
      props.navigation.navigate('Sign In')
    }

    if (!loading && user) {
      return <Component {...props} />
    }

    return (
      <View style={tailwind('p-4 flex items-center justify-center h-full')}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return WithProtected
}

export default withProtected
