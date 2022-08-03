import React, { useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Connection from "../screens/Connection"
import Registration from "../screens/Registration"
import Summary from "../screens/Summary"
import Welcome from "../screens/Help"
import { UserContext } from "../utils/UserContext"
import MainDrawer from "./MainDrawer"
import { MainDrawerParamList } from "./MainDrawer"
import { NavigatorScreenParams } from "@react-navigation/native"
import Help from "../screens/Help"
import { MMKVLoader, useMMKVStorage } from "react-native-mmkv-storage"


export type MainStackParamList = {
    Connection: undefined
    Registration: undefined
    Welcome: { email: string, userID: string }
    Help: undefined
    MainDrawer: NavigatorScreenParams<MainDrawerParamList>
}

const storage = new MMKVLoader().initialize()

const Main: React.FunctionComponent<MainStackParamList> = () => {

    console.log("-------------------------------------------------------------- Main ----------------------------------------------------------------")

    enum STACKCHOICE { SIGN_IN, LOGGED }
    const { Navigator, Screen, Group } = createNativeStackNavigator<MainStackParamList>()
    const [isLoggedIn, setIsLoggedIn] = useMMKVStorage<STACKCHOICE.SIGN_IN | STACKCHOICE.LOGGED>("isLoggedIn", storage, STACKCHOICE.SIGN_IN)
    const [userEmail, setUserEmail] = useMMKVStorage<string>("Email", storage, "")
    const [userPassword, setUserPassword] = useMMKVStorage<string>("Password", storage, "")
    const [userUID, setUserUID] = useMMKVStorage<string>("UID", storage, "")


    // const [isLoggedIn, setIsLoggedIn] = useState<STACKCHOICE.SIGN_IN | STACKCHOICE.LOGGED>(STACKCHOICE.SIGN_IN)
    // const [userEmail, setUserEmail] = useState<string>("")
    // const [userPassword, setUserPassword] = useState<string>("")
    // const [userUID, setUserUID] = useState<string>("")

    console.log("isLoggedIn: ", isLoggedIn)

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, userPassword, setUserPassword, userUID, setUserUID }}>
            <Navigator initialRouteName={isLoggedIn === STACKCHOICE.LOGGED ? "MainDrawer" : "Connection"}>
                {isLoggedIn === STACKCHOICE.LOGGED ?
                    <Group>
                        <Screen name="MainDrawer" component={MainDrawer} options={{ headerShown: false }} />
                        <Screen name="Welcome" component={Welcome} options={{ headerShown: false }} initialParams={{ email: "", userID: "" }} />
                    </Group>
                    :
                    <Group>
                        <Screen name="Help" component={Help} options={{
                            title: "Help",
                            headerTintColor: "white",
                            headerTitleAlign: "center",
                            headerStyle: { backgroundColor: "#2c3e50" },
                            headerTitleStyle: { color: "white" }
                        }} />
                        <Screen name="Connection" component={Connection} options={{ headerShown: false }} />
                        <Screen name="Registration" component={Registration} options={{
                            title: "Inscription",
                            headerTintColor: "white",
                            headerTitleAlign: "center",
                            headerStyle: { backgroundColor: "#2c3e50" },
                            headerTitleStyle: { color: "white" }
                        }} />
                    </Group>
                }
            </Navigator>
        </UserContext.Provider>
    )
}

export default Main