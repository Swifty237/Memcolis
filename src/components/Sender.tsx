import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList } from "react-native"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import Moment from "moment"

type dataType = {
    id: string
    traveler: string
    destination: string
    departureDate: string
    departureTime: string
    arrivalDate: string
    arrivalTime: string
    availableWeight: string
    dateOfProposition: string
    planeTicket: string
}

const Sender = ({ email, userID }: { email: string, userID: string }) => {

    const [data, setData] = useState<dataType[]>([])
    const [name, setName] = useState<string>("")
    const user = auth().currentUser


    useEffect(() => {
        let items: dataType[] = []
        firestore()
            .collection("travel")
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

    const getName = (id: string) => {
        firestore()
            .collection("user")
            .doc(id)
            .get()
            .then(snapshot => {
                setName(snapshot.data()?.name)
            })
        return
    }


    const renderItem = ({ item }: { item: dataType }) => {
        getName(item.traveler)

        return (
            <TouchableOpacity style={{ width: 340, margin: 10, padding: 10, borderWidth: 2, borderColor: "#2c3e50", borderRadius: 5, backgroundColor: "#2c3e50" }}>
                <Text style={{ color: "white" }}>Nom: <Text style={{ color: "#f39c12", fontSize: 15 }}>{name}</Text></Text>
                <Text style={{ color: "white" }}>Destination: <Text style={{ color: "#f39c12", fontSize: 15 }}>{item.destination}</Text></Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: "white" }}>Départ le <Text style={{ color: "#f39c12", fontSize: 15 }}>{item.departureDate}</Text></Text>
                    <Text style={{ color: "white" }}>à <Text style={{ color: "#f39c12", fontSize: 15 }}>{item.departureTime}</Text></Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: "white" }}>Arrivée le <Text style={{ color: "#f39c12", fontSize: 15 }}>{item.arrivalDate}</Text></Text>
                    <Text style={{ color: "white" }}>à <Text style={{ color: "#f39c12", fontSize: 15 }}>{item.arrivalTime}</Text></Text>
                </View>

                <Text style={{ color: "white" }}>Nombre de kg à vendre: <Text style={{ color: "#f39c12", fontSize: 15 }}>{item.availableWeight}</Text></Text>
                <Text style={{ color: "white" }}>Date de la proposition: <Text style={{ color: "#f39c12", fontSize: 15 }}>{Moment(new Date(item.dateOfProposition)).format("DD/MM/YYYY")}</Text></Text>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container}>
            <Text style={styles.propositionText}>Propositions des voyageurs</Text>
            {data != undefined ?
                <View style={styles.propositionContent}>
                    <FlatList
                        data={data}
                        horizontal
                        initialNumToRender={20}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                :
                <View style={styles.propositionContent}>
                    <Text style={{ color: "#2c3e50" }}>Pas de proposoitions pour le moment</Text>
                </View>
            }


            <Text style={styles.previsionText}>Evolution prix du kg voyageur</Text>
            <TouchableOpacity style={styles.previsionContent}>

            </TouchableOpacity>

            <Text style={styles.historyText}>Mes transactions</Text>
            <TouchableOpacity style={styles.historyContent}>

            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    previsionText: {
        marginTop: 20,
        marginBottom: 10,
        width: Dimensions.get("window").width,
        color: "black",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center"
    },

    propositionContent: {
        width: "100%",
        flex: 1,
        marginBottom: 20
    },

    propositionText: {
        marginTop: 20,
        marginBottom: 10,
        width: Dimensions.get("window").width,
        color: "black",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center"
    },

    previsionContent: {
        width: Dimensions.get("window").width,
        height: 200,
        backgroundColor: "#bdc3c7",
        marginBottom: 20
    },

    historyText: {
        marginTop: 50,
        marginBottom: 10,
        width: Dimensions.get("window").width,
        color: "black",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        paddingStart: 20
    },

    historyContent: {
        width: Dimensions.get("window").width,
        height: 400,
        backgroundColor: "#bdc3c7"
    },

    separator: {
        margin: 2,
        borderColor: "#2c3e50"
    },
})

export default Sender