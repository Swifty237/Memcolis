import React, { useState } from "react"
import { StyleSheet, Text, View, StatusBar, ScrollView, Image, SafeAreaView, TouchableOpacity } from "react-native"
import Btn from "../components/Btn"
import Icon from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker"
import NewSaleModal from "../components/NewSaleModal"
import { NewSaleContext } from "../utils/UserContext"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainDrawerParamList } from "../navigation/MainDrawer"


type SaleKgProp = { navigation: NativeStackNavigationProp<MainDrawerParamList, "SaleKg"> }

const SaleKg: React.FunctionComponent<SaleKgProp> = ({ navigation }) => {
    const [photosFromCamera, setPhotosFromCamera] = useState<ImageOrVideo>()
    const [visible, setVisible] = useState<boolean>(false)
    const [destination, setDestination] = useState<string>("")
    const [departureDate, setDepartureDate] = useState<string>("")
    const [arrivalDate, setArrivalDate] = useState<string>("")
    const [weight, setWeight] = useState<string>("")



    const takePhotoFromCamera = () => {

        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true

        }).then(image => {
            console.log(image)
            setPhotosFromCamera(image)

        }).catch(err => console.error(err))
    }

    return (
        <NewSaleContext.Provider value={{ visible, setVisible, destination, setDestination, departureDate, setDepartureDate, arrivalDate, setArrivalDate, weight, setWeight }}>
            <SafeAreaView>
                <ScrollView contentContainerStyle={styles.container}>
                    <StatusBar backgroundColor="#2c3e50" />

                    <TouchableOpacity style={styles.annulation} onPress={navigation.goBack}>
                        <SimpleLineIcons style={{ marginEnd: 10 }} name="arrow-left" size={20} color="#f39c12" />
                        <Text style={styles.btnLabel2}>Accueil</Text>
                    </TouchableOpacity>

                    {destination != "" || departureDate != "" || weight != "" || arrivalDate ?
                        <Btn
                            label="Modifier"
                            textStyle={styles.btnLabel2}
                            buttonStyle={styles.modifButton}
                            onPress={() => {
                                setVisible(true)
                            }} />
                        :
                        null
                    }

                    <TouchableOpacity style={styles.sendButton} onPress={() => {
                        setDestination("")
                        setDepartureDate("")
                        setArrivalDate("")
                        setWeight("")
                        setVisible(true)
                    }}>
                        <MaterialCommunityIcons style={{ marginEnd: 10 }} name="airplane-takeoff" size={20} color="#2c3e50" />
                        <Text style={styles.btnLabel}>Poster un annonce</Text>
                    </TouchableOpacity>

                    <NewSaleModal />

                    <View style={styles.separator}>
                        <View style={{ flexDirection: "row", width: "90%", marginTop: 25 }}>
                            <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Destination: </Text>
                            <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{destination}</Text>
                        </View>


                        <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                            <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Date/heure de départ: </Text>
                            <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{departureDate}</Text>
                            {/* <Text style={{ color: "grey", fontSize: 11, fontStyle: "italic", paddingStart: 20 }}>(* Nom et prénom)</Text> */}
                        </View>

                        <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                            <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Date/heure d'arrivée: </Text>
                            <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{arrivalDate}</Text>
                        </View>

                        <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                            <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Nombre de kg à vendre: </Text>
                            <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{weight} kg</Text>
                        </View>

                        <View style={{ marginBottom: 7, width: "90%" }}>
                            <Text style={styles.destination}>Image billet: </Text>
                            {/* <Text style={{ color: "grey", fontSize: 11, fontStyle: "italic", paddingStart: 20 }}>(* Minimum 1 images par billet)</Text> */}
                        </View>

                        <View style={styles.photoBox}>
                            <View>
                                <Image source={{ uri: photosFromCamera?.path }} style={photosFromCamera != undefined ? styles.photo : styles.noPhoto} />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={() => takePhotoFromCamera()}>
                            <Icon style={{ marginEnd: 10 }} name="photo-camera" size={20} color="#2c3e50" />
                            <Text style={styles.btnLabel}>Prendre une photo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                        <Btn label="Valider" textStyle={styles.btnLabel2} buttonStyle={styles.validation} onPress={() => { }} />

                        <Btn label="Annuler" textStyle={styles.btnLabel2} buttonStyle={styles.annulation} onPress={() => {
                            setDestination("")
                            setDepartureDate("")
                            setArrivalDate("")
                            setWeight("")
                            setPhotosFromCamera(undefined)
                        }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </NewSaleContext.Provider>
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
        color: "#2c3e50",
        textAlign: "center"
    },

    btnLabel2: {
        color: "#f39c12",
        textAlign: "center"
    },

    button: {
        backgroundColor: "#f39c12",
        marginVertical: 25,
        width: 300,
        height: 50,
        padding: 15,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center"
    },

    sendButton: {
        backgroundColor: "#f39c12",
        marginTop: 10,
        marginBottom: 25,
        width: 300,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    modifButton: {
        backgroundColor: "#2c3e50",
        marginTop: 25,
        width: 300,
        height: 50,
        padding: 12,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center"
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
        borderRadius: 15,
        borderColor: "#2c3e50",
        alignItems: "center",
        backgroundColor: "white"
    },

    flatListSeparator: {
        borderWidth: 5,
        borderColor: "transparent"
    },

    recapTxt: {
        marginTop: 15,
        width: "90%",
        color: "#2c3e50",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18
    },

    photoBox: {
        width: 350,
        alignItems: "center"
    },

    photo: {
        width: 300,
        height: 200
    },

    noPhoto: {

    },

    validation: {
        backgroundColor: "#2c3e50",
        width: 300,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    annulation: {
        backgroundColor: "transparent",
        width: 300,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 15,
        borderWidth: 2,
        borderColor: "#f39c12",
        alignItems: "center"
    }
})

export default SaleKg