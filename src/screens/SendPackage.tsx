import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'

const SendPackage = () => {
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

export default SendPackage
