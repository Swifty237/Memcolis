import React, { useContext } from "react"
import { StyleSheet, Text, ScrollView, StatusBar, View, Image, Pressable } from "react-native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParamList } from "../navigation/Main"
import Input from "../components/Input"
import Btn from "../components/Btn"
import { Formik } from "formik"
import * as yup from "yup"
import { UserContext } from "../utils/UserContext"
import auth from "@react-native-firebase/auth"



type ConnectionProp = { navigation: NativeStackNavigationProp<MainStackParamList, "Connection"> }

const validationSchema = yup.object().shape({
    email: yup.string().email().required("Champ obligatoire"),
    password: yup.string().required("Champ obligatoire")
})

const Connection: React.FunctionComponent<ConnectionProp> = ({ navigation }) => {

    console.log("----------------------------------------------------------- Connection --------------------------------------------------------------")

    const { isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, userUID, setUserUID, userPassword, setUserPassword } = useContext(UserContext)
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
                <Text style={styles.headerText}>Nous <Text style={{ color: "#f39c12" }}>collectons, acheminons</Text>  et <Text style={{ color: "#f39c12" }}>livrons</Text> vos petits colis partout où vous le souhaitez en toute sécurité</Text>
            </View>

            <Pressable
                onPress={() => navigation.navigate("HelpCenter")}
                style={{ backgroundColor: "#2c3e50", width: "100%", alignItems: "flex-end" }}>
                <Text style={{ color: "white", fontSize: 12, marginBottom: 10 }}>Besoin d'aide ?</Text>
            </Pressable>

            <Formik
                validationSchema={validationSchema}
                initialValues={{ email: "", password: "" }}
                onSubmit={values => {
                    console.log("=> onSubmit (Connection screen)")

                    auth()
                        .signInWithEmailAndPassword(values.email, values.password)
                        .then(userAuth => {

                            console.log("User signed in !")

                            isLoggedIn !== STACKCHOICE.LOGGED && setIsLoggedIn(STACKCHOICE.LOGGED)

                            navigation.navigate("MainDrawer", {
                                screen: "Summary",
                                params: { email: values.email, userID: userAuth.user.uid }
                            })

                            setUserEmail(values.email)
                            setUserPassword(values.password)
                            setUserUID(userAuth.user.uid)
                        })
                        .catch(error => {
                            if (error.code === "auth/user-not-found" || "auth/wrong-password") {
                                console.log("Authentication error: Invalid user or password !")
                            }
                            setIsLoggedIn(STACKCHOICE.SIGN_IN)
                        })

                    console.log("=> exit onSubmit (Connection screen)")
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
                        </View>
                        <View style={styles.buttonBox}>
                            <Btn
                                label="Valider"
                                textStyle={styles.labelStyle}
                                buttonStyle={styles.button}
                                onPress={handleSubmit} />
                        </View>

                        <Pressable onPress={() => {
                            console.log(" => registration")
                            navigation.navigate("Registration")
                        }}>
                            <Text style={{ color: "black", marginTop: 15, textAlign: "center", fontSize: 12 }}>Pas encore inscrit ? <Text style={{ color: "blue" }}>Inscription ici !</Text></Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
        </ScrollView >
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
        height: 250,
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
        height: 220,
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
        color: "#2c3e50",
        textAlign: "center"
    }

})

export default Connection