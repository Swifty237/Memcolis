import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from "react-native"
import storage from "@react-native-firebase/storage"
import auth from "@react-native-firebase/auth"



const Gallery = () => {
    const [databaseImagesList, setDatabaseImagesList] = useState<string[]>([])
    const user = auth().currentUser
    const imagesListRef = storage().ref("images" + "_" + user?.uid + "/")


    useEffect(() => {
        imagesListRef.list()
            .then(imagesList => {

                imagesList.items.forEach((image) => {

                    storage()
                        .ref(image.fullPath)
                        .getDownloadURL()
                        .then(snap => {
                            if (databaseImagesList.indexOf(snap) == -1) {
                                setDatabaseImagesList([...databaseImagesList, snap])
                            }
                        })
                        .catch(err => console.error(err))
                })
            })
            .catch(err => console.error(err))
    }, [])

    // console.log("databaseImagesList: ", databaseImagesList.length)

    const renderItem = ({ item }: { item: string }) => {

        return (

            <View>
                <Image source={{ uri: item }} style={styles.image} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={databaseImagesList}
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
    }
})

export default Gallery