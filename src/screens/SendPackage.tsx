import React, { useState, useEffect, useContext } from "react"
import { StyleSheet, Text, View, StatusBar, ScrollView, Image, FlatList, SafeAreaView, TouchableOpacity } from "react-native"
import Btn from "../components/Btn"
import Icon from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker"
import NewSendModal from "../components/NewSendModal"
import { NewSendContext } from "../utils/UserContext"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import auth from "@react-native-firebase/auth"
import storage from "@react-native-firebase/storage"
import uuid from "react-native-uuid"
import Entypo from "react-native-vector-icons/Entypo"
import DatePicker from "../components/DatePicker"
import { Formik } from "formik"
import { addColisId } from "../utils/Functions"
import firestore from "@react-native-firebase/firestore"


type SendPackageProp = { navigation: NativeStackNavigationProp<MainDrawerParamList, "SendPackage"> }


const SendPackage: React.FunctionComponent<SendPackageProp> = ({ navigation }) => {
    const [photo, setPhoto] = useState<ImageOrVideo[]>([])
    const [visible, setVisible] = useState<boolean>(false)
    const [destination, setDestination] = useState<string>("")
    const [destinataire, setDestinataire] = useState<string>("")
    const [adress, setAdress] = useState<string>("")
    const [tel, setTel] = useState<string>("")
    const [weight, setWeight] = useState<string>("")
    const [travel, setTravel] = useState<"Oui" | "Non">("Oui")
    const [transport, setTransport] = useState<"Oui" | "Non">("Oui")
    const [numberArticle, setNumberArticle] = useState<string>("")
    const user = auth().currentUser
    const imagesListRef = storage().ref("images" + "_" + user?.uid + "/")
    const [databaseImages, setDatabaseImages] = useState<string[]>([])

    const takePhotoFromFolder = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true

        }).then(image => {
            console.log(image)
            setPhoto([...photo, image])

        }).catch(err => console.error(err))
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true

        }).then(image => {
            console.log(image)
            setPhoto([...photo, image])

        }).catch(err => console.error(err))
    }
    // console.log("photosFromCamera", photosFromCamera)


    const uploadImagesToStorage = (path: string, imageName: string) => {


        const imagesRef = storage().ref("images" + "_" + user?.uid + "/" + imageName)
        const task = imagesRef.putFile(path)

        task.then(() => {
            console.log('Images uploaded to the bucket!')

        }).catch(err => console.error(err))
    }

    const storeImages = () => {

        if (photo != []) {
            photo.forEach(image => {
                let path = image.path
                let imageName = image.modificationDate?.toString() + "_" + uuid.v4().toString()

                uploadImagesToStorage(path, imageName)
            })
        }
    }

    // const getImgColis = () => {
    //     imagesListRef.list()
    //         .then(imagesList => {
    //             imagesList.items.forEach((image) => {
    //                 storage()
    //                     .ref(image.fullPath)
    //                     .getDownloadURL()
    //                     .then(snap => {
    //                         if (databaseImagesList.indexOf(snap) == -1) {
    //                             setDatabaseImagesList([...databaseImagesList, snap])
    //                         }
    //                     })
    //                     .catch(err => console.error(err))
    //             })
    //         })
    //         .catch(err => console.error(err))
    // }


    const renderItem = ({ item }: { item: ImageOrVideo }) => {

        return (
            <View>
                <Image source={{ uri: item.path }} style={styles.photo} />
            </View>
        )
    }

    return (
        <NewSendContext.Provider
            value={{
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
            }}>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    sender: "",
                    transporter: "",
                    traveler: "",
                    destination: "",
                    recipient: "",
                    recipientTel: "",
                    recipientAdress: "",
                    numberArticle: "",
                    weight: "",
                    dateOfDemand: "",
                    imgColis: ""
                }}
                onSubmit={(values, { resetForm }) => {
                    console.log("=> onSubmit (SendPackage)")

                    if (travel === "Oui" && transport === "Oui") {
                        firestore()
                            .collection("colis")
                            .add({
                                id: "", // Vide à la création
                                sender: user?.uid,
                                transporter: "",// Vide à la création
                                traveler: "", // Vide à la création
                                destination: destination,
                                recipient: destinataire,
                                recipientTel: tel,
                                recipientAdress: adress,
                                weight: weight,
                                numberArticle: numberArticle,
                                dateOfDemand: "",
                                imgColis: imagesListRef
                            })
                        addColisId() // Permet de remplir le champ id vide
                        resetForm() // Permet de vider le formulaire après la soumission
                        setDestination("")
                        setDestinataire("")
                        setAdress("")
                        setTel("")
                        setNumberArticle("")
                        setWeight("")
                        setPhoto([])
                    }

                    else if (travel === "Oui" && transport === "Non") {
                        firestore()
                            .collection("colis")
                            .add({
                                id: "", // Vide à la création
                                sender: user?.uid,
                                traveler: "", // Vide à la création
                                destination: destination,
                                recipient: destinataire,
                                recipientTel: tel,
                                recipientAdress: adress,
                                weight: weight,
                                numberArticle: numberArticle,
                                dateOfDemand: "",
                                imgColis: ""
                            })
                        addColisId()
                        resetForm()
                        setDestination("")
                        setDestinataire("")
                        setAdress("")
                        setTel("")
                        setNumberArticle("")
                        setWeight("")
                        setTransport("Oui")
                        setPhoto([])
                    }

                    else if (travel === "Non" && transport === "Oui") {
                        firestore()
                            .collection("colis")
                            .add({
                                id: "", // Vide à la création
                                sender: user?.uid,
                                transporter: "", // Vide à la création
                                destination: destination,
                                recipient: destinataire,
                                recipientTel: tel,
                                recipientAdress: adress,
                                weight: weight,
                                numberArticle: numberArticle,
                                dateOfDemand: "",
                                imgColis: ""
                            })
                        addColisId()
                        resetForm()
                        setDestination("")
                        setDestinataire("")
                        setAdress("")
                        setTel("")
                        setNumberArticle("")
                        setWeight("")
                        setTravel("Oui")
                        setPhoto([])
                    }

                    else {
                        console.log("il vous manque un transporteur ou un voyageur pour finaliser la demande")
                        setTravel("Oui")
                        setTransport("Oui")
                    }


                    console.log("=> exit onSubmit (SendPackage)")
                }}>

                {({ handleSubmit, errors }) => (

                    <SafeAreaView>
                        <ScrollView contentContainerStyle={styles.container}>
                            <StatusBar backgroundColor="#2c3e50" />
                            <TouchableOpacity style={styles.annulation} onPress={navigation.goBack}>
                                <SimpleLineIcons style={{ marginEnd: 10 }} name="arrow-left" size={20} color="#f39c12" />
                                <Text style={styles.btnLabel2}>Accueil</Text>
                            </TouchableOpacity>

                            {destination != "" || destinataire != "" || adress != "" || tel != "" || weight != "" || numberArticle != "" ?
                                <Btn label="Modifier" textStyle={styles.btnLabel2} buttonStyle={styles.modifButton} onPress={() => {
                                    setVisible(true)
                                }} />
                                :
                                null
                            }

                            <TouchableOpacity style={styles.sendButton} onPress={() => {
                                setDestination("")
                                setDestinataire("")
                                setAdress("")
                                setTel("")
                                setNumberArticle("")
                                setWeight("")
                                setVisible(true)
                            }}>
                                <MaterialCommunityIcons style={{ marginEnd: 10 }} name="send" size={20} color="#2c3e50" />
                                <Text style={styles.btnLabel}>Nouvel envoi</Text>
                            </TouchableOpacity>

                            <NewSendModal />

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
                                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{destinataire}</Text>
                                </View>

                                <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Adresse: </Text>
                                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{adress}</Text>
                                </View>

                                <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Téléphone: </Text>
                                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{tel}</Text>
                                </View>

                                <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Nombre d'articles: </Text>
                                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{numberArticle}</Text>
                                </View>

                                <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Poids Total: </Text>
                                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{weight} kg</Text>
                                </View>

                                <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Avec voyage: </Text>
                                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{travel}</Text>
                                </View>

                                <View style={{ flexDirection: "row", width: "90%", marginTop: 15 }}>
                                    <Text style={{ color: "black", fontWeight: "bold", paddingStart: 20, textAlignVertical: "center" }}>Avec transport: </Text>
                                    <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{transport}</Text>
                                </View>

                                <View style={{ marginBottom: 7, width: "90%" }}>
                                    <Text style={styles.destination}>Images colis: </Text>
                                    <Text style={{ color: "grey", fontSize: 11, fontStyle: "italic", paddingStart: 20 }}>(* Minimum 3 images par colis)</Text>
                                </View>

                                <View style={styles.photoBox}>
                                    <FlatList
                                        data={photo}
                                        horizontal
                                        initialNumToRender={20}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.path}
                                        ItemSeparatorComponent={() => (<View style={styles.flatListSeparator} />)}
                                    />
                                </View>
                                <View style={{ width: "80%", flexDirection: "row", justifyContent: "space-around" }}>
                                    <TouchableOpacity style={styles.button} onPress={() => takePhotoFromFolder()}>
                                        <Entypo name="download" size={22} color="#2c3e50" />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button} onPress={() => takePhotoFromCamera()}>
                                        <Icon name="photo-camera" size={22} color="#2c3e50" />
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={{ width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                                <Btn label="Valider" textStyle={styles.btnLabel2} buttonStyle={styles.validation} onPress={() => {
                                    storeImages()
                                    setPhoto([])
                                    // navigation.navigate("Gallery")
                                    // handleSubmit()
                                }} />

                                <Btn label="Annuler" textStyle={styles.btnLabel2} buttonStyle={styles.annulation} onPress={() => {
                                    setDestination("")
                                    setDestinataire("")
                                    setAdress("")
                                    setTel("")
                                    setNumberArticle("")
                                    setWeight("")
                                    setPhoto([])
                                }} />
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                )}
            </Formik>
        </NewSendContext.Provider>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
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
    },

    photo: {
        width: 200,
        height: 200
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

export default SendPackage
