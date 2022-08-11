import React, { useState, useContext } from "react"
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native"
import { UserContext } from "../utils/UserContext"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import type { RouteProp } from "@react-navigation/native"
import { Picker } from "@react-native-picker/picker"
import SenderHistory from "../components/SenderHistory"
import TransporterHistory from "../components/TransporterHistory"
import TravelerWithSaleHistory from "../components/TravelerWithSaleHistory"
import TravelerWithoutSaleHistory from "../components/TravelerWithoutSaleHistory"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"



type HistoryProp = NativeStackScreenProps<MainDrawerParamList, "History">

const History: React.FunctionComponent<HistoryProp> = ({ navigation, route }) => {
    const [profil, setProfil] = useState<"expéditions" | "transports" | "voyageurWithSales" | "voyageurWithoutSales">("expéditions")
    const { userEmail, userUID } = useContext(UserContext)
    const { email, userID } = route.params



    const getProfil = (profil: string) => {
        switch (profil) {
            case "expéditions":
                return (
                    <View style={styles.container}>
                        <SenderHistory />
                    </View>
                )
                break

            case "transports":
                return (
                    <View style={styles.container}>
                        <TransporterHistory />
                    </View>
                )
                break

            case "voyageurWithSales":
                return (
                    <View style={styles.container}>
                        <TravelerWithSaleHistory />
                    </View>
                )
                break

            case "voyageurWithoutSales":
                return (
                    <View style={styles.container}>
                        <TravelerWithoutSaleHistory />
                    </View>
                )
                break

            default:
                return
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#2c3e50" />

            <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                <SimpleLineIcons style={{ marginEnd: 10 }} name="arrow-left" size={20} color="#f39c12" />
                <Text style={styles.btnLabel2}>Accueil</Text>
            </TouchableOpacity>

            <View style={styles.pickerBox}>
                <Picker
                    dropdownIconColor="white"
                    selectedValue={profil}
                    onValueChange={(e) => setProfil(e)}>

                    <Picker.Item style={{ color: "#f39c12" }} label="Mes expéditions" value="expéditions" />
                    <Picker.Item style={{ color: "#f39c12" }} label="Mes transports" value="transports" />
                    <Picker.Item style={{ color: "#f39c12" }} label="Mes voyages avec vente(s)" value="voyageurWithSales" />
                    <Picker.Item style={{ color: "#f39c12" }} label="Mode voyages sans vente(s)" value="voyageurWithoutSales" />

                </Picker>
            </View>

            {getProfil(profil)}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },

    pickerBox: {
        backgroundColor: "#2c3e50",
        width: "90%",
        height: 50,
        justifyContent: "center",
        paddingStart: 20,
        borderRadius: 5,
        marginVertical: 20
    },

    backButton: {
        backgroundColor: "transparent",
        width: 300,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 15,
        borderWidth: 2,
        borderColor: "#f39c12",
        alignItems: "center"
    },

    btnLabel2: {
        color: "#f39c12",
        textAlign: "center"
    }
})

export default History