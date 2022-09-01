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
import { DrawerContext, EditerContext } from "../utils/UserContext"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import EditerBankCard from "../components/EditerBankCard"
// import { testStatus } from "../utils/Functions"



type SettingsProp = NativeStackScreenProps<MainDrawerParamList, "Settings">
export type userType = {
    id: string | null
    firstname: string
    name: string
    birthdate: string
    adress: string
    postalCode: string
    city: string
    tel: string
    proofOfAdress: string
    subscriptionDate: string
    sender: boolean
    transporter: boolean
    traveler: boolean
}

const Settings: React.FunctionComponent<SettingsProp> = ({ navigation, route }) => {

    const { profile, setProfile, idCard, setIdCard, proofOfAdress, setProofOfAdress, rib, setRib, bankCard, setBankCard } = useContext(DrawerContext)
    const [editProfile, setEditProfile] = useState<boolean>(false)
    const [editIdCard, setEditIdCard] = useState<boolean>(false)
    const [editProofOfAdress, setEditProofOfAdress] = useState<boolean>(false)
    const [editBankCard, setEditBankCard] = useState<boolean>(false)
    const [editRib, setEditRib] = useState<boolean>(false)
    const user = auth().currentUser
    const [userData, setUserData] = useState<userType[]>([])


    useEffect(() => {

        if (profile) {
            setEditProfile(true)
            setEditIdCard(false)
            setEditProofOfAdress(false)
            setEditBankCard(false)
            setEditRib(false)
        }
        if (idCard && bankCard) {
            setEditIdCard(true)
            setEditBankCard(true)
            setEditProfile(false)
            setEditProofOfAdress(false)
            setEditRib(false)
        }
        if (proofOfAdress && rib) {
            setEditIdCard(false)
            setEditBankCard(false)
            setEditProfile(false)
            setEditProofOfAdress(true)
            setEditRib(true)
        }

        let items: userType[] = []

        firestore()
            .collection("users")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((snapshot) => {
                    items.push(snapshot.data() as userType)
                })
                setUserData(items)

            }).catch(error => console.log(error))

    }, [profile, idCard, proofOfAdress, rib, bankCard, user])


    return (

        <EditerContext.Provider value={{ editProfile, setEditProfile, editIdCard, setEditIdCard, editProofOfAdress, setEditProofOfAdress, editRib, setEditRib, editBankCard, setEditBankCard }}>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#2c3e50" />

                <TouchableOpacity style={styles.backButton} onPress={() => {
                    profile && setProfile(!profile)
                    idCard && setIdCard(!idCard)
                    bankCard && setBankCard(!bankCard)
                    proofOfAdress && setProofOfAdress(!proofOfAdress)
                    rib && setRib(!rib)
                    navigation.navigate("UserHome")
                }}>
                    <SimpleLineIcons style={{ marginEnd: 10 }} name="arrow-left" size={20} color="#f39c12" />
                    <Text style={styles.dropButtonLabel}>Profil</Text>
                </TouchableOpacity>

                <ScrollView>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.dropDownButton} onPress={() => {
                            profile && setProfile(!profile)
                            setEditProfile(prev => !prev)
                        }}>
                            <Text style={styles.dropButtonLabel}>Informations profil</Text>
                            <SimpleLineIcons name={editProfile ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editProfile && <EditerProfile />}
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.dropDownButton} onPress={() => {
                            idCard && setIdCard(!idCard)
                            setEditIdCard(prev => !prev)
                        }}>
                            <Text style={styles.dropButtonLabel}>Pièce d'identité</Text>
                            <SimpleLineIcons name={editIdCard ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editIdCard && <EditerIdCard />}

                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.dropDownButton} onPress={() => {
                            bankCard && setBankCard(!bankCard)
                            setEditBankCard(prev => !prev)
                        }}>
                            <Text style={styles.dropButtonLabel}>Carte bancaire</Text>
                            <SimpleLineIcons name={editBankCard ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editBankCard && <EditerBankCard />}
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.dropDownButton} onPress={() => {
                            proofOfAdress && setProofOfAdress(!proofOfAdress)
                            setEditProofOfAdress(prev => !prev)
                        }}>
                            <Text style={styles.dropButtonLabel}>Justificatif de domicile</Text>
                            <SimpleLineIcons name={editProofOfAdress ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editProofOfAdress && <EditerProofOfAdress />}
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.dropDownButton} onPress={() => {
                            rib && setRib(!rib)
                            setEditRib(prev => !prev)
                        }}>
                            <Text style={styles.dropButtonLabel}>Rib</Text>
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

    dropDownButton: {
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

    dropButtonLabel: {
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