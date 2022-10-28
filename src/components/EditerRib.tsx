import React, { useContext, useState } from "react"
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity } from "react-native"
import { EditerContext } from "../utils/UserContext"
import Btn from "./Btn"
import Input from "./Input"



const EditerRib = () => {
    const { setEditRib } = useContext(EditerContext)
    const [iban, setIban] = useState<string>("")

    const format = (iban: string) => {
        if (!iban) {
            return ''
        }

        const cleanIban = iban
            .replace(/\s\s+/g, ' ')
            .replace(/[^0-9a-zA-Z]/gi, '')
            .toLocaleUpperCase()

        const parts: string[] = []

        if (cleanIban.length > 0) {
            parts.push(cleanIban.substring(0, 4))
            // console.log("length > 0", parts)
        }

        if (cleanIban.length > 4) {
            parts.push(cleanIban.substring(4, 8))
            // console.log("length > 4", parts)
        }

        if (cleanIban.length > 8) {
            parts.push(cleanIban.substring(8, 12))
            // console.log("length > 8", parts)
        }

        if (cleanIban.length > 12) {
            parts.push(cleanIban.substring(12, 16))
            // console.log("length > 12", parts)
        }

        if (cleanIban.length > 16) {
            parts.push(cleanIban.substring(16, 20))
            // console.log("length > 16", parts)
        }

        if (cleanIban.length > 20) {
            parts.push(cleanIban.substring(20, 24))
            // console.log("length > 20", parts)
        }

        if (cleanIban.length > 24) {
            parts.push(cleanIban.substring(24, 28))
            // console.log("length > 24", parts)
        }

        return parts.join(' ')
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ marginTop: 25, alignSelf: "center" }}>
                <Text style={{ color: "gray", fontSize: 12, fontStyle: "italic", marginBottom: 5 }}>Entrez votre IBAN</Text>
            </View>

            <Input label=""
                containerBox={styles.ibanInput}
                placeholder=""
                value={iban}
                onChangeText={(iban) => setIban(format(iban))}
                onBlur={() => { }}
                error="" />

            <View style={styles.buttonsBox}>
                <Btn label="Valider" textStyle={styles.buttonLabel} buttonStyle={styles.validation} onPress={() => setEditRib(false)} />
                <Btn label="Annuler" textStyle={styles.buttonLabel2} buttonStyle={styles.annulation} onPress={() => setEditRib(false)} />
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

    photoBox: {
        width: 350,
    },

    photo: {
        width: 200,
        height: 200
    },

    flatListSeparator: {
        borderWidth: 5,
        borderColor: "transparent"
    },

    button: {
        backgroundColor: "#f39c12",
        marginVertical: 25,
        width: 110,
        height: 40,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },

    btnLabel: {
        color: "#2c3e50",
        textAlign: "center"
    },

    ibanInput: {
        flex: 1
    }
})

export default EditerRib