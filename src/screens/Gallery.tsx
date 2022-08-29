import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, StatusBar, TouchableOpacity } from "react-native"
import storage from "@react-native-firebase/storage"
import auth from "@react-native-firebase/auth"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import { UserContext } from "../utils/UserContext"



type GalleryProp = { navigation: NativeStackNavigationProp<MainDrawerParamList, "Gallery"> }

const Gallery: React.FunctionComponent<GalleryProp> = ({ navigation }) => {
    const user = auth().currentUser
    const imagesListRef = storage().ref("images" + "_" + user?.uid + "/")
    const [databaseList, setDatabaseList] = useState<string[]>([])
    const { databaseImagesList } = useContext(UserContext)

    console.log(databaseList)

    useEffect(() => {

        imagesListRef.list()
            .then(foldersList => {
                foldersList.prefixes.forEach(folder => {
                    folder.list()
                        .then(imagesList => {
                            imagesList.items.forEach(image => {
                                storage()
                                    .ref(image.fullPath)
                                    .getDownloadURL()
                                    .then(snap => {
                                        if (databaseList.indexOf(snap) == -1) {
                                            setDatabaseList(prev => [...prev, snap])
                                        }
                                    })
                                    .catch(err => console.error(err))
                            })
                        })
                        .catch(err => console.error(err))
                })
            })
            .catch(err => console.error(err))
    }, [])

    console.log(databaseList)

    const renderItem = ({ item }: { item: string }) => {

        return (

            <View>
                <Image source={{ uri: item }} style={styles.image} />
            </View>
        )
    }

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#2c3e50" />

            <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                <SimpleLineIcons style={{ marginEnd: 10 }} name="arrow-left" size={20} color="#f39c12" />
                <Text style={styles.btnLabel2}>Accueil</Text>
            </TouchableOpacity>

            <FlatList
                data={databaseImagesList.length > 0 ? databaseImagesList : databaseList}
                numColumns={3}
                initialNumToRender={20}
                renderItem={renderItem}
                keyExtractor={item => item}
                ItemSeparatorComponent={() => (<View style={styles.separator} />)}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 10,
        backgroundColor: "#ecf0f1"
    },

    image: {
        width: 110,
        height: 110,
        marginHorizontal: 2
    },

    separator: {
        margin: 2,
        borderColor: "transparent"
    },

    backButton: {
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
    },

    btnLabel2: {
        color: "#f39c12",
        textAlign: "center"
    }
})

export default Gallery