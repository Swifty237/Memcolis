import React, { useContext, useState } from "react"
import { StyleSheet, Text, View, SafeAreaView } from "react-native"
import { EditerContext, DrawerContext } from "../utils/UserContext"
import Btn from "./Btn"
import Input from "./Input"
import DatePicker from "./DatePicker"
import { Formik } from "formik"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"



const EditerProfile = () => {

    const user = auth().currentUser
    const { setEditProfile } = useContext(EditerContext)
    const { profile, setProfile } = useContext(DrawerContext)
    const [firstname, setFirstname] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [birthdate, setBirthdate] = useState<string>("")
    const [adress, setAdress] = useState<string>("")
    const [postalCode, setPostalCode] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [tel, setTel] = useState<string>("")
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


    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                firstname: "",
                name: "",
                birthdate: "",
                adress: "",
                postalCode: "",
                city: "",
                completeProfile: null,
                proofOfAdress: "",
                tel: "",
                idCard: "",
                bankCard: cardEmpty,
                rib: ""
            }}

            onSubmit={(values, { resetForm }) => {
                console.log("=> onSubmit (EditerProfile)")

                firestore()
                    .collection("user")
                    .doc(user?.uid)
                    .set({
                        id: user?.uid, // Vide à la création
                        firstname: firstname,
                        name: name,
                        birthdate: birthdate,
                        adress: adress,
                        postalCode: postalCode,
                        city: city,
                        tel: tel,
                        subscriptionDate: user?.metadata.creationTime,
                        completeProfile: firstname != "" && name != "" && birthdate != "" && adress != "" && postalCode != "" && city != "" && tel != "" ? true : false,
                        bankCard: cardEmpty,
                        proofOfAdress: "",
                        idCard: "",
                        rib: ""
                    })

                resetForm() // Permet de vider le formulaire après la soumission

                console.log("=> exit onSubmit (EditerProfile)")
            }}>

            {({ handleSubmit, errors }) => (

                <SafeAreaView style={styles.container}>
                    <Input
                        label="Prénom"
                        placeholder=""
                        value={firstname}
                        onChangeText={(text) => setFirstname(text)}
                        onBlur={() => { }}
                        error={errors.firstname} />

                    <Input
                        label="Nom"
                        placeholder=""
                        value={name}
                        onChangeText={(text) => setName(text)}
                        onBlur={() => { }}
                        error={errors.name} />

                    <DatePicker label="Date de naissance" date={birthdate} onChangeDate={(date) => setBirthdate(date)} error={errors.birthdate} />

                    <Input
                        label="Adresse"
                        placeholder=""
                        value={adress}
                        onChangeText={(text) => setAdress(text)}
                        onBlur={() => { }}
                        error={errors.adress} />

                    <View style={{ flexDirection: "row" }}>
                        <Input
                            label="Code postal"
                            containerBox={styles.box}
                            inputContainerStyle={styles.inputContainer}
                            placeholder=""
                            value={postalCode}
                            onChangeText={(text) => setPostalCode(text)}
                            onBlur={() => { }}
                            keyBoardNumeric
                            error={errors.postalCode} />

                        <Input
                            label="Ville"
                            containerBox={styles.box2}
                            inputContainerStyle={styles.inputContainer}
                            placeholder=""
                            value={city}
                            onChangeText={(text) => setCity(text)}
                            onBlur={() => { }}
                            error={errors.city} />
                    </View>

                    <Input
                        label="Tel"
                        placeholder=""
                        value={tel}
                        onChangeText={(text) => setTel(text)}
                        onBlur={() => { }}
                        keyBoardNumeric
                        error={errors.tel} />

                    <View style={styles.buttonsBox}>
                        <Btn label="Valider" textStyle={styles.buttonLabel} buttonStyle={styles.validation} onPress={() => {
                            handleSubmit()
                            setProfile(false)
                            setEditProfile(false)
                        }} />
                        <Btn label="Annuler" textStyle={styles.buttonLabel2} buttonStyle={styles.annulation} onPress={() => {
                            setProfile(!profile)
                            setEditProfile(false)
                        }} />
                    </View>
                </SafeAreaView>
            )}
        </Formik>
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

    inputContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#bdc3c7",
        borderRadius: 7,
        backgroundColor: "white",
        width: "90%"
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

    box: {
        flex: 1,
        marginTop: 20,
    },

    box2: {
        flex: 1,
        marginTop: 20,
        alignItems: "flex-end"
    }

})

export default EditerProfile