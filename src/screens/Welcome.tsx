import React from "react"
import { StyleSheet, Text, View, ScrollView, StatusBar, SafeAreaView } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { MainStackParamList } from "../components/Main"
import TopBar from "../components/TopBar"
import Btn from "../components/Btn"
import Video from "react-native-video"



type WelcomeProps = NativeStackScreenProps<MainStackParamList, "Welcome">

const Welcome: React.FunctionComponent<WelcomeProps> = ({ navigation, route }) => {
    const { email, userID } = route.params


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#2c3e50" />
            <TopBar title={"Bienvenue " + email + " !"} />
            <ScrollView>
                <Text style={styles.titleTxt}>Présentation</Text>
                <View style={styles.videoBox}>
                    <Video source={require("../assets/presentation.mp4")} style={styles.video} controls={true} />
                </View>
                <View>
                    <Text style={styles.titleTxt}>Qu'est-ce que le Lorem Ipsum?</Text>
                    <Text style={styles.text}>
                        Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
                        Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
                        Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié.
                        Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.
                    </Text>
                </View>

                <View>
                    <Text style={styles.titleTxt}>Qu'est-ce que le Lorem Ipsum?</Text>
                    <Text style={styles.text}>
                        Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.
                        Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.
                        Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié.
                        Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.
                    </Text>
                </View>

                <View style={styles.button}>
                    <Btn
                        label="Continuer"
                        onPress={() => navigation.navigate("MainDrawer", {
                            screen: "UserHome",
                            params: { email: email, userID: userID }
                        })}
                        textStyle={styles.label} />
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },

    titleTxt: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginStart: 20
    },

    text: {
        color: "black",
        marginTop: 20,
        marginHorizontal: 5,
        textAlign: "justify"
    },

    videoBox: {
        width: "100%",
        height: 220,
        marginTop: 10,
        alignSelf: "center"
    },

    video: {
        marginStart: 35,
        width: "100%",
        height: "100%"
    },

    label: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
    },

    button: {
        backgroundColor: "#f39c12",
        marginVertical: 20,
        width: 250,
        height: 50,
        padding: 15,
        borderRadius: 30,
        alignSelf: "center"
    }
})

export default Welcome