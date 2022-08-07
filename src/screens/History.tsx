import React, { useState, useContext } from "react"
import { StyleSheet, Text, View, StatusBar } from "react-native"
import { UserContext } from "../utils/UserContext"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import type { RouteProp } from "@react-navigation/native"
import { Picker } from "@react-native-picker/picker"
import SenderHistory from "../components/SenderHistory"
import TransporterHistory from "../components/TransporterHistory"
import TravelerWithSaleHistory from "../components/TravelerWithSaleHistory"
import TravelerWithoutSaleHistory from "../components/TravelerWithoutSaleHistory"






type HistoryProp = { route: RouteProp<MainDrawerParamList, "History"> }

const History: React.FunctionComponent<HistoryProp> = ({ route }) => {
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
    }
})

export default History