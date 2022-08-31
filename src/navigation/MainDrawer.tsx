import React, { useState } from "react"
import Settings from "../screens/Settings"
import UserHome from "../screens/UserHome"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Summary from "../screens/Summary"
import History from "../screens/History"
import SendPackage from "../screens/SendPackage"
import MakeTransport from "../screens/MakeTransport"
import SaleKg from "../screens/SaleKg"
import Gallery from "../screens/Gallery"
import CustomDrawer from "../components/CustomDrawer"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import HelpCenter from "../screens/HelpCenter"
import { DrawerContext } from "../utils/UserContext"



export type MainDrawerParamList = {
    Summary: { email: string, userID: string }
    UserHome: undefined
    Settings: { profile?: boolean, idCard?: boolean, proofOfAdress?: boolean, rib?: boolean, bankCard?: boolean }
    History: { email: string, userID: string }
    SendPackage: undefined
    MakeTransport: undefined
    SaleKg: undefined
    Gallery: undefined
    HelpCenter: undefined
}


const MainDrawer: React.FunctionComponent<MainDrawerParamList> = () => {
    const { Navigator, Screen } = createDrawerNavigator<MainDrawerParamList>()
    const [profile, setProfile] = useState<boolean>(false)
    const [idCard, setIdCard] = useState<boolean>(false)
    const [proofOfAdress, setProofOfAdress] = useState<boolean>(false)
    const [rib, setRib] = useState<boolean>(false)
    const [bankCard, setBankCard] = useState<boolean>(false)


    return (
        <DrawerContext.Provider value={{ profile, setProfile, idCard, setIdCard, proofOfAdress, setProofOfAdress, rib, setRib, bankCard, setBankCard }}>
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
                        title: "Accueil",
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
                    name="MakeTransport"
                    component={MakeTransport}
                    options={{
                        drawerIcon: ({ color }) => (
                            <MaterialCommunityIcons name="truck" size={22} color={color} />
                        ),
                        title: "Transporter",
                        headerTintColor: "white",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: "#2c3e50" },
                        headerTitleStyle: { color: "white" }
                    }} />

                <Screen
                    name="SaleKg"
                    component={SaleKg}
                    options={{
                        drawerIcon: ({ color }) => (
                            <MaterialCommunityIcons name="airplane-takeoff" size={22} color={color} />
                        ),
                        title: "Vendre mes kg",
                        headerTintColor: "white",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: "#2c3e50" },
                        headerTitleStyle: { color: "white" }
                    }} />

                <Screen
                    name="Gallery"
                    component={Gallery}
                    options={{
                        drawerIcon: ({ color }) => (
                            <MaterialIcons name="photo-library" size={22} color={color} />
                        ),
                        title: "Gallery",
                        headerTintColor: "white",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: "#2c3e50" },
                        headerTitleStyle: { color: "white" }
                    }} />

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
                    }}
                    initialParams={{ email: "", userID: "" }} />

                <Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        drawerIcon: ({ color }) => (
                            <AntDesign name="setting" size={22} color={color} />
                        ),
                        title: "Réglages",
                        headerTintColor: "white",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: "#2c3e50" },
                        headerTitleStyle: { color: "white" }
                    }}
                    initialParams={{ profile: false, idCard: false, proofOfAdress: false, rib: false }} />

                <Screen
                    name="HelpCenter"
                    component={HelpCenter}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="globe-outline" size={22} color={color} />
                        ),
                        title: "Centre d'aide",
                        headerTintColor: "white",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: "#2c3e50" },
                        headerTitleStyle: { color: "white" }
                    }} />
            </Navigator>
        </DrawerContext.Provider>
    )
}

export default MainDrawer
