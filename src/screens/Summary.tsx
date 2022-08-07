import React, { useState, useContext } from "react"
import { StyleSheet, Text, View, StatusBar, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import { Picker } from "@react-native-picker/picker"
import Sender from "../components/Sender"
import Transporter from "../components/Tansporter"
import Traveler from "../components/Traveler"
import { UserContext } from "../utils/UserContext"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import type { RouteProp } from "@react-navigation/native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"



type SummaryProp = { route: RouteProp<MainDrawerParamList, "Summary"> }

const Summary: React.FunctionComponent<SummaryProp> = ({ route }) => {
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

            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <View style={{ flexDirection: "row", width: "95%", marginVertical: 20, justifyContent: "space-around", alignItems: "center" }}>
                    <TouchableOpacity style={{ width: 100, height: 50, backgroundColor: "#2c3e50", justifyContent: "center", alignItems: "center", borderRadius: 30 }} onPress={() => { }}>
                        <MaterialCommunityIcons name="cube-send" size={30} color="#f39c12" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: 100, height: 50, backgroundColor: "#2c3e50", justifyContent: "center", alignItems: "center", borderRadius: 30 }}>
                        <MaterialCommunityIcons name="truck" size={30} color="#f39c12" />
                    </TouchableOpacity>


                    <TouchableOpacity style={{ width: 100, height: 50, backgroundColor: "#2c3e50", justifyContent: "center", alignItems: "center", borderRadius: 30 }} onPress={() => { }}>
                        <MaterialCommunityIcons name="airplane-takeoff" size={30} color="#f39c12" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.actuText}>Actualités & Offres promotionelles</Text>
                <View style={styles.actuContent}>

                </View>

                <View style={styles.pickerBox}>
                    <Picker
                        dropdownIconColor="white"
                        selectedValue={profil}
                        onValueChange={(e) => setProfil(e)}>

                        <Picker.Item style={{ color: "#f39c12" }} label="Expéditeur home" value="expéditeur" />
                        <Picker.Item style={{ color: "#f39c12" }} label="Transporteur home" value="transporteur" />
                        <Picker.Item style={{ color: "#f39c12" }} label="Voyageur home" value="voyageur" />

                    </Picker>
                </View>

                {getProfil(profil)}

                <View style={styles.footer}></View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    actuText: {
        marginBottom: 10,
        width: "100%",
        color: "black",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center"
    },

    actuContent: {
        width: "100%",
        height: 300,
        backgroundColor: "#bdc3c7",
        marginBottom: 20
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
        width: "90%",
        height: 50,
        justifyContent: "center",
        paddingStart: 20,
        borderRadius: 5,
        marginTop: 20
    }
})

export default Summary