import { StyleSheet, Text, View, Dimensions } from "react-native"
import React from "react"



const Traveler = ({ email, userID }: { email: string, userID: string }) => {
    console.log("email Traveler: ", email)
    console.log("userID Traveler: ", userID)


    return (
        <View style={styles.container}>
            <Text style={styles.historyText}>Mes ventes de kg</Text>
            <View style={styles.historyContent}>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    historyText: {
        marginTop: 40,
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

export default Traveler