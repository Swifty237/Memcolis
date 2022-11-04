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
import UpdateProfile from "../components/UpdateProfile"
import ModalSuppConfirm from "../components/ModalSuppConfirm"
import storage from "@react-native-firebase/storage"



type SettingsProp = NativeStackScreenProps<MainDrawerParamList, "Settings">
type bankCardType = {
    status: {
        cvc: string
        expiry: string
        name: string
        number: string
    },
    valid: boolean
    values: {
        cvc: string
        expiry: string
        name: string
        number: string
    }
}

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
    idCard: string
    bankCard: bankCardType
    rib: string
}

const Settings: React.FunctionComponent<SettingsProp> = ({ navigation, route }) => {

    const { profile, setProfile, idCard, setIdCard, proofOfAdress, setProofOfAdress, rib, setRib, bankCard, setBankCard } = useContext(DrawerContext)
    const [editProfile, setEditProfile] = useState<boolean>(false)
    const [editIdCard, setEditIdCard] = useState<boolean>(false)
    const [editProofOfAdress, setEditProofOfAdress] = useState<boolean>(false)
    const [editBankCard, setEditBankCard] = useState<boolean>(false)
    const [editRib, setEditRib] = useState<boolean>(false)
    const user = auth().currentUser
    const [userData, setUserData] = useState<userType>()
    const [complete, setComplete] = useState<boolean>(false)
    const [modifProfile, setModifProfile] = useState<boolean>(false)
    const [visibleInfos, setVisibleInfos] = useState<boolean>(false)
    const [itemToDelete, setItemToDelete] = useState<string>("")
    const [infos, setInfos] = useState<string>("")
    const identityListRef = storage().ref("identity" + "_" + user?.uid + "/")
    const proofOfAdressListRef = storage().ref("adressProof" + "_" + user?.uid + "/")

    useEffect(() => { // Permet d'identifier l'onglet d'attérissage sur l'écran Settings et l'ouvrir automatique (Partant de l'écran UserHome)

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

        firestore()
            .collection("user")
            .doc(user?.uid)
            .get()
            .then(snapshot => {
                if (snapshot.exists && snapshot.data()?.completeProfile == true) {
                    setComplete(true)
                    setUserData(snapshot.data() as userType)
                }
            }).catch(error => console.log(error))

    }, [profile, idCard, proofOfAdress, rib, bankCard, user])

    const getDeleteItem = (item: string) => {
        switch (item) {
            case "idCard":

                identityListRef
                    .list()
                    .then(imagesList => {
                        imagesList.items.forEach(image => {
                            storage()
                                .ref(image.fullPath)
                                .delete()
                                .then(() => {
                                    console.log("image deleted")
                                })
                                .catch(err => console.error(err))
                        })
                        console.log("carte d'identité supprimée: " + identityListRef)

                        firestore()
                            .collection("user")
                            .doc(user?.uid)
                            .update({
                                idCard: ""
                            })
                    })
                    .catch(err => console.error(err))
                break

            case "bankCard":

                firestore()
                    .collection("user")
                    .doc(user?.uid)
                    .update({
                        bankCard: {
                            status: {
                                cvc: "",
                                expiry: "",
                                name: "",
                                number: "",
                            },
                            valid: false,
                            values: {
                                cvc: "",
                                expiry: "",
                                name: "",
                                number: ""
                            }
                        }
                    })

                console.log("carte bancaire supprimée")
                break

            case "proofOfAdress":

                proofOfAdressListRef
                    .list()
                    .then(imagesList => {
                        imagesList.items.forEach(image => {
                            storage()
                                .ref(image.fullPath)
                                .delete()
                                .then(() => {
                                    console.log("image deleted")
                                })
                                .catch(err => console.error(err))
                        })
                        console.log("Justif de domicile supprimé: " + proofOfAdressListRef)

                        firestore()
                            .collection("user")
                            .doc(user?.uid)
                            .update({
                                proofOfAdress: ""
                            })
                    })
                    .catch(err => console.error(err))
                break

            case "IBAN":

                firestore()
                    .collection("user")
                    .doc(user?.uid)
                    .update({
                        rib: ""
                    })

                console.log("IBAN supprimé")

                break

            default:
                console.log("Aucun élément à supprimer")
        }
    }

    return (

        <EditerContext.Provider value={{ editProfile, setEditProfile, editIdCard, setEditIdCard, editProofOfAdress, setEditProofOfAdress, editRib, setEditRib, editBankCard, setEditBankCard, modifProfile, setModifProfile }}>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#2c3e50" />
                <ModalSuppConfirm
                    visibleInfos={visibleInfos}
                    infos={infos}
                    getVisibleInfos={(param) => setVisibleInfos(param)}
                    getItemToDelete={(param) => setItemToDelete(param)}
                    getDelete={() => getDeleteItem(itemToDelete)}
                />

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
                        {editProfile ?
                            complete ?
                                <View style={{ width: 300, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ color: "#1abc9c", fontWeight: "bold" }}>
                                        Profil complet
                                    </Text>
                                    <Btn
                                        label="Modifier"
                                        textStyle={styles.btnLabel2}
                                        buttonStyle={styles.saleButton}
                                        onPress={() => {
                                            !modifProfile && setModifProfile(true)
                                            complete && setComplete(false)
                                        }}
                                    />
                                </View>
                                :
                                modifProfile ?
                                    <UpdateProfile /> : <EditerProfile />
                            :
                            <></>}
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.dropDownButton} onPress={() => {
                            idCard && setIdCard(!idCard)
                            setEditIdCard(prev => !prev)
                        }}>
                            <Text style={styles.dropButtonLabel}>Pièce d'identité</Text>
                            <SimpleLineIcons name={editIdCard ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editIdCard ?
                            userData && userData.idCard != "" ?
                                <View style={{ width: 300, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ color: "#1abc9c", fontWeight: "bold" }}>
                                        Pièce enregistrée
                                    </Text>
                                    <Btn
                                        label="Supprimer"
                                        textStyle={styles.btnLabel2}
                                        buttonStyle={styles.saleButton}
                                        onPress={() => {
                                            setItemToDelete("idCard")
                                            setInfos("Voulez vous vraiment supprimer cette pièce d'identité ?")
                                            setVisibleInfos(true)
                                        }}
                                    />
                                </View>
                                :
                                <EditerIdCard />
                            :
                            <></>}

                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.dropDownButton} onPress={() => {
                            bankCard && setBankCard(!bankCard)
                            setEditBankCard(prev => !prev)
                        }}>
                            <Text style={styles.dropButtonLabel}>Carte bancaire</Text>
                            <SimpleLineIcons name={editBankCard ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editBankCard ?
                            userData && userData.bankCard.valid ?
                                <View style={{ width: 300, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ color: "#1abc9c", fontWeight: "bold" }}>
                                        Carte enregistrée
                                    </Text>
                                    <Btn
                                        label="Supprimer"
                                        textStyle={styles.btnLabel2}
                                        buttonStyle={styles.saleButton}
                                        onPress={() => {
                                            setItemToDelete("bankCard")
                                            setInfos("Voulez vous vraiment supprimer cette carte bancaire ?")
                                            setVisibleInfos(true)
                                        }}
                                    />
                                </View>
                                :
                                <EditerBankCard />
                            :
                            <></>}
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.dropDownButton} onPress={() => {
                            proofOfAdress && setProofOfAdress(!proofOfAdress)
                            setEditProofOfAdress(prev => !prev)
                        }}>
                            <Text style={styles.dropButtonLabel}>Justificatif de domicile</Text>
                            <SimpleLineIcons name={editProofOfAdress ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editProofOfAdress ?
                            userData && userData.proofOfAdress ?
                                <View style={{ width: 300, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ color: "#1abc9c", fontWeight: "bold" }}>
                                        Justificatif enregistrée
                                    </Text>
                                    <Btn
                                        label="Supprimer"
                                        textStyle={styles.btnLabel2}
                                        buttonStyle={styles.saleButton}
                                        onPress={() => {
                                            setItemToDelete("proofOfAdress")
                                            setInfos("Voulez vous vraiment supprimer ce justificatif de domicile ?")
                                            setVisibleInfos(true)
                                        }}
                                    />
                                </View>
                                :
                                <EditerProofOfAdress />
                            :
                            <></>}
                    </View>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.dropDownButton} onPress={() => {
                            rib && setRib(!rib)
                            setEditRib(prev => !prev)
                        }}>
                            <Text style={styles.dropButtonLabel}>IBAN</Text>
                            <SimpleLineIcons name={editRib ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                        </TouchableOpacity>
                        {editRib ?
                            userData && userData.rib ?
                                <View style={{ width: 300, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ color: "#1abc9c", fontWeight: "bold" }}>
                                        IBAN enregistré
                                    </Text>
                                    <Btn
                                        label="Supprimer"
                                        textStyle={styles.btnLabel2}
                                        buttonStyle={styles.saleButton}
                                        onPress={() => {
                                            setItemToDelete("IBAN")
                                            setInfos("Voulez vous vraiment supprimer cette IBAN ?")
                                            setVisibleInfos(true)
                                        }}
                                    />
                                </View>
                                :
                                <EditerRib />
                            :
                            <></>}
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
    },

    btnLabel2: {
        color: "#2c3e50",
        textAlign: "center"
    },

    saleButton: {
        backgroundColor: "#f39c12",
        width: 120,
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
})

export default Settings