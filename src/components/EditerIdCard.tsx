import React, { useContext, useState } from "react"
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity } from "react-native"
import { EditerContext } from "../utils/UserContext"
import Btn from "./Btn"
import Input from "./Input"
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker"
import Icon from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import { addIdCardImgRef } from "../utils/Functions"
import ModalInfos from "./ModalInfos"

const EditerIdCard = () => {
    const { setEditIdCard } = useContext(EditerContext)
    const [photo, setPhoto] = useState<ImageOrVideo[]>([])
    const [status, setStatus] = useState<string>("")
    const [infos, setInfos] = useState<string>("")
    const [visibleInfos, setVisibleInfos] = useState<boolean>(false)


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

    const renderItem = ({ item }: { item: ImageOrVideo }) => {

        return (
            <View style={{ marginTop: 25 }}>
                <Image source={{ uri: item.path }} style={styles.photo} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ModalInfos
                visibleInfos={visibleInfos}
                status={status}
                infos={infos}
                getVisibleInfos={(param) => setVisibleInfos(param)}
            />

            <View style={{ marginTop: 25, alignSelf: "center" }}>
                <Text style={{ color: "gray", fontSize: 12, fontStyle: "italic", marginBottom: 5 }}>Télécharger le recto et ensuite le verso de votre pièce d'identité</Text>
                <Text style={{ color: "gray", fontSize: 12, fontStyle: "italic" }}>Ou si vous préférez, vous pouvez la prendre en photo toujours le recto et le verso séparement</Text>
            </View>

            <View style={styles.photoBox}>
                <FlatList
                    data={photo}
                    horizontal
                    initialNumToRender={2}
                    renderItem={renderItem}
                    keyExtractor={item => item.path}
                    ItemSeparatorComponent={() => (<View style={styles.flatListSeparator} />)}
                />
            </View>

            <View style={{ width: "80%", flexDirection: "row", justifyContent: "space-around", alignSelf: "center" }}>
                <TouchableOpacity style={styles.button} onPress={() => takePhotoFromFolder()}>
                    <Entypo name="download" size={20} color="#2c3e50" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => takePhotoFromCamera()}>
                    <Icon name="photo-camera" size={20} color="#2c3e50" />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonsBox}>
                <Btn label="Valider" textStyle={styles.buttonLabel} buttonStyle={styles.validation} onPress={() => {
                    if (photo.length >= 2) {
                        addIdCardImgRef({ photo: photo, collection: "user", folderName: "identity" })
                        setEditIdCard(false)
                    }
                    else {
                        setStatus("2 documents minimum requis")
                        setInfos("Envoyer le recto et le verso de votre document d'identité")
                        setVisibleInfos(true)
                    }
                }} />
                <Btn label="Annuler" textStyle={styles.buttonLabel2} buttonStyle={styles.annulation} onPress={() => setEditIdCard(false)} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "95%"

    },

    text: {
        color: "black",
        fontWeight: "bold"
    },

    buttonsBox: {
        flexDirection: "row",
        width: "100%",
        height: 122,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        borderTopWidth: 4,
        borderColor: "#2c3e50",
        borderRadius: 15,
        marginTop: 20
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

    photoBox: {
        width: 350,
    },

    photo: {
        width: 200,
        height: 200
    },

    flatListSeparator: {
        borderWidth: 5,
        borderColor: "transparent"
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

    btnLabel: {
        color: "#2c3e50",
        textAlign: "center"
    }
})

export default EditerIdCard