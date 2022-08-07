import React from "react"
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, StatusBar, TouchableOpacity } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import Btn from "../components/Btn"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

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

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.userName}>The username here !</Text>
                        <Text style={styles.dateSubscription}>Inscris depuis le...</Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-around", width: "80%", marginTop: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.text}>2</Text>
                                <MaterialCommunityIcons name="cube-send" size={15} color="#2c3e50" />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.text}>0</Text>
                                <MaterialCommunityIcons name="truck" size={15} color="#2c3e50" />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.text}>0</Text>
                                <MaterialCommunityIcons name="airplane-takeoff" size={15} color="#2c3e50" />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.infosBox}>
                    <View style={{ flexDirection: "row", marginBottom: 20 }}>
                        <FontAwesome style={{ marginEnd: 10 }} name="birthday-cake" size={18} color="#2c3e50" />
                        <Text style={styles.text3}>Birthdate here !</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 20 }}>
                        <Entypo style={{ marginEnd: 10 }} name="location" size={18} color="#2c3e50" />
                        <Text style={styles.text3}>Adresse here !</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 20 }}>
                        <MaterialCommunityIcons style={{ marginEnd: 10 }} name="phone" size={18} color="#2c3e50" />
                        <Text style={styles.text3}>Phone here !</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginBottom: 20 }}>
                        <FontAwesome style={{ marginEnd: 10 }} name="credit-card-alt" size={18} color="#2c3e50" />
                        <Text style={styles.text3}>Credit card infos number here !</Text>
                    </View>

                    <TouchableOpacity style={{ flexDirection: "row", backgroundColor: "#2c3e50", height: 50, justifyContent: "center", alignItems: "center", borderRadius: 30 }}>
                        <FontAwesome5 style={{ marginEnd: 10 }} name="user-cog" size={18} color="#f39c12" />
                        <Text style={styles.text2}>Réglages profil</Text>
                    </TouchableOpacity>
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

                {/* <View style={styles.footer}></View> */}
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    logoBox: {
        flex: 1,
        flexDirection: "row"
    },

    userLogo: {
        width: 150,
        height: 150,
        marginTop: 15,
        marginLeft: 15,
        borderWidth: 1,
        borderColor: "#bdc3c7",
        borderRadius: 5
    },

    logoTxtBox: {
        flex: 1,
        width: "100%",
        borderTopWidth: 4,
        borderRadius: 15,
        borderColor: "#2c3e50",
        alignItems: "center"
    },

    exportButton: {
        marginTop: 25,
        backgroundColor: "#f39c12",
        marginVertical: 10,
        width: "85%",
        height: 50,
        padding: 12,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center"
    },

    transportButton: {
        backgroundColor: "#f39c12",
        marginBottom: 10,
        width: "85%",
        height: 50,
        padding: 12,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center"
    },

    saleButton: {
        backgroundColor: "#f39c12",
        marginBottom: 10,
        width: "85%",
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
        color: "#2c3e50",
        marginStart: 5,
        textAlignVertical: "center",
        fontSize: 12
    },

    text2: {
        color: "#f39c12",
        marginStart: 5,
        textAlignVertical: "center",
        fontSize: 12
    },

    userName: {
        color: "black",
        fontWeight: "bold",
        fontSize: 15
    },

    infosBox: {
        flex: 1,
        margin: 50,
        justifyContent: "space-around"
    },

    dateSubscription: {
        color: "black",
        fontSize: 12
    },

    text: {
        color: "black",
        fontSize: 15,
        marginRight: 5,
        textAlignVertical: "center"
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
        height: 400,
        backgroundColor: "#bdc3c7"
    },

    footer: {
        width: "100%",
        height: 20,
        backgroundColor: "#2c3e50",
        justifyContent: "flex-end"
    }
})

export default UserHome