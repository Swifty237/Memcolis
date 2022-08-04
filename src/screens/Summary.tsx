import React, { useState, useContext } from "react"
import { StyleSheet, Text, View, StatusBar, SafeAreaView, ScrollView } from "react-native"
import { Picker } from "@react-native-picker/picker"
import Sender from "../components/Sender"
import Transporter from "../components/Tansporter"
import Traveler from "../components/Traveler"
import { UserContext } from "../utils/UserContext"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import type { RouteProp } from "@react-navigation/native"



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

            <ScrollView contentContainerStyle={{ marginTop: 20, alignItems: "center" }}>
                <View style={styles.pickerBox}>
                    <Picker
                        dropdownIconColor="white"
                        selectedValue={profil}
                        onValueChange={(e) => setProfil(e)}>

                        <Picker.Item style={{ color: "#f39c12" }} label="Expéditeur" value="expéditeur" />
                        <Picker.Item style={{ color: "#f39c12" }} label="Transporteur" value="transporteur" />
                        <Picker.Item style={{ color: "#f39c12" }} label="Voyageur" value="voyageur" />

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
        height: 100
    },

    pickerBox: {
        backgroundColor: "#2c3e50",
        width: "90%",
        height: 50,
        justifyContent: "center",
        paddingStart: 20,
        borderRadius: 5
    }
})

export default Summary