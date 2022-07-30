import React from "react"
import FinalRegistration from "../screens/FinalRegistration"
import UserHome from "../screens/UserHome"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Summary from "../screens/Summary"
import History from "../screens/History"
import SendPackage from "../screens/SendPackage"
import SignOut from "../screens/SignOut"
import CustomDrawer from "./CustomDrawer"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export type MainDrawerParamList = {
    UserHome: { email: string, userID: string }
    FinalRegistration: undefined
    Summary: undefined
    History: undefined
    SendPackage: undefined
    SignOut: undefined
}


const MainDrawer: React.FunctionComponent<MainDrawerParamList> = () => {
    const { Navigator, Screen } = createDrawerNavigator<MainDrawerParamList>()

    return (
        <Navigator initialRouteName="UserHome" drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ drawerLabelStyle: { marginLeft: -20 } }}>
            <Screen name="UserHome" component={UserHome} options={{
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
            <Screen name="Summary" component={Summary} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={22} color={color} />
                ),
                title: "Sommaire",
                headerTintColor: "white",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: "#2c3e50" },
                headerTitleStyle: { color: "white" }
            }} />
            <Screen name="History" component={History} options={{
                drawerIcon: ({ color }) => (
                    <MaterialIcons name="history" size={22} color={color} />
                ),
                title: "Historique",
                headerTintColor: "white",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: "#2c3e50" },
                headerTitleStyle: { color: "white" }
            }} />
            <Screen name="SendPackage" component={SendPackage} options={{
                drawerIcon: ({ color }) => (
                    <MaterialCommunityIcons name="cube-send" size={22} color={color} />
                ),
                title: "Envoyer un paquet",
                headerTintColor: "white",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: "#2c3e50" },
                headerTitleStyle: { color: "white" }
            }} />
            <Screen name="FinalRegistration" component={FinalRegistration} options={{
                drawerIcon: ({ color }) => (
                    <AntDesign name="setting" size={22} color={color} />
                ),
                title: "Réglages",
                headerTintColor: "white",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: "#2c3e50" },
                headerTitleStyle: { color: "white" }
            }} />
            <Screen name="SignOut" component={SignOut} options={{
                drawerIcon: ({ color }) => (
                    <AntDesign name="logout" size={22} color={color} />
                ),
                title: "Déconnexion"
            }} />
        </Navigator>
    )
}

export default MainDrawer
