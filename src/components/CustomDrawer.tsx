import React, { useContext } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { UserContext } from "../utils/UserContext"
import auth from "@react-native-firebase/auth"



const CustomDrawer = (props: any) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)
    enum STACKCHOICE { SIGN_IN, LOGGED }



    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props} >
                <View style={styles.logo}>
                    <Image source={require("../assets/logo_Memcolis.png")} style={styles.image} />
                    <Text style={styles.memcolis}>Memcolis</Text>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.btn}>
                <TouchableOpacity onPress={() => {

                }}>
                    <Text style={styles.text}>Déconnexion</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    logo: {
        alignItems: "center",
        padding: 20
    },

    image: {
        width: 55,
        height: 55,
        margin: 20
    },

    memcolis: {
        color: "white",
        marginStart: 5,
        fontSize: 17
    },

    btn: {
        margin: 30
    },

    text: {
        color: "black"
    }
})

export default CustomDrawer
