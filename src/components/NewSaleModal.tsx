import React, { useContext } from "react"
import { StyleSheet, Text, SafeAreaView, View, Modal, ScrollView } from "react-native"
import Input from "./Input"
import Btn from "./Btn"
import { Picker } from "@react-native-picker/picker"
import { NewSaleContext } from "../utils/UserContext"
import DatePicker from "./DatePicker"

const NewSaleModal: React.FunctionComponent = () => {
    const { visible, setVisible, destination, setDestination, departureDate, setDepartureDate, arrivalDate, setArrivalDate, weight, setWeight } = useContext(NewSaleContext)

    return (
        <SafeAreaView>
            <Modal visible={visible} style={styles.container}>
                <Text style={{ color: "black", fontWeight: "bold", marginTop: 25, marginBottom: 7, paddingStart: 25 }}>Destination</Text>
                <View style={styles.pickerBox}>
                    <Picker
                        dropdownIconColor="white"
                        selectedValue={destination}
                        onValueChange={(value) => setDestination(value)}>

                        <Picker.Item style={{ color: "gray" }} label="Choisissez une destination" value="Choisissez une destination" />
                        <Picker.Item style={{ color: "#f39c12" }} label="Douala" value="Douala" />
                        <Picker.Item style={{ color: "#f39c12" }} label="Yaoundé" value="Yaoundé" />
                        <Picker.Item style={{ color: "#f39c12" }} label="Paris" value="Paris" />

                    </Picker>
                </View>

                <ScrollView contentContainerStyle={{ height: 320, width: "100%", paddingHorizontal: 15 }}>

                    <DatePicker label="Date/heure départ" date={departureDate} onChangeDate={(date) => setDepartureDate(date)} error="" />

                    <DatePicker label="Date/heure arrivée" date={arrivalDate} onChangeDate={(date) => setArrivalDate(date)} error="" />

                    <Input
                        label="Numbre de kg à vendre"
                        placeholder="Entrer le poids à vendre ici !"
                        value={weight}
                        onChangeText={(text) => setWeight(text)}
                        onBlur={() => { }}
                        keyBoardNumeric
                        error="" />
                </ScrollView>

                <View style={{ flexDirection: "row", width: "100%", height: 122, justifyContent: "space-around", alignItems: "center", marginTop: 30, backgroundColor: "white", borderTopWidth: 4, borderColor: "#2c3e50", borderRadius: 15 }}>
                    <Btn
                        label="Terminer"
                        textStyle={styles.btnLabel}
                        buttonStyle={styles.validation}
                        onPress={() => setVisible(false)} />

                    <Btn
                        label="Annuler"
                        textStyle={styles.btnLabel2}
                        buttonStyle={styles.annulation}
                        onPress={() => {
                            setDestination("")
                            setDepartureDate("")
                            setArrivalDate("")
                            setWeight("")
                            setVisible(false)
                        }} />
                </View>
            </Modal>
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    container: {

    },

    pickerBox: {
        backgroundColor: "#2c3e50",
        width: "90%",
        height: 50,
        justifyContent: "center",
        paddingStart: 20,
        borderRadius: 5,
        alignSelf: "center"
    },

    destination: {
        marginTop: 15,
        width: "90%",
        color: "black",
        fontWeight: "bold",
        textAlign: "left",
        paddingStart: 20
    },

    btnLabel: {
        color: "#2c3e50",
        textAlign: "center"
    },

    btnLabel2: {
        color: "#f39c12",
        textAlign: "center"
    },

    validation: {
        backgroundColor: "#f39c12",
        width: 150,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    annulation: {
        backgroundColor: "#2c3e50",
        width: 150,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
})

export default NewSaleModal
