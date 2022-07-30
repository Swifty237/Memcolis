import React, { useContext, useEffect } from "react"
import { StyleSheet } from "react-native"
import { UserContext } from "../utils/UserContext"
import auth from "@react-native-firebase/auth"


const SignOut: React.FunctionComponent = () => {

    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)
    enum STACKCHOICE { SIGN_IN, LOGGED }

    useEffect(() => {
        auth()
            .signOut()
            .then(() => {
                isLoggedIn === STACKCHOICE.LOGGED && setIsLoggedIn(STACKCHOICE.SIGN_IN)
                console.log('User signed out!')
            })
    }, [])

    return <></>
}

export default SignOut