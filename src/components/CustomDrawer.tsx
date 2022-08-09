import React, { useContext } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { UserContext } from "../utils/UserContext"
import auth from "@react-native-firebase/auth"
import AntDesign from "react-native-vector-icons/AntDesign"




const CustomDrawer = (props: any) => {
    const { isLoggedIn, setIsLoggedIn, setUserEmail, setUserUID, setUserPassword } = useContext(UserContext)
    enum STACKCHOICE { SIGN_IN, LOGGED }


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} >
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Image source={require("../assets/logo_Memcolis.png")} style={styles.image} />
                        <Text style={styles.memcolis}>Memcolis</Text>
                    </View>
                    <View>
                        <Image source={require("../assets/user.jpg")} style={styles.userLogo} />
                    </View>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <View style={styles.btn}>
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => {
                    auth()
                        .signOut()
                        .then(() => {
                            isLoggedIn === STACKCHOICE.LOGGED && setIsLoggedIn(STACKCHOICE.SIGN_IN)
                            setUserEmail("")
                            setUserPassword("")
                            setUserUID("")
                            props.navigation.navigate("Connection")
                            console.log('User signed out!')
                        })
                }}>
                    <AntDesign name="logout" size={22} color="black" />
                    <Text style={styles.text}>Déconnexion</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    logoContainer: {
        marginTop: -4,
        height: 200,
        backgroundColor: "#2c3e50"
    },

    logo: {
        flexDirection: "row",
        alignItems: "flex-end",
        padding: 5
    },

    image: {
        width: 30,
        height: 30
    },

    memcolis: {
        color: "white",
        marginStart: 5,
        fontSize: 12
    },

    btn: {
        margin: 30
    },

    text: {
        color: "black",
        marginStart: 10
    },

    userLogo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#bdc3c7",
        borderRadius: 5
    }
})

export default CustomDrawer
