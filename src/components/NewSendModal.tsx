import React, { useContext } from "react"
import { StyleSheet, Text, SafeAreaView, View, Modal, ScrollView } from "react-native"
import Input from "./Input"
import Btn from "./Btn"
import { Picker } from "@react-native-picker/picker"
import { NewSendContext } from "../utils/UserContext"



const NewSendModal: React.FunctionComponent = () => {

    const { visible, setVisible, destination, setDestination, destinataire, setDestinataire, adresse, setAdresse, tel, setTel, weight, setWeight, numberArticle, setNumberArticle } = useContext(NewSendContext)

    return (
        <SafeAreaView style={styles.container}>
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

                <ScrollView contentContainerStyle={{ height: 500, width: "100%", paddingHorizontal: 15 }}>
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
                        value={adresse}
                        onChangeText={(text) => setAdresse(text)}
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
                </ScrollView>

                <View style={{ flexDirection: "row", width: "100%", height: 122, justifyContent: "space-around", alignItems: "center", marginTop: 30 }}>
                    <View style={styles.validation}>
                        <Btn label="Terminer" textStyle={styles.btnLabel} onPress={() => setVisible(false)} />
                    </View>

                    <View style={styles.annulation}>
                        <Btn label="Annuler" textStyle={styles.btnLabel2} onPress={() => {
                            setDestination("")
                            setDestinataire("")
                            setAdresse("")
                            setTel("")
                            setNumberArticle("")
                            setWeight("")
                            setVisible(false)
                        }} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    container: {

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
})

export default NewSendModal