import React, { useContext } from "react"
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native"
import { EditerContext } from "../utils/UserContext"
import Btn from "./Btn"
import Input from "./Input"
import DatePicker from "./DatePicker"

const EditerProfile = () => {

    const { setEditProfile } = useContext(EditerContext)

    return (
        <SafeAreaView style={styles.container}>
            <Input
                label="Prénom"
                placeholder=""
                value=""
                onChangeText={() => { }}
                onBlur={() => { }}
                error="" />

            <Input
                label="Nom"
                placeholder=""
                value=""
                onChangeText={() => { }}
                onBlur={() => { }}
                error="" />

            <DatePicker label="Date de naissance" date="" onChangeDate={() => { }} error="" />

            <Input
                label="Adresse"
                placeholder=""
                value=""
                onChangeText={() => { }}
                onBlur={() => { }}
                error="" />

            <View style={{ flexDirection: "row" }}>
                <Input
                    label="Code postal"
                    containerBox={styles.box}
                    inputContainerStyle={styles.inputContainer}
                    placeholder=""
                    value=""
                    onChangeText={() => { }}
                    onBlur={() => { }}
                    keyBoardNumeric
                    error="" />

                <Input
                    label="Ville"
                    containerBox={styles.box2}
                    inputContainerStyle={styles.inputContainer}
                    placeholder=""
                    value=""
                    onChangeText={() => { }}
                    onBlur={() => { }}
                    error="" />
            </View>

            <Input
                label="Tel"
                placeholder=""
                value=""
                onChangeText={() => { }}
                onBlur={() => { }}
                keyBoardNumeric
                error="" />

            <View style={styles.buttonsBox}>
                <Btn label="Valider" textStyle={styles.buttonLabel} buttonStyle={styles.validation} onPress={() => setEditProfile(false)} />
                <Btn label="Annuler" textStyle={styles.buttonLabel2} buttonStyle={styles.annulation} onPress={() => setEditProfile(false)} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "95%"
    },

    text: {
        color: "black",
        fontWeight: "bold"
    },

    buttonLabel: {
        color: "#2c3e50",
        textAlign: "center"
    },

    buttonLabel2: {
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

    inputContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#bdc3c7",
        borderRadius: 7,
        backgroundColor: "white",
        width: "90%"
    },

    buttonsBox: {
        flexDirection: "row",
        width: "100%",
        height: 122,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        borderTopWidth: 4,
        borderColor: "#2c3e50",
        borderRadius: 15,
        marginTop: 20
    },

    box: {
        flex: 1,
        marginTop: 20,
    },

    box2: {
        flex: 1,
        marginTop: 20,
        alignItems: "flex-end"
    }

})

export default EditerProfile