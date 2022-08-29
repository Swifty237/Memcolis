import React, { useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Connection from "../screens/Connection"
import Registration from "../screens/Registration"
import { UserContext } from "../utils/UserContext"
import MainDrawer from "./MainDrawer"
import { MainDrawerParamList } from "./MainDrawer"
import { NavigatorScreenParams } from "@react-navigation/native"
import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage"
import HelpCenter from "../screens/HelpCenter"
import Welcome from "../screens/Welcome"


export type MainStackParamList = {
    Connection: undefined
    Registration: undefined
    Welcome: { email: string, userID: string }
    MainDrawer: NavigatorScreenParams<MainDrawerParamList>
    HelpCenter: undefined
}



const Main: React.FunctionComponent<MainStackParamList> = () => {

    console.log("-------------------------------------------------------------- Main ----------------------------------------------------------------")
    const storage = new MMKVLoader().initialize()

    enum STACKCHOICE { SIGN_IN, LOGGED }
    const { Navigator, Screen, Group } = createNativeStackNavigator<MainStackParamList>()
    const [isLoggedIn, setIsLoggedIn] = useMMKVStorage<STACKCHOICE.SIGN_IN | STACKCHOICE.LOGGED>("isLoggedIn", storage, STACKCHOICE.SIGN_IN)
    const [userEmail, setUserEmail] = useMMKVStorage<string>("Email", storage, "")
    const [userPassword, setUserPassword] = useMMKVStorage<string>("Password", storage, "")
    const [userUID, setUserUID] = useMMKVStorage<string>("UID", storage, "")
    const [databaseImagesList, setDatabaseImagesList] = useState<string[]>([])

    console.log("isLoggedIn: ", isLoggedIn)

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, userPassword, setUserPassword, userUID, setUserUID, databaseImagesList, setDatabaseImagesList }}>
            <Navigator initialRouteName={isLoggedIn === STACKCHOICE.LOGGED ? "MainDrawer" : "Connection"}>
                {isLoggedIn === STACKCHOICE.LOGGED ?
                    <Screen name="MainDrawer" component={MainDrawer} options={{ headerShown: false }} />
                    :
                    <Group>
                        <Screen name="Connection" component={Connection} options={{ headerShown: false }} />
                        <Screen name="HelpCenter" component={HelpCenter} options={{ headerShown: false }} />
                        <Screen name="Registration" component={Registration} options={{
                            title: "Inscription",
                            headerTintColor: "white",
                            headerTitleAlign: "center",
                            headerStyle: { backgroundColor: "#2c3e50" },
                            headerTitleStyle: { color: "white" }
                        }} />
                        <Screen
                            name="Welcome"
                            component={Welcome}
                            options={{ headerShown: false }}
                            initialParams={{ email: "", userID: "" }} />

                    </Group>
                }
            </Navigator>
        </UserContext.Provider>
    )
}

export default Main