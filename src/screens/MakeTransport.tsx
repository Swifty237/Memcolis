import React from "react"
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"



type MakeTransportProp = { navigation: NativeStackNavigationProp<MainDrawerParamList, "MakeTransport"> }

const MakeTransport: React.FunctionComponent<MakeTransportProp> = ({ navigation }) => {


    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.validation} onPress={navigation.goBack}>
                <SimpleLineIcons style={{ marginEnd: 10 }} name="arrow-left" size={20} color="#f39c12" />
                <Text style={styles.btnLabel}>Accueil</Text>
            </TouchableOpacity>

            <Text style={{ color: "black", fontSize: 17, fontWeight: "bold", marginTop: 20, marginBottom: 5, textAlign: "center" }}>Demandes de transport</Text>

            <ScrollView contentContainerStyle={{ alignItems: "center" }}>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.box} onPress={() => { }}>
                    <Text style={styles.text1}>Lieu ici !...</Text>
                    <Text style={styles.text1}>...montant prévu ici !</Text>
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
    },

    validation: {
        backgroundColor: "transparent",
        width: 300,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 15,
        borderWidth: 2,
        borderColor: "#f39c12",
        alignItems: "center",
        alignSelf: "center"
    },

    btnLabel: {
        color: "#f39c12",
        textAlign: "center"
    }
})

export default MakeTransport