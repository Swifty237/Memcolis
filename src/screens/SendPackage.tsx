import React, { useState } from "react"
import { StyleSheet, Text, View, StatusBar, ScrollView, PermissionsAndroid, Image, FlatList } from "react-native"
import Input from "../components/Input"
import Btn from "../components/Btn"
import { Picker } from "@react-native-picker/picker"
import Icon from "react-native-vector-icons/MaterialIcons"
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker"



const SendPackage = () => {
    const [photosFromCamera, setPhotosFromCamera] = useState<ImageOrVideo[]>([])
    const [destination, setDestination] = useState<string>("Douala")
    const [weight, setWeight] = useState<string>("0")

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

            <Text style={styles.recapTxt}>Demande d'envoi</Text>
            <View style={styles.separator}></View>

            <Text style={styles.destination}>Destination</Text>
            <View style={styles.pickerBox}>
                <Picker
                    dropdownIconColor="white"
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

            <View style={styles.button}>
                <View style={{ marginEnd: 10 }}>
                    <Icon name="photo-camera" size={20} color="white" />
                </View>
                <Btn label="Prendre une photo" textStyle={styles.btnLabel} onPress={() => takePhotoFromCamera()} />
            </View>

            <Text style={styles.recapTxt}>Récapitulatif demande</Text>
            <View style={styles.separator}></View>

            <View style={{ flexDirection: "row", width: "90%" }}>
                <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Destination: </Text>
                <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{destination}</Text>
            </View>

            <View style={{ flexDirection: "row", width: "90%", marginTop: 25 }}>
                <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Poids: </Text>
                <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{weight} kg</Text>
            </View>

            <Text style={styles.destination}>Images colis</Text>
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
        marginVertical: 15,
        width: 300,
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
        borderRadius: 5
    },

    destination: {
        marginTop: 25,
        marginBottom: 7,
        width: "90%",
        color: "black",
        fontWeight: "bold",
        textAlign: "left",
        paddingStart: 20
    },

    separator: {
        marginVertical: 15,
        width: 340,
        borderWidth: 4,
        borderColor: "#2c3e50"
    },

    flatListSeparator: {
        borderWidth: 5,
        borderColor: "transparent"
    },

    recapTxt: {
        marginTop: 70,
        width: "90%",
        color: "#2c3e50",
        fontWeight: "bold",
        textAlign: "left",
        paddingStart: 20,
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
