import React from 'react'
import { View } from 'react-native'
import { useAuth } from '../../store/index'

const withProtected = (Component: any) => {
  const WithProtected = (props: any) => {
    const [user, loading] = useAuth(s => [s.user, s.loading])

    if (!loading && !user) {
      props.navigation.navigate('Sign In')
    }

    if (!loading && user) {
      return <Component {...props} />
    }

    return <View>Loading</View>
  }

  return WithProtected
}

export default withProtected
