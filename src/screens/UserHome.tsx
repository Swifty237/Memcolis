import React from "react"
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, StatusBar } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import Btn from "../components/Btn"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
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
                    <View style={styles.exportButton}>
                        <MaterialCommunityIcons style={{ marginEnd: 10 }} name="cube-send" size={22} color="#2c3e50" />
                        <Btn label="Devenir expéditeur" textStyle={styles.btnLabel2} onPress={() => { }} />
                    </View>
                    <View style={styles.transportButton}>
                        <MaterialCommunityIcons style={{ marginEnd: 10 }} name="truck" size={22} color="#2c3e50" />
                        <Btn label="Devenir transporteur" textStyle={styles.btnLabel2} onPress={() => { }} />
                    </View>
                    <View style={styles.saleButton}>
                        <MaterialCommunityIcons style={{ marginEnd: 10 }} name="airplane-takeoff" size={22} color="#2c3e50" />
                        <Btn label="Devenir voyageur" textStyle={styles.btnLabel2} onPress={() => { }} />
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
        marginHorizontal: 15,
        alignItems: "center"
    },

    exportButton: {
        backgroundColor: "#f39c12",
        marginVertical: 10,
        width: "98%",
        height: 50,
        padding: 12,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center"
    },

    transportButton: {
        backgroundColor: "#f39c12",
        marginBottom: 10,
        width: "98%",
        height: 50,
        padding: 12,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center"
    },

    saleButton: {
        backgroundColor: "#f39c12",
        marginBottom: 10,
        width: "98%",
        height: 50,
        padding: 12,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center"
    },

    btnLabel2: {
        color: "#2c3e50",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
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