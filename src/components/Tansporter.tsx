import React from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import MapComponent from "./MapComponent"


const Transporter = ({ email, userID }: { email: string, userID: string }) => {
    console.log("email Transporter: ", email)
    console.log("userID Transporter: ", userID)

    return (
        <View style={styles.container}>
            <Text style={styles.historyText}>Mes transports</Text>
            <View style={styles.historyContent}>

            </View>

            <Text style={styles.transporterText}>Demandes de transport à proximité</Text>
            <View style={styles.transporterContent}>
                <MapComponent />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    transporterText: {
        marginTop: 40,
        marginBottom: 10,
        width: Dimensions.get("window").width,
        color: "black",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center"

    },

    transporterContent: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2
    },

    historyText: {
        marginTop: 30,
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
        backgroundColor: "#bdc3c7",
        marginBottom: 20
    }
})

export default Transporter