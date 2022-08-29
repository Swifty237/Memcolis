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
import { Formik } from "formik"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import Entypo from "react-native-vector-icons/Entypo"
import { addTravelIdAndRef } from "../utils/Functions"
import ModalInfos from "../components/ModalInfos"


type SaleKgProp = { navigation: NativeStackNavigationProp<MainDrawerParamList, "SaleKg"> }

const SaleKg: React.FunctionComponent<SaleKgProp> = ({ navigation }) => {
    const [photo, setPhoto] = useState<ImageOrVideo | undefined>(undefined)
    const [visible, setVisible] = useState<boolean>(false)
    const [destination, setDestination] = useState<string>("")
    const [departureDate, setDepartureDate] = useState<string>("")
    const [arrivalDate, setArrivalDate] = useState<string>("")
    const [departureTime, setDepartureTime] = useState<string>("")
    const [arrivalTime, setArrivalTime] = useState<string>("")
    const [weight, setWeight] = useState<string>("")
    const user = auth().currentUser
    const [visibleInfos, setVisibleInfos] = useState<boolean>(false)


    const takePhotoFromFolder = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true

        }).then(image => {
            console.log(image)
            setPhoto(image)

        }).catch(err => console.error(err))
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true

        }).then(image => {
            console.log(image)
            setPhoto(image)

        }).catch(err => console.error(err))
    }

    return (
        <NewSaleContext.Provider value={{
            visible,
            setVisible,
            destination,
            setDestination,
            departureDate,
            setDepartureDate,
            departureTime,
            setDepartureTime,
            arrivalDate,
            setArrivalDate,
            arrivalTime,
            setArrivalTime,
            weight,
            setWeight
        }}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: "",
                    traveler: "",
                    destination: "",
                    departureDate: "",
                    departureTime: "",
                    arrivalDate: "",
                    arrivalTime: "",
                    availableWeight: "",
                    dateOfProposition: "",
                    imgPlaneTicket: ""
                }}
                onSubmit={(values, { resetForm }) => {
                    console.log("=> Enter onSubmit (SaleKg)")

                    firestore()
                        .collection("travel")
                        .add({
                            id: "",
                            traveler: user?.uid,
                            destination: destination,
                            departureDate: departureDate,
                            departureTime: departureTime,
                            arrivalDate: arrivalDate,
                            arrivalTime: arrivalTime,
                            availableWeight: weight,
                            dateOfProposition: Date(),
                            planeTicket: ""
                        })

                    addTravelIdAndRef(photo)
                    resetForm()
                    setDestination("")
                    setDepartureDate("")
                    setDepartureTime("")
                    setArrivalDate("")
                    setArrivalTime("")
                    setWeight("")
                    setPhoto(undefined)

                    console.log("=> Exit onSubmit (SaleKg)")
                }}>

                {({ handleSubmit, errors }) => (

                    <SafeAreaView>
                        <ScrollView contentContainerStyle={styles.container}>
                            <StatusBar backgroundColor="#2c3e50" />
                            <ModalInfos
                                visibleInfos={visibleInfos}
                                status="Proposition de vente bien enregistrée"
                                infos="Pour trouvez un expéditeur, allez dans 'demandes d'expéditions'"
                                getVisibleInfos={(param) => setVisibleInfos(param)}
                            />

                            <TouchableOpacity style={styles.annulation} onPress={navigation.goBack}>
                                <SimpleLineIcons style={{ marginEnd: 10 }} name="arrow-left" size={20} color="#f39c12" />
                                <Text style={styles.btnLabel2}>Accueil</Text>
                            </TouchableOpacity>

                            {destination != "" || departureDate != "" || weight != "" || arrivalDate || departureTime != "" || arrivalTime != "" ?
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
                                setDepartureTime("")
                                setArrivalTime("")
                                setPhoto(undefined)
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
                                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Départ: </Text>
                                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{departureDate} - {departureTime}</Text>
                                    {/* <Text style={{ color: "grey", fontSize: 11, fontStyle: "italic", paddingStart: 20 }}>(* Nom et prénom)</Text> */}
                                </View>

                                <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Arrivée: </Text>
                                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{arrivalDate} - {arrivalTime}</Text>
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
                                        <Image source={{ uri: photo?.path }} style={photo != undefined ? styles.photo : styles.noPhoto} />
                                    </View>
                                </View>

                                <View style={{ width: "80%", flexDirection: "row", justifyContent: "space-around" }}>
                                    <TouchableOpacity style={styles.button2} onPress={() => takePhotoFromFolder()}>
                                        <Entypo name="download" size={22} color="#2c3e50" />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button2} onPress={() => takePhotoFromCamera()}>
                                        <Icon name="photo-camera" size={22} color="#2c3e50" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                                <Btn label="Valider" textStyle={styles.btnLabel2} buttonStyle={styles.validation} onPress={() => {
                                    // handleSubmit()
                                    setVisibleInfos(true)
                                }} />

                                <Btn label="Annuler" textStyle={styles.btnLabel2} buttonStyle={styles.annulation} onPress={() => {
                                    setDestination("")
                                    setDepartureDate("")
                                    setArrivalDate("")
                                    setWeight("")
                                    setDepartureTime("")
                                    setArrivalTime("")
                                    setPhoto(undefined)
                                }} />
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                )}
            </Formik>
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

    button2: {
        backgroundColor: "#f39c12",
        marginVertical: 25,
        width: 110,
        height: 40,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
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