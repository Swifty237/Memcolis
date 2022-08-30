import React, { useContext, useState } from "react"
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity } from "react-native"
import { EditerContext } from "../utils/UserContext"
import Btn from "./Btn"
import Input from "./Input"
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker"
import Icon from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import { CreditCardInput } from "react-native-credit-card-input"
import { Formik } from "formik"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"

const EditerBankCard = () => {
    const { setEditBankCard } = useContext(EditerContext)
    const [bankCardInfos, setBankCardInfos] = useState<object>()
    const user = auth().currentUser


    return (
        <Formik
            enableReinitialize={true}
            initialValues={{}}
            onSubmit={(values, { resetForm }) => {
                console.log("=> onSubmit (EditerBankCard)")

                firestore()
                    .collection("user")
                    .doc(user?.uid)
                    .update({ bankCard: bankCardInfos })

                resetForm() // Permet de vider le formulaire après la soumission

                console.log("=> exit onSubmit (EditerBankCard)")
            }}>

            {({ handleSubmit, errors }) => (

                <SafeAreaView style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <CreditCardInput
                            inputContainerStyle={{ backgroundColor: "white", borderRadius: 5 }}
                            requiresName
                            autoFocus
                            labelStyle={{ color: "black" }}
                            placeholderColor="gray"
                            onChange={(param: object) => setBankCardInfos(param)} />
                    </View>

                    <View style={styles.buttonsBox}>
                        <Btn label="Valider" textStyle={styles.buttonLabel} buttonStyle={styles.validation} onPress={() => {
                            handleSubmit()
                            setEditBankCard(false)
                        }} />
                        <Btn label="Annuler" textStyle={styles.buttonLabel2} buttonStyle={styles.annulation} onPress={() => setEditBankCard(false)} />
                    </View>
                </SafeAreaView>
            )}
        </Formik>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "95%",
        alignItems: "center"
    },

    text: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20
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

export default EditerBankCard