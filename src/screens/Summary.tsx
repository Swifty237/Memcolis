import React from "react"
import { StyleSheet, Text, View, StatusBar } from "react-native"

const Summary: React.FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#2c3e50" />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    text: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default Summary