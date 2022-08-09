import React from "react"
import { StyleSheet, Text, View } from "react-native"

const FinalRegistration: React.FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Réglages</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    text: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20
    }
})

export default FinalRegistration