import React, { useState, useContext, useEffect } from "react"
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Btn from "../components/Btn"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import EditerProfile from "../components/EditerProfile"
import EditerIdCard from "../components/EditerIdCard"
import EditerProofOfAdress from "../components/EditerProofOfAdress"
import EditerRib from "../components/EditerRib"
import { EditerContext } from "../utils/UserContext"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import EditerBankCard from "../components/EditerBankCard"



type SettingsProp = NativeStackScreenProps<MainDrawerParamList, "Settings">
export type UserType = {
    id: string | null
    firstname: string
    name: string
    birthdate: string
    adress: string
    postalCode: string
    city: string
    tel: string
    subscriptionDate: string
    sender: boolean
    transporter: boolean
    traveler: boolean
}

const Settings: React.FunctionComponent<SettingsProp> = ({ navigation, route }) => {

    let { profile, idCard, proofOfAdress, rib, bankCard } = route.params
    const [editProfile, setEditProfile] = useState<boolean>(false)
    const [editIdCard, setEditIdCard] = useState<boolean>(false)
    const [editProofOfAdress, setEditProofOfAdress] = useState<boolean>(false)
    const [editBankCard, setEditBankCard] = useState<boolean>(false)
    const [editRib, setEditRib] = useState<boolean>(false)
    const [complete, setComplete] = useState<boolean>(false)
    const user = auth().currentUser
    const [userData, setUserData] = useState<UserType[]>([])


    useEffect(() => {

        if (profile) {
            setEditProfile(true)
            setEditIdCard(false)
            setEditProofOfAdress(false)
            setEditBankCard(false)
            setEditRib(false)
            idCard = false
            bankCard = false
            proofOfAdress = false
            rib = false
        }
        if (idCard && bankCard) {
            setEditIdCard(true)
            setEditBankCard(true)
            setEditProfile(false)
            setEditProofOfAdress(false)
            setEditRib(false)
            profile = false
            proofOfAdress = false
            rib = false
        }
        if (proofOfAdress) {
            setEditIdCard(false)
            setEditBankCard(false)
            setEditProfile(false)
            setEditProofOfAdress(true)
            setEditRib(false)
            profile = false
            idCard = false
            bankCard = false
            rib = false
        }
        if (rib) {
            setEditIdCard(false)
            setEditBankCard(false)
            setEditProfile(false)
            setEditProofOfAdress(false)
            setEditRib(true)
            profile = false
            idCard = false
            bankCard = false
            proofOfAdress = false
        }

        let items: UserType[] = []

        firestore()
            .collection("users")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((snapshot) => {
                    items.push(snapshot.data() as UserType)
                })
                setUserData(items)

            }).catch(error => console.log(error))

    }, [profile, idCard, proofOfAdress, rib, bankCard, user])


    // console.log("profile", profile)
    // console.log("---------------------------------")
    // console.log("idCard", idCard)
    // console.log("---------------------------------")
    // console.log("proofOfAdress", proofOfAdress)
    // console.log("---------------------------------")
    // console.log("rib", rib)
    // console.log("=================================")


    return (

        <EditerContext.Provider value={{ editProfile, setEditProfile, editIdCard, setEditIdCard, editProofOfAdress, setEditProofOfAdress, editRib, setEditRib, editBankCard, setEditBankCard }}>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#2c3e50" />

                <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                    <SimpleLineIcons style={{ marginEnd: 10 }} name="arrow-left" size={20} color="#f39c12" />
                    <Text style={styles.btnLabel2}>Accueil</Text>
                </TouchableOpacity>

                <ScrollView>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.annulation} onPress={() => setEditProfile(prev => !prev)}>
                            <Text style={styles.btnLabel2}>Profil</Text>
                            <SimpleLineIcons name={editProfile ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editProfile && <EditerProfile />}
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.annulation} onPress={() => setEditIdCard(prev => !prev)}>
                            <Text style={styles.btnLabel2}>Pièce d'identité</Text>
                            <SimpleLineIcons name={editIdCard ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editIdCard && <EditerIdCard />}

                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.annulation} onPress={() => setEditBankCard(prev => !prev)}>
                            <Text style={styles.btnLabel2}>Carte bancaire</Text>
                            <SimpleLineIcons name={editBankCard ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editBankCard && <EditerBankCard />}
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.annulation} onPress={() => setEditProofOfAdress(prev => !prev)}>
                            <Text style={styles.btnLabel2}>Justificatif de domicile</Text>
                            <SimpleLineIcons name={editProofOfAdress ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editProofOfAdress && <EditerProofOfAdress />}
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.annulation} onPress={() => setEditRib(prev => !prev)}>
                            <Text style={styles.btnLabel2}>Rib</Text>
                            <SimpleLineIcons name={editRib ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editRib && <EditerRib />}
                    </View>

                    <View style={{ margin: 20 }}></View>
                </ScrollView>
            </SafeAreaView>
        </EditerContext.Provider >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },

    btnContainer: {
        alignItems: "center"
    },

    infosContainer: {
        width: 300,
        alignItems: "center",
        justifyContent: "space-between"
    },

    text: {
        color: "red",
        width: "100%"
    },

    text2: {
        color: "green",
        width: "100%"
    },

    annulation: {
        backgroundColor: "#2c3e50",
        width: 350,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
        borderWidth: 2,
        borderColor: "#f39c12",
        alignItems: "center"
    },

    btnLabel2: {
        color: "#f39c12",
        textAlign: "center"
    },

    modifLabel: {
        color: "#f39c12",
        textAlign: "center",
        fontSize: 11
    },

    modification: {
        backgroundColor: "#2c3e50",
        width: 110,
        height: 40,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 15,
        borderWidth: 2,
        borderColor: "#f39c12",
        alignItems: "center",
        alignSelf: "flex-end"
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
    }

})

export default Settings