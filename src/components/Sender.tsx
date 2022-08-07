import React from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import MapComponent from "./MapComponent"



const Sender = ({ email, userID }: { email: string, userID: string }) => {
    console.log("email sender: ", email)
    console.log("userID sender: ", userID)


    return (
        <View style={styles.container}>
            <Text style={styles.previsionText}>Prévisions Voyages</Text>
            <View style={styles.previsionContent}>

            </View>

            <Text style={styles.transporterText}>Transporteurs à proximité</Text>
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
        width: "100%",
        height: 200,
        backgroundColor: "#bdc3c7",
        marginBottom: 20
    }
})

export default Sender