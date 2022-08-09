import React, { useState, useEffect } from "react"
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


type SendPackageProp = { navigation: NativeStackNavigationProp<MainDrawerParamList, "SendPackage"> }



const SendPackage: React.FunctionComponent<SendPackageProp> = ({ navigation }) => {
    const [photosFromCamera, setPhotosFromCamera] = useState<ImageOrVideo[]>([])
    const [visible, setVisible] = useState<boolean>(false)
    const [destination, setDestination] = useState<string>("")
    const [destinataire, setDestinataire] = useState<string>("")
    const [adresse, setAdresse] = useState<string>("")
    const [tel, setTel] = useState<string>("")
    const [weight, setWeight] = useState<string>("")
    const [numberArticle, setNumberArticle] = useState<string>("")
    const user = auth().currentUser




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
    // console.log("photosFromCamera", photosFromCamera)


    const uploadImagesToStorage = (path: string, imageName: string) => {


        const imagesRef = storage().ref("images" + "_" + user?.uid + "/" + imageName)
        const task = imagesRef.putFile(path)

        task.then(() => {
            console.log('Images uploaded to the bucket!')

        }).catch(err => console.error(err))
    }

    const storeImages = () => {

        if (photosFromCamera != []) {
            photosFromCamera.forEach(image => {
                let path = image.path
                let imageName = image.modificationDate?.toString() + "_" + uuid.v4().toString()

                uploadImagesToStorage(path, imageName)
            })
        }
    }


    const renderItem = ({ item }: { item: ImageOrVideo }) => {

        return (
            <View>
                <Image source={{ uri: item.path }} style={styles.photo} />
            </View>
        )
    }


    return (
        <NewSendContext.Provider value={{ visible, setVisible, destination, setDestination, destinataire, setDestinataire, adresse, setAdresse, tel, setTel, weight, setWeight, numberArticle, setNumberArticle }}>
            <SafeAreaView>
                <ScrollView contentContainerStyle={styles.container}>
                    <StatusBar backgroundColor="#2c3e50" />
                    <TouchableOpacity style={styles.annulation} onPress={navigation.goBack}>
                        <SimpleLineIcons style={{ marginEnd: 10 }} name="arrow-left" size={20} color="#f39c12" />
                        <Text style={styles.btnLabel2}>Accueil</Text>
                    </TouchableOpacity>

                    {destination != "" || destinataire != "" || adresse != "" || tel != "" || weight != "" || numberArticle != "" ?
                        <Btn label="Modifier" textStyle={styles.btnLabel2} buttonStyle={styles.modifButton} onPress={() => {
                            setVisible(true)
                        }} />
                        :
                        null
                    }

                    <TouchableOpacity style={styles.sendButton} onPress={() => {
                        setDestination("")
                        setDestinataire("")
                        setAdresse("")
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
                            <Text style={{ color: "black", marginLeft: 25, fontSize: 17, textAlignVertical: "center" }}>{adresse}</Text>
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

                        <TouchableOpacity style={styles.button} onPress={() => takePhotoFromCamera()}>
                            <Icon style={{ marginEnd: 10 }} name="photo-camera" size={20} color="#2c3e50" />
                            <Text style={styles.btnLabel}>Prendre une photo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                        <Btn label="Valider" textStyle={styles.btnLabel2} buttonStyle={styles.validation} onPress={() => {
                            storeImages()
                            navigation.navigate("Gallery")
                        }} />

                        <Btn label="Annuler" textStyle={styles.btnLabel2} buttonStyle={styles.annulation} onPress={() => {
                            setDestination("")
                            setDestinataire("")
                            setAdresse("")
                            setTel("")
                            setNumberArticle("")
                            setWeight("")
                            setPhotosFromCamera([])
                        }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
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
        justifyContent: "center",
        marginVertical: 15,
        borderWidth: 2,
        borderColor: "#f39c12",
        alignItems: "center"
    }
})

export default SendPackage
