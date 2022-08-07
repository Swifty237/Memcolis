import React from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import MapComponent from "./MapComponent"



const Sender = ({ email, userID }: { email: string, userID: string }) => {
    console.log("email sender: ", email)
    console.log("userID sender: ", userID)


    return (
        <View style={styles.container}>
            <Text style={styles.previsionText}>Propositions des voyageurs</Text>
            <View style={styles.previsionContent}>

            </View>

            <Text style={styles.transporterText}>Transporteurs à proximité</Text>
            <View style={styles.transporterContent}>
                <MapComponent />
            </View>

            <Text style={styles.historyText}>Mes transactions</Text>
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
        height: Dimensions.get("window").height / 2
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
        height: 200,
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

export default Sender