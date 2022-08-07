import { StyleSheet, Text, View, Dimensions } from "react-native"
import React from "react"


const Transporter = ({ email, userID }: { email: string, userID: string }) => {
    console.log("email Transporter: ", email)
    console.log("userID Transporter: ", userID)

    return (
        <View style={styles.container}>
            <Text style={styles.transporterText}>Demandes de transport</Text>
            <View style={styles.transporterContent}>

            </View>

            <Text style={styles.previsionText}>Gestion de mes transports</Text>
            <View style={styles.previsionContent}>

            </View>

            <Text style={styles.historyText}>Mes transports</Text>
            <View style={styles.historyContent}>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    transporterText: {
        marginTop: 50,
        marginBottom: 10,
        width: Dimensions.get("window").width,
        color: "black",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center"

    },

    transporterContent: {
        width: Dimensions.get("window").width,
        height: 350,
        backgroundColor: "#bdc3c7",
        marginBottom: 20
    },

    previsionText: {
        marginTop: 20,
        marginBottom: 10,
        width: Dimensions.get("window").width,
        color: "black",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center"
    },

    previsionContent: {
        width: Dimensions.get("window").width,
        height: 350,
        backgroundColor: "#bdc3c7",
        marginBottom: 20
    },

    historyText: {
        marginTop: 50,
        marginBottom: 10,
        width: Dimensions.get("window").width,
        color: "black",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        paddingStart: 20
    },

    historyContent: {
        width: Dimensions.get("window").width,
        height: 400,
        backgroundColor: "#bdc3c7"
    }
})

export default Transporter