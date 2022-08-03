import React, { useContext } from "react"
import { ScrollView, StyleSheet, Text, View, StatusBar, Image } from "react-native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParamList } from "../navigation/Main"
import Input from "../components/Input"
import Btn from "../components/Btn"
import { Formik } from "formik"
import { UserContext } from "../utils/UserContext"
import auth from "@react-native-firebase/auth"
import * as yup from "yup"



type RegistrationProp = { navigation: NativeStackNavigationProp<MainStackParamList, "Registration"> }

const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

const validationSchema = yup.object().shape({
    email: yup.string().email().required("Champ obligatoire"),
    password: yup.string()
        .required("Champ obligatoire")
        .matches(regex, "Minimum 8 caractères,  une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial"),
    passwordConfirm: yup.string().required().oneOf([yup.ref("password"), null], "Les mots de passe ne correspondent pas")
})

const Registration: React.FunctionComponent<RegistrationProp> = ({ navigation }) => {

    console.log("---------------------------------------------------------- Registration -------------------------------------------------------------")

    const { isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, userUID, setUserUID } = useContext(UserContext)
    enum STACKCHOICE { SIGN_IN, LOGGED }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar backgroundColor="#2c3e50" />
            <View style={styles.header}>
                <Text style={styles.text}>De <Text style={{ color: "#f39c12" }}>main</Text> en main ca va plus vite et c'est moins cher</Text>
                <View style={styles.logo}>
                    <Image source={require("../assets/logo_Memcolis.png")} style={styles.image} />
                    <Text style={styles.memcolis}>Memcolis</Text>
                </View>
            </View>


            <Formik
                validationSchema={validationSchema}
                initialValues={{ email: "", password: "", passwordConfirm: "" }}
                onSubmit={values => {
                    console.log("=> onSubmit (Registration screen)")

                    console.log(values.email)
                    console.log(values.password)

                    auth()
                        .createUserWithEmailAndPassword(values.email, values.password)
                        .then(userAuth => {
                            console.log("User account created & signed in !")

                            isLoggedIn !== STACKCHOICE.LOGGED && setIsLoggedIn(STACKCHOICE.LOGGED)

                            navigation.navigate("Welcome", { email: values.email, userID: userAuth.user.uid })




                            setUserEmail(values.email)
                            setUserUID(userAuth.user.uid)
                        })
                        .catch(error => {
                            if (error.code === "auth/email-already-in-use") {
                                console.log("Registration error: That email adress is already in use !")
                            }
                            isLoggedIn === STACKCHOICE.LOGGED && setIsLoggedIn(STACKCHOICE.SIGN_IN)
                            console.error(error)
                        })
                    console.log("=> exit onSubmit (Registration screen)")
                }}>

                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (

                    <View>
                        <View style={styles.body}>
                            <Input
                                label="Email"
                                placeholder="Votre email ici"
                                value={values.email}
                                onChangeText={handleChange("email")}
                                error={errors.email}
                                onBlur={() => handleBlur("email")}
                                onFocus={() => { }} />

                            <Input
                                label="Mot de passe"
                                placeholder="Votre mot de passe ici"
                                value={values.password}
                                onChangeText={handleChange("password")}
                                error={errors.password}
                                onBlur={() => handleBlur("password")}
                                onFocus={() => { }}
                                icon />

                            <Input
                                label="Confirmation mot de passe"
                                placeholder="Votre mot de passe de nouveau"
                                value={values.passwordConfirm}
                                onChangeText={handleChange("passwordConfirm")}
                                error=""
                                onBlur={() => handleBlur("passwordConfirm")}
                                onFocus={() => { }}
                                icon />
                        </View>

                        <View style={styles.buttonBox}>
                            <View style={styles.button}>
                                <Btn label="Valider" textStyle={styles.labelStyle} onPress={handleSubmit} />
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },

    text: {
        color: "white",
        fontSize: 11,
        width: 150,
        textAlign: "right",
        marginEnd: 5
    },

    headerText: {
        color: "white",
        width: 250,
        textAlign: "center",
        fontSize: 17,
        marginTop: 50,
        fontStyle: "italic"
    },

    header: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        backgroundColor: "#2c3e50",
        justifyContent: "center",
        textAlign: ""
    },

    logo: {
        flexDirection: "row",
        alignItems: "flex-end"
    },

    image: {
        width: 55,
        height: 55
    },

    memcolis: {
        color: "white",
        marginStart: 5,
        fontSize: 17
    },

    body: {
        width: 340,
        height: 300,
        marginTop: 50
    },

    buttonBox: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15
    },

    button: {
        backgroundColor: "#f39c12",
        marginEnd: 5,
        width: 250,
        height: 50,
        padding: 15,
        borderRadius: 30
    },

    labelStyle: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
    }
})

export default Registration