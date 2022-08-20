import React, { useContext } from "react"
import { StyleSheet, Text, View, SafeAreaView, Modal } from "react-native"
import { EditerContext } from "../utils/UserContext"
import Btn from "./Btn"

const EditerProfile = () => {

    const { editProfile, setEditProfile } = useContext(EditerContext)

    return (
        <SafeAreaView>
            <Modal visible={editProfile}>
                <View style={styles.container}>
                    <Text style={styles.text}>EditerProfile</Text>
                    <View style={styles.buttonsBox}>
                        <Btn label="Valider" textStyle={styles.buttonLabel} buttonStyle={styles.validation} onPress={() => setEditProfile(false)} />
                        <Btn label="Annuler" textStyle={styles.buttonLabel2} buttonStyle={styles.annulation} onPress={() => setEditProfile(false)} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between"
    },

    text: {
        color: "black",
        fontWeight: "bold"
    },

    buttonLabel: {
        color: "#2c3e50",
        textAlign: "center"
    },

    buttonLabel2: {
        color: "#f39c12",
        textAlign: "center"
    },

    validation: {
        backgroundColor: "#f39c12",
        width: 150,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    annulation: {
        backgroundColor: "#2c3e50",
        width: 150,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    buttonsBox: {
        flexDirection: "row",
        width: "100%",
        height: 122,
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 30,
        backgroundColor: "white",
        borderTopWidth: 4,
        borderColor: "#2c3e50",
        borderRadius: 15
    }
})

export default EditerProfile