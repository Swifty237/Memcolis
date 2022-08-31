import React, { useEffect, useState, useContext } from "react"
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, StatusBar, TouchableOpacity } from "react-native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainDrawerParamList } from "../navigation/MainDrawer"
import Btn from "../components/Btn"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import { DrawerContext } from "../utils/UserContext"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import ModalInfos from "../components/ModalInfos"
import Moment from "moment"


type creditCardType = {
    status: {
        cvc: string
        expiry: string
        name: string
        number: string
    }

    valid: boolean
    values: {
        cvc: string
        expiry: string
        name: string
        number: string
    }
}

type UserHomeProps = { navigation: NativeStackNavigationProp<MainDrawerParamList, "UserHome"> }

const UserHome: React.FunctionComponent<UserHomeProps> = ({ navigation }) => {

    const { setProfile, setIdCard, setProofOfAdress, setRib, setBankCard } = useContext(DrawerContext)

    const cardEmpty = {
        status: {
            cvc: "",
            expiry: "",
            name: "",
            number: ""
        },

        valid: false,
        values: {
            cvc: "",
            expiry: "",
            name: "",
            number: ""
        }
    }

    const [complete, setComplete] = useState<boolean>(false)
    const user = auth().currentUser
    const [visible, setVisible] = useState<boolean>(false)
    const [firstname, setFirstname] = useState<string>("")
    const [dateSubscription, setDateSubscription] = useState<string>("")
    const [birthdate, setBirthdate] = useState<string>("")
    const [tel, setTel] = useState<string>("")
    const [adress, setAdress] = useState<string>("")
    const [bankCardInfos, setBankCardInfos] = useState<creditCardType>(cardEmpty)
    const [idCardRef, setIdCardRef] = useState<string>("")
    const [ribRef, setRibRef] = useState<string>("")
    const [adressProof, setAdressProof] = useState<string>("")


    useEffect(() => {

        firestore()
            .collection("user")
            .doc(user?.uid)
            .get()
            .then(snapShot => {

                if (snapShot.exists && snapShot.data()?.completeProfile == true) {
                    setComplete(true)
                    setFirstname(snapShot.data()?.firstname)
                    setDateSubscription(snapShot.data()?.subscriptionDate)
                    setBirthdate(snapShot.data()?.birthdate)
                    setTel(snapShot.data()?.tel)
                    setAdress(snapShot.data()?.adress)
                    setBankCardInfos(snapShot.data()?.bankCard)
                    setIdCardRef(snapShot.data()?.idCard)
                    setRibRef(snapShot.data()?.rib)
                    setAdressProof(snapShot.data()?.proofOfAdress)
                }

                else {
                    setComplete(false)
                }
            })
            .catch(err => console.error(err))
    }, [])

    const cardHideNumbers = (card: string): string => {

        let hideNum = []

        for (let i = 0; i < card.length; i++) {
            if (i < card.length - 4) {
                hideNum.push("*")
            } else {
                hideNum.push(card[i])
            }
        }

        return hideNum.join("")
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#2c3e50" />
            <ModalInfos
                visibleInfos={visible}
                status="Profile incomplet"
                infos="Vous devez completer votre profil avant de devenir expéditeur"
                getVisibleInfos={(param) => setVisible(param)}
            />

            <ScrollView>
                <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                    <SimpleLineIcons style={{ marginEnd: 10 }} name="arrow-left" size={20} color="#f39c12" />
                    <Text style={styles.backBtnLabel}>Accueil</Text>
                </TouchableOpacity>

                <View style={styles.logoBox}>
                    <Image source={require("../assets/user.jpg")} style={styles.userLogo} />

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.userName}>{firstname != "" ? firstname : user?.email}</Text>
                        <Text style={styles.dateSubscription}>inscris depuis le: {Moment(dateSubscription).format("DD/MM/YYYY")}</Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-around", width: "80%", marginTop: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.text}>2</Text>
                                <MaterialCommunityIcons name="cube-send" size={15} color="#2c3e50" />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.text}>0</Text>
                                <MaterialCommunityIcons name="truck" size={15} color="#2c3e50" />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.text}>0</Text>
                                <MaterialCommunityIcons name="airplane-takeoff" size={15} color="#2c3e50" />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.infosBox}>
                    <View style={{ flexDirection: "row", marginBottom: 20, width: 300 }}>
                        <FontAwesome style={{ marginEnd: 10 }} name="birthday-cake" size={18} color="#2c3e50" />
                        <Text style={styles.text3}>{birthdate}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 20, width: 300 }}>
                        <Entypo style={{ marginEnd: 10 }} name="location" size={18} color="#2c3e50" />
                        <Text style={styles.text3}>{adress}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 20, width: 300 }}>
                        <MaterialCommunityIcons style={{ marginEnd: 10 }} name="phone" size={18} color="#2c3e50" />
                        <Text style={styles.text3}>{tel}</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginBottom: 20, width: 300 }}>
                        <FontAwesome style={{ marginEnd: 10 }} name="credit-card-alt" size={18} color="#2c3e50" />
                        <Text style={styles.text3}>{cardHideNumbers(bankCardInfos.values.number)}</Text>
                    </View>

                    <TouchableOpacity style={styles.profileSettings} onPress={() => {
                        setProfile(true)
                        navigation.navigate("Settings", {})
                    }}>
                        <FontAwesome5 style={{ marginEnd: 10 }} name="user-cog" size={15} color="#f39c12" />
                        <Text style={styles.text2}>Réglages profil</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.logoTxtBox}>
                    {idCardRef == "" && bankCardInfos.valid == false &&

                        <TouchableOpacity style={styles.exportButton} onPress={() => {
                            if (complete) {
                                setIdCard(true)
                                setBankCard(true)
                                navigation.navigate("Settings", {})
                            }
                            else {
                                setVisible(true)
                            }
                        }}>
                            <MaterialCommunityIcons style={{ marginEnd: 10 }} name="cube-send" size={22} color="#2c3e50" />
                            <Text style={styles.btnLabel2}>Devenir expéditeur</Text>
                        </TouchableOpacity>
                    }

                    {idCardRef == "" && bankCardInfos.valid == true &&

                        <TouchableOpacity style={styles.exportButton} onPress={() => {
                            if (complete) {
                                setIdCard(true)
                                navigation.navigate("Settings", {})
                            }
                            else {
                                setVisible(true)
                            }
                        }}>
                            <MaterialCommunityIcons style={{ marginEnd: 10 }} name="cube-send" size={22} color="#2c3e50" />
                            <Text style={styles.btnLabel2}>Devenir expéditeur</Text>
                        </TouchableOpacity>
                    }

                    {idCardRef != "" && bankCardInfos.valid == true &&
                        <Text style={{ color: "#2c3e50", fontWeight: "bold", marginTop: 25, fontSize: 17 }}>Statut expéditeur <Text style={{ color: "#2ecc71", fontStyle: "italic" }}> valide</Text></Text>
                    }

                    {adressProof == "" ?
                        <TouchableOpacity style={styles.transportButton} onPress={() => {
                            setProofOfAdress(true)
                            navigation.navigate("Settings", {})
                        }}>
                            <MaterialCommunityIcons style={{ marginEnd: 10 }} name="truck" size={22} color="#2c3e50" />
                            <Text style={styles.btnLabel2}>Devenir transporteur</Text>
                        </TouchableOpacity>
                        :
                        <Text style={{ color: "#2c3e50", fontWeight: "bold", marginTop: 25, fontSize: 17 }}>Statut transporteur <Text style={{ color: "#2ecc71", fontStyle: "italic" }}> valide</Text></Text>
                    }


                    <TouchableOpacity style={styles.saleButton} onPress={() => {
                        setRib(true)
                        navigation.navigate("Settings", {})
                    }}>
                        <MaterialCommunityIcons style={{ marginEnd: 10 }} name="airplane-takeoff" size={22} color="#2c3e50" />
                        <Text style={styles.btnLabel2}>Devenir voyageur</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    logoBox: {
        flex: 1,
        flexDirection: "row"
    },

    userLogo: {
        width: 140,
        height: 140,
        marginTop: 15,
        marginLeft: 15,
        borderWidth: 1,
        borderColor: "#bdc3c7",
        borderRadius: 5
    },

    profileSettings: {
        flexDirection: "row",
        backgroundColor: "#2c3e50",
        width: 250,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
    },

    logoTxtBox: {
        flex: 1,
        width: "100%",
        borderTopWidth: 4,
        borderRadius: 15,
        borderColor: "#2c3e50",
        alignItems: "center",
        backgroundColor: "white"
    },

    exportButton: {
        marginTop: 25,
        backgroundColor: "#f39c12",
        marginVertical: 10,
        width: "85%",
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    transportButton: {
        backgroundColor: "#f39c12",
        marginTop: 25,
        width: "85%",
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    saleButton: {
        backgroundColor: "#f39c12",
        marginVertical: 25,
        width: "85%",
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    btnLabel2: {
        color: "#2c3e50",
        textAlign: "center"
    },

    text3: {
        color: "#2c3e50",
        marginStart: 5,
        textAlignVertical: "center",
        fontSize: 12
    },

    text2: {
        color: "#f39c12",
        marginStart: 5,
        textAlignVertical: "center",
        fontSize: 12
    },

    userName: {
        color: "black",
        fontWeight: "bold",
        fontSize: 15
    },

    infosBox: {
        flex: 1,
        marginVertical: 50,
        justifyContent: "space-around",
        alignItems: "center"
    },

    dateSubscription: {
        color: "black",
        fontSize: 12
    },

    text: {
        color: "black",
        fontSize: 15,
        marginRight: 5,
        textAlignVertical: "center"
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
        alignItems: "center",
        alignSelf: "center"
    },

    backBtnLabel: {
        color: "#f39c12",
        textAlign: "center"
    },

    footer: {
        width: "100%",
        height: 20,
        backgroundColor: "#2c3e50",
        justifyContent: "flex-end"
    }
})

export default UserHome