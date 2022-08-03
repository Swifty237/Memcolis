import React from "react"
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, StatusBar } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import TopBar from "../components/TopBar"



type UserHomeProps = NativeStackScreenProps<MainDrawerParamList, "UserHome">

const UserHome: React.FunctionComponent<UserHomeProps> = ({ navigation, route }) => {
    const { email, userID } = route.params
    console.log("email: ", email)
    console.log("userID: ", userID)

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#2c3e50" />
            <ScrollView>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    text: {
        color: "white",
        fontSize: 11,
        width: 150,
        textAlign: "right",
        marginEnd: 5
    },

    headerText: {
        color: "white",
        width: 250,
        textAlign: "center",
        fontSize: 17,
        marginTop: 50,
        fontStyle: "italic"
    },

    header: {
        height: 250,
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        backgroundColor: "#2c3e50",
        justifyContent: "center",
        textAlign: ""
    },

    logo: {
        flexDirection: "row",
        alignItems: "flex-end"
    },

    image: {
        width: 55,
        height: 55
    },

    memcolis: {
        color: "white",
        marginStart: 5,
        fontSize: 17
    }
})

export default UserHome