import React, { useState, useContext } from "react"
import { StyleSheet, Text, View, StatusBar, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import { Picker } from "@react-native-picker/picker"
import Sender from "../components/Sender"
import Transporter from "../components/Tansporter"
import Traveler from "../components/Traveler"
import { UserContext } from "../utils/UserContext"
import { MainDrawerParamList } from "../navigation/MainDrawer"
// import type { RouteProp } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"


type SummaryProp = NativeStackScreenProps<MainDrawerParamList, "Summary">

const Summary: React.FunctionComponent<SummaryProp> = ({ navigation, route }) => {
    const [profil, setProfil] = useState<"expéditeur" | "transporteur" | "voyageur">("expéditeur")
    const { userEmail, userUID } = useContext(UserContext)
    const { email, userID } = route.params


    const getProfil = (profil: string) => {
        switch (profil) {
            case "expéditeur":
                return <Sender email={email ? email : userEmail} userID={userID ? userID : userUID} />
                break

            case "transporteur":
                return <Transporter email={email ? email : userEmail} userID={userID ? userID : userUID} />
                break

            case "voyageur":
                return <Traveler email={email ? email : userEmail} userID={userID ? userID : userUID} />
                break
            default:
                return
        }
    }



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#2c3e50" />

            <View style={{ width: "100%", alignItems: "center", borderBottomWidth: 4, borderRadius: 15, backgroundColor: "white" }}>
                <View style={{ flexDirection: "row", width: "95%", marginVertical: 10, justifyContent: "space-around", alignItems: "center" }}>
                    <TouchableOpacity
                        style={{ width: 100, height: 40, backgroundColor: "#2c3e50", justifyContent: "center", alignItems: "center", borderRadius: 30 }}
                        onPress={() => navigation.navigate("SendPackage")}>
                        <MaterialCommunityIcons name="cube-send" size={25} color="#f39c12" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ width: 100, height: 40, backgroundColor: "#2c3e50", justifyContent: "center", alignItems: "center", borderRadius: 30 }}
                        onPress={() => navigation.navigate("MakeTransport")}>
                        <MaterialCommunityIcons name="truck" size={25} color="#f39c12" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ width: 100, height: 40, backgroundColor: "#2c3e50", justifyContent: "center", alignItems: "center", borderRadius: 30 }}
                        onPress={() => navigation.navigate("SaleKg")}>
                        <MaterialCommunityIcons name="airplane-takeoff" size={25} color="#f39c12" />
                    </TouchableOpacity>
                </View>

                <View style={styles.pickerBox}>
                    <Picker
                        dropdownIconColor="white"
                        selectedValue={profil}
                        onValueChange={(e) => setProfil(e)}>

                        <Picker.Item style={{ color: "#f39c12" }} label="Mode expéditeur" value="expéditeur" />
                        <Picker.Item style={{ color: "#f39c12" }} label="Mode transporteur" value="transporteur" />
                        <Picker.Item style={{ color: "#f39c12" }} label="Mode voyageur" value="voyageur" />

                    </Picker>
                </View>
            </View>


            <ScrollView contentContainerStyle={{ alignItems: "center", marginTop: 20 }}>

                <Text style={styles.actuText}>Actualités & Offres promotionelles</Text>
                <View style={styles.actuContent}>

                </View>

                {getProfil(profil)}

                {/* <View style={styles.footer}></View> */}
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },

    actuText: {
        marginTop: 40,
        marginBottom: 10,
        width: "100%",
        color: "black",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center"
    },

    actuContent: {
        width: "100%",
        height: 200,
        backgroundColor: "#bdc3c7",
        marginBottom: 50
    },

    picker: {
        color: "black",
    },

    text: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },

    profilText: {
        marginTop: 10,
        marginBottom: 10,
        width: "90%",
        color: "black",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "left",
        paddingStart: 20
    },

    footer: {
        width: "100%",
        height: 20,
        backgroundColor: "#2c3e50",
        marginTop: 5
    },

    pickerBox: {
        backgroundColor: "#2c3e50",
        width: "70%",
        height: 50,
        justifyContent: "center",
        paddingStart: 20,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    }
})

export default Summary