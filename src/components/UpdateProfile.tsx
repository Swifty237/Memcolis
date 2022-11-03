import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, Text, View, SafeAreaView } from "react-native"
import { EditerContext, DrawerContext } from "../utils/UserContext"
import Btn from "./Btn"
import Input from "./Input"
import DatePicker from "./DatePicker"
import { Formik } from "formik"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import type { userType } from "../screens/Settings"


const UpdateProfile: React.FunctionComponent = () => {

    const user = auth().currentUser
    const { setEditProfile, modifProfile, setModifProfile } = useContext(EditerContext)
    const { profile, setProfile } = useContext(DrawerContext)
    const [firstname, setFirstname] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [birthdate, setBirthdate] = useState<string>("")
    const [adress, setAdress] = useState<string>("")
    const [postalCode, setPostalCode] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [tel, setTel] = useState<string>("")
    const [userData, setUserData] = useState<userType>()
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

    useEffect(() => {

        firestore()
            .collection("user")
            .doc(user?.uid)
            .get()
            .then(snapshot => {
                if (snapshot.exists && snapshot.data()?.completeProfile == true) {

                    setUserData(snapshot.data() as userType)
                }
            }).catch(error => console.log(error))

    }, [modifProfile])



    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                firstname: userData?.firstname,
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
                console.log("=> onSubmit (UpdateProfile)")

                firestore()
                    .collection("user")
                    .doc(user?.uid)
                    .update({
                        firstname: firstname != "" ? firstname : userData?.firstname,
                        name: name != "" ? name : userData?.name,
                        birthdate: birthdate != "" ? birthdate : userData?.birthdate,
                        adress: adress != "" ? adress : userData?.adress,
                        postalCode: postalCode != "" ? postalCode : userData?.postalCode,
                        city: city != "" ? city : userData?.city,
                        tel: tel != "" ? tel : userData?.tel,
                        completeProfile: userData?.firstname != "" && userData?.name != "" && userData?.birthdate != "" && userData?.adress != "" && userData?.postalCode != "" && userData?.city != "" && userData?.tel != "" ? true : false,
                    })

                console.log("firstname onSubmit:", firstname, "&&", "userData.firstname:", userData?.firstname)
                resetForm() // Permet de vider le formulaire après la soumission

                console.log("=> exit onSubmit (UpdateProfile)")
            }}>

            {({ handleSubmit, errors }) => (

                <SafeAreaView style={styles.container}>
                    <Input
                        label="Prénom"
                        defaultValue={userData?.firstname}
                        placeholder=""
                        onChangeText={(text) => setFirstname(text)}
                        onBlur={() => { }}
                        error={errors.firstname} />

                    <Input
                        label="Nom"
                        defaultValue={userData?.name}
                        placeholder=""
                        onChangeText={(text) => setName(text)}
                        onBlur={() => { }}
                        error={errors.name} />

                    {birthdate == "" ? <DatePicker label="Date de naissance" defaultValue={userData?.birthdate} onChangeDate={(date) => setBirthdate(date)} error={errors.birthdate} />
                        :
                        <DatePicker label="Date de naissance" date={birthdate} onChangeDate={(date) => setBirthdate(date)} error={errors.birthdate} />}

                    <Input
                        label="Adresse"
                        defaultValue={userData?.adress}
                        placeholder=""
                        onChangeText={(text) => setAdress(text)}
                        onBlur={() => { }}
                        error={errors.adress} />

                    <View style={{ flexDirection: "row" }}>
                        <Input
                            label="Code postal"
                            defaultValue={userData?.postalCode}
                            containerBox={styles.box}
                            inputContainerStyle={styles.inputContainer}
                            placeholder=""
                            onChangeText={(text) => setPostalCode(text)}
                            onBlur={() => { }}
                            keyBoardNumeric
                            error={errors.postalCode} />

                        <Input
                            label="Ville"
                            defaultValue={userData?.city}
                            containerBox={styles.box2}
                            inputContainerStyle={styles.inputContainer}
                            placeholder=""
                            onChangeText={(text) => setCity(text)}
                            onBlur={() => { }}
                            error={errors.city} />
                    </View>

                    <Input
                        label="Tel"
                        defaultValue={userData?.tel}
                        placeholder=""
                        onChangeText={(text) => setTel(text)}
                        onBlur={() => { }}
                        keyBoardNumeric
                        error={errors.tel} />

                    <View style={styles.buttonsBox}>
                        <Btn label="Valider" textStyle={styles.buttonLabel} buttonStyle={styles.validation} onPress={() => {
                            handleSubmit()
                            setProfile(false)
                            setEditProfile(false)
                            setModifProfile(false)
                        }} />
                        <Btn label="Annuler" textStyle={styles.buttonLabel2} buttonStyle={styles.annulation} onPress={() => {
                            setProfile(!profile)
                            setEditProfile(false)
                            setModifProfile(false)
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

export default UpdateProfile