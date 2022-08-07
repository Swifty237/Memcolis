import { StyleSheet, Text, View, ScrollView } from "react-native"
import React from "react"

const TransporterHistory = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>

                <View style={styles.box}>
                    <Text style={styles.text1}>Date/heure ici !... lieu ici !</Text>
                    <Text style={styles.text2}>... montant recu ici !</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text1}>Date/heure ici !... lieu ici !</Text>
                    <Text style={styles.text2}>... montant recu ici !</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text1}>Date/heure ici !... lieu ici !</Text>
                    <Text style={styles.text2}>... montant recu ici !</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text1}>Envoyé le: date ici !...</Text>
                    <Text style={styles.text3}>... transport inachevé !</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text1}>Date/heure ici !... lieu ici !</Text>
                    <Text style={styles.text2}>... montant recu ici !</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text1}>Date/heure ici !... lieu ici !</Text>
                    <Text style={styles.text2}>... montant recu ici !</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text1}>Date/heure ici !... lieu ici !</Text>
                    <Text style={styles.text2}>... montant recu ici !</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text1}>Date/heure ici !... lieu ici !</Text>
                    <Text style={styles.text2}>... montant recu ici !</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text1}>Envoyé le: date ici !...</Text>
                    <Text style={styles.text3}>... transport inachevé !</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.text1}>Date/heure ici !... lieu ici !</Text>
                    <Text style={styles.text2}>... montant recu ici !</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ecf0f1"
    },

    text1: {
        color: "#2c3e50",
        fontSize: 12,
        marginStart: 10
    },

    text2: {
        color: "#1abc9c",
        fontSize: 12,
        marginEnd: 10
    },

    text3: {
        color: "#e74c3c",
        fontSize: 12,
        marginEnd: 10
    },

    box: {
        flexDirection: "row",
        backgroundColor: "transparent",
        borderWidth: 3,
        borderColor: "white",
        width: "98%",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 7
    }
})

export default TransporterHistory