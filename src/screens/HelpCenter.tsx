import React, { useContext } from "react"
import { StyleSheet, Text, View, ScrollView, StatusBar, SafeAreaView, TouchableOpacity } from "react-native"
import VideoPlayer from "react-native-video-controls"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParamList } from "../navigation/Main"
import { UserContext } from "../utils/UserContext"



type HelpCenterProp = { navigation: NativeStackNavigationProp<MainStackParamList, "HelpCenter"> }

const HelpCenter: React.FunctionComponent<HelpCenterProp> = ({ navigation }) => {
    enum STACKCHOICE { SIGN_IN, LOGGED }
    const { isLoggedIn } = useContext(UserContext)



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#2c3e50" />

            <TouchableOpacity style={styles.annulation} onPress={navigation.goBack}>
                <SimpleLineIcons style={{ marginEnd: 10 }} name="arrow-left" size={20} color="#f39c12" />
                {isLoggedIn === STACKCHOICE.LOGGED ?
                    <Text style={styles.btnLabel2}>Accueil</Text>
                    :
                    <Text style={styles.btnLabel2}>Connection</Text>
                }
            </TouchableOpacity>


            <ScrollView>
                <Text style={styles.titleTxt}>Présentation</Text>
                <View style={styles.videoBox}>
                    <VideoPlayer source={require("../assets/presentation.mp4")} style={styles.video} resizeMode={"cover"} />
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

                <View>
                    <Text style={styles.titleTxt}>Contactez nous</Text>
                    <View style={{ width: "80%", alignSelf: "center", marginBottom: 20 }}>
                        {/* formulaire de contact */}
                        <Text style={styles.text}>Tel</Text>
                        <Text style={styles.text}>email</Text>
                        <Text style={styles.text}>Adresse</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    titleTxt: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 20,
        marginStart: 20
    },

    text: {
        color: "black",
        marginHorizontal: 5,
        textAlign: "justify"
    },

    videoBox: {
        height: 220,
        marginTop: 10
    },

    video: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },

    btnLabel2: {
        color: "#f39c12",
        textAlign: "center"
    },

    annulation: {
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

export default HelpCenter