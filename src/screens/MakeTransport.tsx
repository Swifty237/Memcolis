import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from "react-native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"


type dataType = {
    dateOfDemand: string
    destination: string
    id: string
    imgColis: string
    numberArticle: string
    recipient: string
    recipientAdress: string
    recipientTel: string
    sender: string
    transport: {
        transporter: string
        withTransport: boolean
        transportPrice: string
    }
    travel: {
        traveler: string
        withTravel: boolean
        travelPrice: string
    }
    weight: string
    totalPrice: string
    position: {
        latitude: number
        longitude: number
    }
}

type MakeTransportProp = { navigation: NativeStackNavigationProp<MainDrawerParamList, "MakeTransport"> }

const MakeTransport: React.FunctionComponent<MakeTransportProp> = ({ navigation }) => {

    const user = auth().currentUser
    const [data, setData] = useState<dataType[]>([])

    useEffect(() => {
        let items: dataType[] = []
        firestore()
            .collection("colis")
            .get()
            .then(snapshot => {
                snapshot.forEach(documentSnapshot => {

                    if (documentSnapshot.data().traveler != user?.uid) {
                        items.push(documentSnapshot.data() as dataType)
                    }
                })
                setData(items)
            })
            .catch(err => console.error(err))
        return (() => setData([]))
    }, [])

    const renderItem = ({ item }: { item: dataType }) => {

        return (
            <TouchableOpacity style={styles.box} onPress={() => { }}>
                <Text style={styles.text1}>{item.destination}</Text>
                <Text style={styles.text1}>{item.transport.transportPrice}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.validation} onPress={navigation.goBack}>
                <SimpleLineIcons style={{ marginEnd: 10 }} name="arrow-left" size={20} color="#f39c12" />
                <Text style={styles.btnLabel}>Accueil</Text>
            </TouchableOpacity>

            <Text style={{ color: "black", fontSize: 17, fontWeight: "bold", marginTop: 20, marginBottom: 5, textAlign: "center" }}>Demandes de transport</Text>

            {data != undefined ?
                <View>
                    <FlatList
                        data={data}
                        initialNumToRender={20}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                :
                <Text style={{ color: "black" }}>Pas de propositions de transport pour le moment</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ecf0f1"
    },

    text1: {
        color: "#2c3e50",
        fontSize: 12,
        marginHorizontal: 10
    },

    text2: {
        color: "#1abc9c",
        fontSize: 12,
        marginEnd: 10
    },

    text3: {
        color: "#e74c3c",
        fontSize: 12,
        marginEnd: 10
    },

    box: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "96%",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 7,
        borderTopWidth: 4,
        borderColor: "#2c3e50",
        alignSelf: "center"
    },

    validation: {
        backgroundColor: "transparent",
        width: 300,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 15,
        borderWidth: 2,
        borderColor: "#f39c12",
        alignItems: "center",
        alignSelf: "center"
    },

    btnLabel: {
        color: "#f39c12",
        textAlign: "center"
    }
})

export default MakeTransport