import { StyleSheet, Text, View } from "react-native"
import React from "react"


const Transporter = ({ email, userID }: { email: string, userID: string }) => {
    console.log("email Transporter: ", email)
    console.log("userID Transporter: ", userID)

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Transporter</Text>
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

export default Transporter