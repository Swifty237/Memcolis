import React from "react"
import RegistrationComplete from "../screens/RegistrationComplete"
import UserHome from "../screens/UserHome"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Summary from "../screens/Summary"
import History from "../screens/History"
import SendPackage from "../screens/SendPackage"
import CustomDrawer from "../components/CustomDrawer"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export type MainDrawerParamList = {
    Summary: { email: string, userID: string }
    UserHome: { email: string, userID: string }
    RegistrationComplete: undefined
    History: undefined
    SendPackage: undefined
}


const MainDrawer: React.FunctionComponent<MainDrawerParamList> = () => {
    const { Navigator, Screen } = createDrawerNavigator<MainDrawerParamList>()

    return (
        <Navigator
            initialRouteName="Summary"
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{ drawerLabelStyle: { marginLeft: -20 } }}>

            <Screen
                name="Summary"
                component={Summary}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    ),
                    title: "Home",
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "#2c3e50" },
                    headerTitleStyle: { color: "white" },
                }}
                initialParams={{ email: "", userID: "" }} />

            <Screen
                name="UserHome"
                component={UserHome}
                options={{
                    drawerIcon: ({ color }) => (
                        <AntDesign name="user" size={22} color={color} />
                    ),
                    title: "Profil",
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "#2c3e50" },
                    headerTitleStyle: { color: "white" }
                }}
                initialParams={{ email: "", userID: "" }} />

            <Screen
                name="History"
                component={History}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialIcons name="history" size={22} color={color} />
                    ),
                    title: "Historique",
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "#2c3e50" },
                    headerTitleStyle: { color: "white" }
                }} />

            <Screen
                name="SendPackage"
                component={SendPackage}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cube-send" size={22} color={color} />
                    ),
                    title: "Envoyer un colis",
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "#2c3e50" },
                    headerTitleStyle: { color: "white" }
                }} />

            <Screen
                name="RegistrationComplete"
                component={RegistrationComplete}
                options={{
                    drawerIcon: ({ color }) => (
                        <AntDesign name="setting" size={22} color={color} />
                    ),
                    title: "Réglages",
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "#2c3e50" },
                    headerTitleStyle: { color: "white" }
                }} />
        </Navigator>
    )
}

export default MainDrawer
