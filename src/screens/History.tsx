import React from "react"
import { StyleSheet, Text, View, StatusBar } from "react-native"

const History = () => {

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#2c3e50" />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },

    text: {
        color: "black"
    }
})

export default History
