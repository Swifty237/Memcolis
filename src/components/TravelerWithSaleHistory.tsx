import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native"
import React from "react"

const TravelerWithSaleHistory = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>

                <TouchableOpacity style={styles.box}>
                    <Text style={styles.text1}>...kg vendus le date ici ! ...</Text>
                    <Text style={styles.text1}>... Montant ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box}>
                    <Text style={styles.text1}>...kg vendus le date ici ! ...</Text>
                    <Text style={styles.text1}>... Montant ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box}>
                    <Text style={styles.text1}>...kg vendus le date ici ! ...</Text>
                    <Text style={styles.text1}>... Montant ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box}>
                    <Text style={styles.text1}>...kg vendus le date ici ! ...</Text>
                    <Text style={styles.text1}>... Montant ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box}>
                    <Text style={styles.text1}>...kg vendus le date ici ! ...</Text>
                    <Text style={styles.text1}>... Montant ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box}>
                    <Text style={styles.text1}>...kg vendus le date ici ! ...</Text>
                    <Text style={styles.text1}>... Montant ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box}>
                    <Text style={styles.text1}>...kg vendus le date ici ! ...</Text>
                    <Text style={styles.text1}>... Montant ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box}>
                    <Text style={styles.text1}>...kg vendus le date ici ! ...</Text>
                    <Text style={styles.text1}>... Montant ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box}>
                    <Text style={styles.text1}>...kg vendus le date ici ! ...</Text>
                    <Text style={styles.text1}>... Montant ici !</Text>
                </TouchableOpacity>

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
        marginHorizontal: 10
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
        backgroundColor: "white",
        width: "96%",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 7,
        borderTopWidth: 4,
        borderColor: "#2c3e50"
    }
})

export default TravelerWithSaleHistory