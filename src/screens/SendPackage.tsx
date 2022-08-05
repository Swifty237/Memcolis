import React, { useState } from "react"
import { StyleSheet, Text, View, StatusBar, ScrollView, Image, FlatList, Modal } from "react-native"
import Input from "../components/Input"
import Btn from "../components/Btn"
import { Picker } from "@react-native-picker/picker"
import Icon from "react-native-vector-icons/MaterialIcons"
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker"



const SendPackage = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [photosFromCamera, setPhotosFromCamera] = useState<ImageOrVideo[]>([])
    const [destination, setDestination] = useState<string>("Douala")
    const [weight, setWeight] = useState<string>("")

    const takePhotoFromCamera = () => {

        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true

        }).then(image => {
            console.log(image)
            setPhotosFromCamera([...photosFromCamera, image])

        }).catch(err => console.error(err))
    }

    console.log("photosFromCamera", photosFromCamera)

    const renderItem = ({ item }: { item: ImageOrVideo }) => {

        return (
            <View>
                <Image source={{ uri: item.path }} style={styles.photo} />
            </View>
        )
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor="#2c3e50" />

            <View style={styles.sendButton}>
                <Btn label="Nouvel envoi" textStyle={styles.btnLabel} onPress={() => setVisible(true)} />
            </View>

            <View style={styles.modalContainer}>
                <Modal visible={visible} style={{ alignItems: "center" }}>
                    <Text style={{ color: "black", fontWeight: "bold", marginTop: 25, marginBottom: 7, paddingStart: 25 }}>Destination</Text>
                    <View style={styles.pickerBox}>
                        <Picker
                            dropdownIconColor="#f39c12"
                            selectedValue={destination}
                            onValueChange={(value) => setDestination(value)}>

                            <Picker.Item style={{ color: "#f39c12" }} label="Douala" value="Douala" />
                            <Picker.Item style={{ color: "#f39c12" }} label="Yaoundé" value="Yaoundé" />
                            <Picker.Item style={{ color: "#f39c12" }} label="Paris" value="Paris" />

                        </Picker>
                    </View>

                    <Input
                        label="Poids"
                        placeholder="Entrer le poids du colis ici !"
                        value={weight}
                        onChangeText={(value) => setWeight(value)}
                        onBlur={() => { }}
                        keyBoardNumeric
                        error="" />

                    <View style={{ flexDirection: "row", width: 350, justifyContent: "space-around", marginVertical: 25 }}>
                        <View style={styles.validation}>
                            <Btn label="Terminer" textStyle={styles.btnLabel} onPress={() => setVisible(false)} />
                        </View>

                        <View style={styles.annulation}>
                            <Btn label="Annuler" textStyle={styles.btnLabel2} onPress={() => setVisible(false)} />
                        </View>
                    </View>
                </Modal>
            </View>

            <Text style={styles.recapTxt}>Récapitulatif</Text>
            <View style={styles.separator}>
                <View style={{ flexDirection: "row", width: "90%", marginTop: 25 }}>
                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Destination: </Text>
                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{destination}</Text>
                </View>


                <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                    <View>
                        <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}> Destinataire: </Text>
                        <Text style={{ color: "grey", fontSize: 11, fontStyle: "italic", paddingStart: 20 }}>(* Nom et prénom)</Text>
                    </View>
                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}></Text>
                </View>

                <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Adresse: </Text>
                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}></Text>
                </View>

                <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Téléphone: </Text>
                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}></Text>
                </View>

                <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Nombre d'articles: </Text>
                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}></Text>
                </View>

                <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Poids Total: </Text>
                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{weight} kg</Text>
                </View>

                <View style={{ marginBottom: 7, width: "90%" }}>
                    <Text style={styles.destination}>Images colis: </Text>
                    <Text style={{ color: "grey", fontSize: 11, fontStyle: "italic", paddingStart: 20 }}>(* Minimum 3 images par colis)</Text>
                </View>

                <View style={styles.photoBox}>
                    <FlatList
                        data={photosFromCamera}
                        horizontal
                        initialNumToRender={20}
                        renderItem={renderItem}
                        keyExtractor={item => item.path}
                        ItemSeparatorComponent={() => (<View style={styles.flatListSeparator} />)}
                    />
                </View>

                <View style={styles.button}>
                    <View style={{ marginEnd: 10 }}>
                        <Icon name="photo-camera" size={20} color="white" />
                    </View>
                    <Btn label="Prendre une photo" textStyle={styles.btnLabel} onPress={() => takePhotoFromCamera()} />
                </View>
            </View>

            <View style={{ flexDirection: "row", width: 350, justifyContent: "space-around" }}>
                <View style={styles.validation}>
                    <Btn label="Valider" textStyle={styles.btnLabel} onPress={() => { }} />
                </View>

                <View style={styles.annulation}>
                    <Btn label="Annuler" textStyle={styles.btnLabel2} onPress={() => { }} />
                </View>
            </View>


            <View style={styles.footer}></View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },

    modalContainer: {
        flex: 1
    },

    text: {
        color: "black"
    },

    btnLabel: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
    },

    btnLabel2: {
        color: "#f39c12",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
    },

    button: {
        backgroundColor: "#f39c12",
        marginVertical: 25,
        width: 250,
        height: 50,
        padding: 15,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center"
    },

    sendButton: {
        backgroundColor: "#f39c12",
        marginVertical: 25,
        width: 200,
        height: 50,
        padding: 15,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center"
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

    separator: {
        marginVertical: 15,
        width: "100%",
        borderTopWidth: 4,
        borderBottomWidth: 4,
        borderRadius: 15,
        borderColor: "#2c3e50",
        alignItems: "center"
    },

    flatListSeparator: {
        borderWidth: 5,
        borderColor: "transparent"
    },

    recapTxt: {
        marginTop: 25,
        width: "90%",
        color: "#2c3e50",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18
    },

    photoBox: {
        width: 350,
    },

    photo: {
        width: 200,
        height: 200
    },

    validation: {
        backgroundColor: "#f39c12",
        marginTop: 25,
        width: 150,
        height: 50,
        padding: 15,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center"
    },

    annulation: {
        borderWidth: 2,
        borderColor: "#f39c12",
        marginTop: 25,
        width: 150,
        height: 50,
        padding: 12,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center"
    },

    footer: {
        height: 50
    }
})

export default SendPackage
