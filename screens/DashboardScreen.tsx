import React from 'react'
import { View } from 'react-native'
import AdminDashboardScreen from '../components/dashboards/AdminDashboardScreen'
import AnalystDashboardScreen from '../components/dashboards/AnalystDashboardScreen'
import LawyerDashboardScreen from '../components/dashboards/LawyerDashboardScreen'
import UserDashboardScreen from '../components/dashboards/UserDashboardScreen'
import { useAuth } from '../store'

type Props = {}

const DashboardScreen = (props: Props) => {
    const user = useAuth((state) => state.user)
   return (
    <View>
        {user && user?.role === "user" ? <UserDashboardScreen /> : null}
       {user && user?.role === "analyst" ? <AnalystDashboardScreen /> : null}
       {user && user?.role === "lawyer" ? <LawyerDashboardScreen /> : null}
       {user && user?.role === "admin" ? <AdminDashboardScreen /> : null}
    </View>
   )
}

export default DashboardScreen