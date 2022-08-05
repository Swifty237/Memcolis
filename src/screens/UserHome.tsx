import React from "react"
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, StatusBar } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { MainDrawerParamList } from "../navigation/MainDrawer"
// import TopBar from "../components/TopBar"



type UserHomeProps = NativeStackScreenProps<MainDrawerParamList, "UserHome">

const UserHome: React.FunctionComponent<UserHomeProps> = ({ navigation, route }) => {
    const { email, userID } = route.params
    console.log("email: ", email)
    console.log("userID: ", userID)

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#2c3e50" />
            <ScrollView>
                <View style={styles.logoBox}>
                    <Image source={require("../assets/user.jpg")} style={styles.userLogo} />
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
                        <Text style={styles.userName}>The username here !</Text>
                        <Text style={styles.dateSubscription}>Inscris depuis le...</Text>
                        <Text style={styles.stars}>Nombre d'étoiles...</Text>
                    </View>
                </View>

                <View style={styles.logoTxtBox}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", borderWidth: 1, borderColor: "#bdc3c7", marginBottom: 15, height: 30, backgroundColor: "#2c3e50" }}>
                        <Text style={styles.text}>Expéditeur</Text>
                        <Text style={styles.text2}>A compléter</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", borderWidth: 1, borderColor: "#bdc3c7", marginBottom: 15, height: 30, backgroundColor: "#2c3e50" }}>
                        <Text style={styles.text}>Tansporteur</Text>
                        <Text style={styles.text2}>A compléter</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", borderWidth: 1, borderColor: "#bdc3c7", marginBottom: 15, height: 30, backgroundColor: "#2c3e50" }}>
                        <Text style={styles.text}>Voyageur</Text>
                        <Text style={styles.text2}>A compléter</Text>
                    </View>
                </View>

                <View style={styles.infoBox}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text3}>Date de naissance:</Text>
                        <Text></Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text3}>Adresse:</Text>
                        <Text></Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text3}>Tel:</Text>
                        <Text></Text>
                    </View>
                </View>

                <Text style={styles.historyText}>Derniers envois effectués</Text>
                <View style={styles.historyContent}>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    logoBox: {
        flexDirection: "row"
    },

    userLogo: {
        width: 100,
        height: 100,
        marginTop: 15,
        marginLeft: 15,
        borderWidth: 1,
        borderColor: "#bdc3c7",
        borderRadius: 5
    },

    logoTxtBox: {
        marginTop: 15,
        marginHorizontal: 15
    },

    text: {
        color: "#f39c12",
        fontWeight: "bold",
        marginStart: 5,
        textAlignVertical: "center"
    },

    text2: {
        color: "red",
        fontWeight: "bold",
        fontSize: 10,
        textAlignVertical: "center",
        marginEnd: 5
    },

    text3: {
        color: "black",
        fontWeight: "bold",
        marginStart: 5,
        textAlignVertical: "center"
    },

    userName: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18
    },

    infoBox: {
        margin: 25,
        height: 80,
        justifyContent: "space-around"
    },

    dateSubscription: {
        color: "black"
    },

    stars: {
        color: "black"
    },


    historyText: {
        marginTop: 50,
        marginBottom: 10,
        width: "90%",
        color: "black",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "left",
        paddingStart: 20
    },

    historyContent: {
        width: "100%",
        height: 200,
        backgroundColor: "#bdc3c7"
    },
})

export default UserHome