import { StyleSheet, Text, View } from "react-native"
import React from "react"



const Traveler = ({ email, userID }: { email: string, userID: string }) => {
    console.log("email Traveler: ", email)
    console.log("userID Traveler: ", userID)


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Traveler</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    text: {
        color: "black",
        fontWeight: "bold"
    }
})

export default Traveler