import React from 'react'
import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import shallow from 'zustand/shallow'
import Button from '../components/Button'
import AdminDashboardScreen from '../components/dashboards/AdminDashboardScreen'
import AnalystDashboardScreen from '../components/dashboards/AnalystDashboardScreen'
import LawyerDashboardScreen from '../components/dashboards/LawyerDashboardScreen'
import UserDashboardScreen from '../components/dashboards/UserDashboardScreen'
import withProtected from '../hooks/auth/withProtected'
import { useAuth } from '../store'

type Props = {}

const DashboardScreen = (props: Props) => {
  const tailwind = useTailwind()
  const [user, signOut] = useAuth(state => [state.user, state.signOut], shallow)
  return (
    <View>
      {user && user?.role === 'user' ? <UserDashboardScreen /> : null}
      {user && user?.role === 'analyst' ? <AnalystDashboardScreen /> : null}
      {user && user?.role === 'lawyer' ? <LawyerDashboardScreen /> : null}
      {user && user?.role === 'admin' ? <AdminDashboardScreen /> : null}
      <View style={tailwind('p-4')}>
        <Button onPress={signOut} text={'Sign out'} />
      </View>
    </View>
  )
}

export default withProtected(DashboardScreen)
