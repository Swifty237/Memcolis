import React, { useContext, useState } from "react"
import { StyleSheet, Text, SafeAreaView, View, Modal, ScrollView } from "react-native"
import Input from "./Input"
import Btn from "./Btn"
import { Picker } from "@react-native-picker/picker"
import { NewSendContext } from "../utils/UserContext"
import { RadioButton } from "react-native-paper"



const NewSendModal: React.FunctionComponent = () => {

    const {
        visible,
        setVisible,
        destination,
        setDestination,
        destinataire,
        setDestinataire,
        adress,
        setAdress,
        tel,
        setTel,
        weight,
        setWeight,
        numberArticle,
        setNumberArticle,
        travel,
        setTravel,
        transport,
        setTransport
    } = useContext(NewSendContext)

    return (
        <SafeAreaView>
            <Modal visible={visible}>
                <Text style={{ color: "black", fontWeight: "bold", marginTop: 25, marginBottom: 7, paddingStart: 25 }}>Destination</Text>
                <View style={styles.pickerBox}>
                    <Picker
                        dropdownIconColor="white"
                        selectedValue={destination}
                        onValueChange={(value) => setDestination(value)}>

                        <Picker.Item style={{ color: "gray" }} label="Choisissez une destination" value="Choisissez une destination" />
                        <Picker.Item style={{ color: "#f39c12" }} label="Douala" value="Douala" />
                        <Picker.Item style={{ color: "#f39c12" }} label="Yaoundé" value="Yaoundé" />
                        <Picker.Item style={{ color: "#f39c12" }} label="Paris" value="Paris" />

                    </Picker>
                </View>

                <ScrollView contentContainerStyle={{ width: "95%", alignSelf: "center" }}>
                    <Input
                        label="Destinataire"
                        placeholder="Entrer le nom et prénom du destinataire"
                        value={destinataire}
                        onChangeText={(text) => setDestinataire(text)}
                        onBlur={() => { }}
                        error="" />

                    <Input
                        label="Adresse"
                        placeholder="Entrer l'adresse du destinataire"
                        value={adress}
                        onChangeText={(text) => setAdress(text)}
                        onBlur={() => { }}
                        error="" />

                    <Input
                        label="Téléphone"
                        placeholder="Entrer le numéro de téléphone du destinataire "
                        value={tel}
                        onChangeText={(text) => setTel(text)}
                        onBlur={() => { }}
                        keyBoardNumeric
                        error="" />

                    <Input
                        label="Nombre d'articles"
                        placeholder="Entrer le nombre d'article à envoyer"
                        value={numberArticle}
                        onChangeText={(text) => setNumberArticle(text)}
                        onBlur={() => { }}
                        keyBoardNumeric
                        error="" />

                    <Input
                        label="Poids Total"
                        placeholder="Entrer le poids total du colis ici !"
                        value={weight}
                        onChangeText={(text) => setWeight(text)}
                        onBlur={() => { }}
                        keyBoardNumeric
                        error="" />

                    <Text style={styles.labelStyle}>Avec voyage</Text>
                    <View style={styles.radioContainer}>
                        <View style={styles.radioBox}>
                            <RadioButton
                                value="Oui"
                                status={travel === "Oui" ? "checked" : "unchecked"}
                                onPress={() => { setTravel("Oui") }}
                            />
                            <View style={styles.selectedTextBox}>
                                <Text style={travel === "Oui" ? styles.selected : styles.unselected}>Oui</Text>
                            </View>
                        </View>
                        <View style={styles.radioBox}>
                            <RadioButton
                                value="Non"
                                status={travel === "Non" ? "checked" : "unchecked"}
                                onPress={() => setTravel("Non")}
                            />

                            <View style={styles.selectedTextBox}>
                                <Text style={travel === "Non" ? styles.selected : styles.unselected}>Non</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.labelStyle}>Avec transport</Text>
                    <View style={styles.radioContainer}>
                        <View style={styles.radioBox}>
                            <RadioButton
                                value="Oui"
                                status={transport === "Oui" ? "checked" : "unchecked"}
                                onPress={() => { setTransport("Oui") }}
                            />
                            <View style={styles.selectedTextBox}>
                                <Text style={transport === "Oui" ? styles.selected : styles.unselected}>Oui</Text>
                            </View>
                        </View>
                        <View style={styles.radioBox}>
                            <RadioButton
                                value="Non"
                                status={transport === "Non" ? "checked" : "unchecked"}
                                onPress={() => setTransport("Non")}
                            />

                            <View style={styles.selectedTextBox}>
                                <Text style={transport === "Non" ? styles.selected : styles.unselected}>Non</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.containerButton}>
                    <View>
                        <Btn
                            label="Terminer"
                            textStyle={styles.btnLabel}
                            buttonStyle={styles.validation}
                            onPress={() => setVisible(false)} />
                    </View>

                    <Btn
                        label="Annuler"
                        textStyle={styles.btnLabel2}
                        buttonStyle={styles.annulation}
                        onPress={() => {
                            setDestination("")
                            setDestinataire("")
                            setAdress("")
                            setTel("")
                            setNumberArticle("")
                            setWeight("")
                            setTravel("Oui")
                            setTransport("Oui")
                            setVisible(false)
                        }} />
                </View>
            </Modal>
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    containerButton: {
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
    },

    pickerBox: {
        backgroundColor: "#2c3e50",
        width: "90%",
        height: 50,
        justifyContent: "center",
        paddingStart: 20,
        borderRadius: 5,
        alignSelf: "center"
    },

    destination: {
        marginTop: 15,
        width: "90%",
        color: "black",
        fontWeight: "bold",
        textAlign: "left",
        paddingStart: 20
    },

    btnLabel: {
        color: "#2c3e50",
        textAlign: "center"
    },

    btnLabel2: {
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

    radioBox: {
        flexDirection: "row"
    },

    selected: {
        color: "black",
        fontSize: 15
    },

    unselected: {
        color: "grey",
        fontSize: 12
    },

    selectedTextBox: {
        height: 40,
        justifyContent: "center"
    },

    radioContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },

    labelStyle: {
        color: "black",
        marginStart: 10,
        marginBottom: 5,
        fontWeight: "bold",
        width: "83%",
        marginTop: 20
    }
})

export default NewSendModal